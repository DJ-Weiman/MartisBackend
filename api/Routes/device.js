const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const dbService = require("../controller/deviceDbService");
const { urlencoded } = require("body-parser");
const db = dbService.getDbServiceInstance();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/getdevices", (req, res) => {
  const result = db.getAllDevices();

  result
    .then((data) => {
      console.log(data);
      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

router.post("/getDeviceByID", (req, res) => {
  let deviceId = req.body.deviceId;

  console.log(req.body);

  const result = db.getDeviceByID(deviceId);

  result
    .then((data) => {
      //console.log(data);
      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

router.post("/setDevicePinByID", (req, res) => {
  let deviceId = req.body.deviceId;
  let devicePin = req.body.devicePin;

  console.log(req.body);

  const result = db.setPin(deviceId, devicePin);

  result
    .then((reply) => {
      //console.log(data);
      res.json({ message: reply });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
