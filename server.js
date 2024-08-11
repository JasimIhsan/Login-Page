const express = require("express");
const session = require("express-session");
const app = express();
const { v4: uuid4 } = require("uuid");

const router = require("./router/login");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

//setting view engine

app.set("view engine", "ejs");

//load static assets

app.use(express.static("public"));

app.use(
    session({
        secret: uuid4(),
        resave: false,
        saveUninitialized: true,
    })
);

app.use("/", router);

app.listen(port, () =>
    console.log("Listening to the server on http://localhost:3000")
);
