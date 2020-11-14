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

  const result = db.createNewTest(
    TestID,
    DateIssued,
    AssetID,
    InspectorID,
    SupervisorID,
    Frequency,
    Urgent,
    TestModID
  );

  result
    .then((reply) => {
      console.log("Test Added");
      res.json(reply);
    })
    .catch((err) => console.log(err));
});

router.patch("/setResult", (req, res) => {
  let TestID = req.body.TestID;
  let Result = req.body.Result;
  let DateCompleted = req.body.DateCompleted;
  console.log(req.body);

  const result = db.setResult(TestID, Result, DateCompleted);

  result
    .then((reply) => {
      res.json({
        message: reply,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
