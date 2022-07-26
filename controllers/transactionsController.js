const express = require("express");
const transactions = express.Router();

const transactionsData = require("../models/transactions.js");
const { validateURL } = require("../models/validations");

transactions.get("/", (req, res) => {
  res.json(transactionsData);
});
// SHOW ROUTE
transactions.get("/sort", (req, res) => {
  const { category } = req.query;

  const findCategory = transactionsData.filter((transaction) => {
    return transaction.category.toLowerCase() === category.toLowerCase();
  });
  if (findCategory.length > 0) {
    res.send(findCategory);
  } else {
    res.status(404).send("no transaction found - sorry");
  }
});


transactions.get("/:arrayIndex", (req, res) => {
  console.log(req.params);
  const { arrayIndex } = req.params;
  if (transactionsData[arrayIndex]) {
    res.json(transactionsData[arrayIndex]);
  } else {
    res.status(404).send("no transaction found - sorry");
  }
});
//POST

transactions.post("/", (req, res) => {
  transactionsData.push(req.body);
  res.json(transactionsData[transactionsData.length-1])
})
// CREATE ROUTE

transactions.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  const deletedTransaction = transactionsData.splice(arrayIndex, 1);
  res.status(200).json(deletedTransaction);
});

transactions.put("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  transactionsData[arrayIndex] = req.body;
  res.status(200).json(transactionsData[arrayIndex]);
});

module.exports = transactions;
