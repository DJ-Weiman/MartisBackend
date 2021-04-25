const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dbService = require('../controller/testDbService');
const { urlencoded } = require('body-parser');
const db = dbService.getDbServiceInstance();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/getTests', (req, res) => {
	const result = db.getAllTests();
	result
		.then((data) => {
			console.log(data);
			res.json({ data: data });
		})
		.catch((err) => console.log(err));
});

router.get('/exportTests', (req, res) => {
	const result = db.exportTests();
	result
		.then((data) => {
			console.log(data);
			res.json(data);
		})
		.catch((err) => console.log(err));
});

router.post('/importTest', (req, res) => {
	let TestID = req.body.TestID;
	let DateIssued = req.body.DateIssued;
	let AssetID = req.body.AssetID;
	let InspectorID = req.body.InspectorID;
	let Result = req.body.Result;
	let SupervisorID = req.body.SupervisorID;
	let DateCompleted = req.body.DateCompleted;
	let Frequency = req.body.Frequency;
	let Priority = req.body.Priority;
	let TestModID = req.body.TestModID;
	let comments = req.body.comments;
	console.log(req.body);
	const result = db.importTest(
		TestID,
		DateIssued,
		AssetID,
		InspectorID,
		Result,
		SupervisorID,
		DateCompleted,
		Frequency,
		Priority,
		TestModID,
		comments
	);
	result
		.then((reply) => {
			res.json({
				message: 'Test imported successfully',
				reply: reply
			});
		})
		.catch((err) => console.log(err));
});

router.post('/createNewTest', (req, res) => {
	let TestID = req.body.TestID;
	let DateIssued = req.body.DateIssued;
	let AssetID = req.body.AssetID;
	let InspectorID = req.body.InspectorID;
	let SupervisorID = req.body.SupervisorID;
	let Frequency = req.body.Frequency;
	let TestModID = req.body.TestModID;
	let Priority = req.body.Priority;
	console.log(req.body);
	const result = db.createNewTest(
		TestID,
		DateIssued,
		AssetID,
		InspectorID,
		SupervisorID,
		Frequency,
		Priority,
		TestModID
	);
	result
		.then((reply) => {
			res.json({
				message: 'Test added successfully',
				reply: reply
			});
		})
		.catch((err) => console.log(err));
});

router.patch('/setResult', (req, res) => {
	let AssetID = req.body.AssetID;
	let TestID = req.body.TestID;
	let Result = req.body.Result;
	let DateCompleted = req.body.DateCompleted;
	let comments = req.body.comments;
	console.log(req.body);
	const result = db.setResult(TestID, Result, DateCompleted, comments);
	result
		.then((reply) => {
			res.json({
				message: reply
			});
		})
		.catch((err) => console.log(err));
	if (Result === 'Fail' || Result === 'fail') {
		const trigger = db.AutoInsertIntoRepair(AssetID, DateCompleted);
		trigger
			.then((reply) => {
				console.log('The repair record was added');
			})
			.catch((err) => console.log(err));
	}
});

router.post('/orderByLocationAndInspector', (req, res) => {
	const empLatitude = req.body.empLatitude;
	const empLongitude = req.body.empLongitude;
	const empId = req.body.empId;
	const result = db.orderByLocationAndInspector(empId, empLatitude, empLongitude);
	result
		.then((data) => {
			res.json({ data: data });
		})
		.catch((err) => console.log(err));
});

router.get('/orderByPriority', (req, res) => {
	const result = db.orderByPriority();
	result
		.then((data) => {
			console.log(data);
			res.json({ data: data });
		})
		.catch((err) => console.log(err));
});

module.exports = router;
