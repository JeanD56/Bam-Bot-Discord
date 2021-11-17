const express = require('express');
const dashboard = express();
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;
const session = require('express-session');
const { Moderation } = require('./Models');
const MemoryStore = require('memorystore')(session);

module.exports = async client => {
    const moderationDB = await Moderation.findOne({ id: 1 });
    if (moderationDB) {
        const config = moderationDB.dashboard;

        const dashboardDirectory = path.resolve(
            `${process.cwd()}${path.sep}dashboard`
        );
        const templatesDirectory = path.resolve(
            `${dashboardDirectory}${path.sep}templates`
        );
        dashboard.use(
            "/public",
            express.static(path.resolve(
                `${dashboardDirectory}${path.sep}public`
            ))
        );

        passport.serializeUser((user, done) => {
            done(null, user)
        });
        passport.deserializeUser((obj, done) => {
            done(null, obj)
        });

        passport.use(
            new Strategy({
                clientID: config.dashboard.clientID,
                clientSecret: config.dashboard.oauthSecret,
                callbackURL: config.dashboard.callbackurl,
                scope: ["identify", "guilds"]
            },
                (accessToken, refeshToken, profile, done) => {
                    process.nextTick(() => done(null, profile));
                }
            )
        );

        dashboard.use(
            session({
                store: new MemoryStore({ checkPeriod: 9999999 }),
                secret: config.dashboard.secret,
                resave: false,
                saveUninitialized: false
            })
        );

        dashboard.use(passport.initialize());
        dashboard.use(passport.session());

        dashboard.engine("html", require('ejs').renderFile);
        dashboard.set("view engine", "html");

        const renderTemplate = (res, req, templates, data = {}) => {
            const baseData = {
                bot: client,
                handler: this.handler,
                users: client.users,
                path: req.path,
                user: req.isAuthenticated() ? req.user : null
            };
            res.render(
                path.resolve(
                    `${templatesDirectory}${path.sep}${templates}`
                ),
                Object.assign(baseData, data)
            );
        };

        dashboard.get("/login", (req, res, next) => {
            req.session.backURL = "/";
            next();
        },
            passport.authenticate("discord"));

        dashboard.get("/callback", passport.authenticate("discord"), (req, res) => {
            res.redirect('/');
        })

        dashboard.get("/logout", (req, res) => {
            req.session.destroy(() => {
                req.logout();
                res.redirect('/');
            })
        })

        dashboard.get("/dashboard", (req, res) => {
            renderTemplate(res, req, "index.ejs");
        });

        dashboard.get("/", (req, res) => {
            renderTemplate(res, req, "index.ejs");
        });

        dashboard.get("/commands", (req, res) => {
            renderTemplate(res, req, "commands.ejs");
        });

        dashboard.get("/guilds", (req, res) => {
            renderTemplate(res, req, "guilds.ejs");
        });

        dashboard.listen(config.dashboard.port);
    }
}