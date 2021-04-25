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

router.get("/getAssetsTests", (req, res) => {
  const page = parseInt(req.query.page); //
  const limit = parseInt(req.query.limit); //

  const startIndex = (page - 1) * limit; //
  const endIndex = page * limit; //

  const result = db.getTestsForAssets();

  result
    .then((data) => {
      console.log(data);
      const rets = {};

      const pages = Math.ceil(data.length/limit);

      rets.noOfPages = pages;

      if (endIndex < data.length) {
        rets.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        rets.prev = {
          page: page - 1,
          limit: limit,
        };
      }
      rets.results = data.slice(startIndex, endIndex); //
      res.json(rets); //data
    })
    .catch((err) => console.log(err));
});

router.post("/createNewAsset", (req, res) => {
  let AssetID = req.body.AssetID;
  let AssetType = req.body.AssetType;
  let Status = req.body.Status;
  let GPSLatitude = req.body.GPSLatitude;
  let GPSLongitude = req.body.GPSLongitude;
  let Region = req.body.Region;
  let Division = req.body.Division;
  let SubDivision = req.body.SubDivision;
  let NearestMilePost = req.body.NearestMilePost;
  let LastTestedDate = req.body.LastTestedDate;

  console.log(req.body);

  const result = db.createNewAsset(
    AssetID,
    AssetType,
    Status,
    GPSLatitude,
    GPSLongitude,
    Region,
    Division,
    SubDivision,
    NearestMilePost,
    LastTestedDate
  );

  result
    .then((reply) => {
      res.json(reply);
    })
    .catch((err) => console.log(err));
});

router.post("/orderAssetsByLocation", (req, res) => {
  const empLatitude = req.body.empLatitude;
  const empLongitude = req.body.empLongitude;
  const result = db.orderAssetsByLocation(empLatitude, empLongitude);

  result
    .then((data) => {
      //console.log(data);
      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

router.post("/tester", (req, res) => {});

module.exports = router;
