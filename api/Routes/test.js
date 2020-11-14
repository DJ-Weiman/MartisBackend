const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const dbService = require("../controller/testDbService");
const { urlencoded } = require("body-parser");
const db = dbService.getDbServiceInstance();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/getTests", (req, res) => {
  const result = db.getAllTests();

  result
    .then((data) => {
      console.log(data);
      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

router.post("/createNewTest", (req, res) => {
  let TestID = req.body.TestID;
  let DateIssued = req.body.DateIssued;
  let AssetID = req.body.AssetID;
  let InspectorID = req.body.InspectorID;
  let SupervisorID = req.body.SupervisorID;
  let Frequency = req.body.Frequency;
  let Urgent = req.body.Urgent;
  let TestModID = req.body.TestModID;

  console.log(req.body);

  const result = db.addRepair(
    TestID,
    DateIssued,
    AssetID,
    InspectorID,
    SupervisorID,
    Frequency,
    Urgent,
    TestModID
  );

  result.then((reply) => res.json(reply)).catch((err) => console.log(err));
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

module.exports = router;
