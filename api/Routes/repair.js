const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const dbService = require('../controller/repairDbService');
const db = dbService.getDbServiceInstance();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/getRepairs', (req, res) => {
	const result = db.getAllRepairs();

	result
		.then((data) => {
			console.log(data);
			res.json({ data: data });
		})
		.catch((err) => console.log(err));
});

router.get('/getUnassignedRepairs', (req, res) => {
	const result = db.getUnassignedRepairs();

	result
		.then((data) => {
			console.log(data);
			res.json({ data: data });
		})
		.catch((err) => console.log(err));
});

// router.post("/addRepair", (req, res) => {
//   let assetId = req.body.AssetId;
//   let createdDate = req.body.CreatedDate;

//   console.log(req.body);

//   const result = db.addRepair(assetId, createdDate);

//   result.then((reply) => res.json(reply)).catch((err) => console.log(err));
// });

router.patch('assignEngineer', (req, res) => {
	let assetId = req.body.AssetId;
	let createdDate = req.body.CreatedDate;
	let engineerID = req.body.EngineerID;

	console.log(req.body);

	const result = db.assignEngineer(assetId, createdDate, engineerID);

	result.then((reply) => res.json(reply)).catch((err) => console.log(err));
});

router.patch('/addCompletedDateAndComments', (req, res) => {
	let assetId = req.body.AssetID;
	let createdDate = req.body.CreatedDate;
	let completedDate = req.body.CompletedDate;
	let comments = req.body.comments;
	console.log(req.body);

	const result = db.addCompletedDateAndComments(assetId, createdDate, completedDate, comments);

	result
		.then((reply) => {
			res.json({
				message: 'Date changed'
			});
		})
		.catch((err) => console.log(err));
});

module.exports = router;
