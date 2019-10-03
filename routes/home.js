const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!!!");
});

router.get("/api/:id/:month/:year", (req, res) => {
  let routeParams = req.params;
  let queryParams = req.query;

  res.send({
    routeParams: routeParams,
    queryParams: queryParams
  });
});

module.exports = router;
