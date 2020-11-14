const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const dbService = require('../controller/repairDbService');
const db = dbService.getDbServiceInstance();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/getRepairs', (req, res) => {
    const result = db.getAllRepairs();

    result
        .then(data => {
            console.log(data);
            res.json({ data: data });
        })
        .catch(err => console.log(err));
})

router.patch('/changeComments', (req, res) => {
    let engineerId = req.body.engineerId;
    let assetId = req.body.assetId;
    let repairDate = req.body.repairDate;
    let comment = req.body.comment;
    console.log(req.body);

    const result = db.changeComments(engineerId, assetId, repairDate, comment);

    result
    .then(reply => res.json(reply))
    .catch(err => console.log(err));
})

router.post('/addRepair', (req, res) => {
    let engineerId = req.body.engineerId;
    let assetId = req.body.assetId;
    let repairDate = req.body.repairDate;
    let comment = req.body.comment;

    const result = db.addRepair(engineerId, assetId, repairDate, comment);

    result
    .then(reply => res.json(reply))
    .catch(err => console.log(err));
})

module.exports = router;