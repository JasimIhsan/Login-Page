const { render } = require("ejs");
const express = require("express");
const router = express.Router();

const credential = {
    username: "admin",
    password: "1234",
};

//login user

router.get("/", (req, res) => {
    if (req.session.isLogedIn) {
        console.log(req.session.isLogedIn);
        res.redirect("/home");
    } else {
        res.render("login", {
            title: "Login system",
            errorMessage: null,
            logoutMessage: null,
        });
        req.session.isLogedIn = false;
    }
});

router.post("/auth", (req, res) => {
    if (
        req.body.username === credential.username &&
        req.body.password === credential.password
    ) {
        req.session.isLogedIn = true;
        req.session.username = req.body.username;
        console.log(req.session);

        res.redirect("/home");
    } else {
        res.render("login", {
            title: "Login system",
            errorMessage: "*invalid credentials",
            logoutMessage: null,
        });
    }
});

router.get("/home", (req, res) => {
    if (req.session.isLogedIn) {
        res.render("home", { title: "Home", user: req.session.username });
    } else {
        res.redirect("/");
    }
});

//logout

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.render("/home");
        } else {
            res.redirect("/");
        }
    });
});

router.get("*", (req, res) => {
    if (req.session.isLogedIn) {
        res.redirect("/home");
    } else {
        res.redirect("/");
    }
});

module.exports = router;
