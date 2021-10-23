const config = require('../../config.json')

const express = require('express');
const dashboard = express();
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

module.exports = client => {

    const dashboardDirectory = path.resolve(`${process.cwd()}${path.sep}dashboard`);

    const template = path.resolve(`${dashboardDirectory}${path.sep}template`);

    dashboard.use(
        "/public",
        express.static(path.resolve(`${dashboardDirectory}${path.sep}public`))
    );

    passport.use(new Strategy ({
        clienID: "423887705064079360",
        clientSecret: config.dashboard.oauthSecret,
        callbackURL: config.dashboard.callbackURL,
        scope: ["identity", "guilds"]
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
    }
    ));
    
    dashboard.use(session({
        store: new MemoryStore({ checkPeriod: 999999999 }),
        secret: config.dashboard.sSecret,
        resave: false,
        saveUninitialized: false
    }));

    dashboard.use(passport.initialize());
    dashboard.use(passport.session());

    dashboard.engine("html", require('ejs').renderFile);
    dashboard.set("view engine", html);

    const renderTemplate = (res, req, template, data = {}) => {
        const baseDate = {
            bot: client,
            path: req.path,
            user: req.isAuthenticated() ? req.user : null
        };
        res.render(
            path.resolve(`${templateDirectory}${path.sep}${template}`),
            Object.assign(baseDate, data)
        );
    };

    dashboard.get('/', (req, res) => {
        renderTemplate(res, req, "index.ejs");
    });

    client.site = dashboard.listen(config.dashboard.port);
};