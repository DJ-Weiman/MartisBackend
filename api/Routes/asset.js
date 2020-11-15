const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const dbService = require("../controller/assetDbService");
const { urlencoded } = require("body-parser");
const db = dbService.getDbServiceInstance();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/getAssets", (req, res) => {
  const result = db.getAllAssets();

  result
    .then((data) => {
      console.log(data);
      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

router.post("/createNewAsset", (req, res) => {
  let AssetID = req.body.AssetID;
  let Status = req.body.Status;
  let GPSLatitude = req.body.GPSLatitude;
  let GPSLongitude = req.body.GPSLongitude;
  let Region = req.body.Region;
  let Division = req.body.Division;
  let SubDivision = req.body.SubDivision;
  let NearesMilePost = req.body.NearesMilePost;
  let LastTestedDate = req.body.LastTestedDate;

  console.log(req.body);

  const result = db.createNewAsset(
    AssetID,
    Status,
    GPSLatitude,
    GPSLongitude,
    Region,
    Division,
    SubDivision,
    NearesMilePost,
    LastTestedDate
  );

  result
    .then((reply) => {
      console.log("Test Added");
      res.json(reply);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
