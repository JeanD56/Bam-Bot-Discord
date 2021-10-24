const express = require('express');
const dashboard = express()
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const config = require('../../config.json');
const { isNull } = require('util');

module.exports = client => {
    const dashboardDirectory = path.resolve(
        `${process.cwd()}${path.sep}dashboard`
    );
    const templatesDirectory = path.resolve(
        `${dashboardDirectory}${path.sep}templates`
    );
    dashboard.use(
        "./public",
        express.static(path.resolve(
            `${dashboardDirectory}${path.sep}public`
        ))
    );

    passport.use(
        new Strategy({
            clientID: "423887705064079360",//this.client.application.id,
            clientSecret: config.dashboard.oauthSecret,
            callbackURL: config.dashboard.callbackurl,
            scope: ["identity", "guilds"]
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

    dashboard.get("/", (req, res) => {
        renderTemplate(res, req, "index.ejs");
    });

    dashboard.listen(config.dashboard.port);
}