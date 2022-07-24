const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
    console.log("Safu backend is running...");
    next();
});

const transactionsController = require("./controllers/transactionsController");

app.get("/", (req, res) => {
    res.send("Welcome to the the safu app !")
});

app.use("/transactions", transactionsController);

app.get("*", (req, res) => {
    res.status(404).json({error: "page not found"})
})

module.exports = app;