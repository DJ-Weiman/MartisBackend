const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const dbService = require("../controller/repairDbService");
const db = dbService.getDbServiceInstance();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/getRepairs", (req, res) => {
  const result = db.getAllRepairs();

  result
    .then((data) => {
      console.log(data);
      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

router.patch("/changeCompletedDate", (req, res) => {
  let engineerId = req.body.engineerId;
  let assetId = req.body.assetId;
  let createdDate = req.body.createdDate;
  let completedDate = req.body.completedDate;
  console.log(req.body);

  console.log("Check");

  const result = db.changeCompletedDate(
    engineerId,
    assetId,
    createdDate,
    completedDate
  );

  result
    .then((reply) => {
      res.json({
        message: "Date changed",
      });
    })
    .catch((err) => console.log(err));
});

router.post("/addRepair", (req, res) => {
  let engineerId = req.body.engineerId;
  let assetId = req.body.assetId;
  let createdDate = req.body.createdDate;

  console.log(req.body);

  const result = db.addRepair(engineerId, assetId, createdDate);

  result.then((reply) => res.json(reply)).catch((err) => console.log(err));
});

module.exports = router;
