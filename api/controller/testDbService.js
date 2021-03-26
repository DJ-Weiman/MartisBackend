const mysql = require('mysql');
const connection = require('./dbConnection');
const haversine = require('haversine');
const lodash = require('lodash');
const { xor } = require('lodash');
let instance = null;

class Dbservice {
	static getDbServiceInstance() {
		return instance ? instance : new Dbservice();
	}

	async getAllTests() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'SELECT * FROM test where DateCompleted is NULL';

				connection.query(query, (err, results) => {
					if (err) reject(new Error(err));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}

	async createNewTest(TestID, DateIssued, AssetID, InspectorID, SupervisorID, Frequency, Urgent, TestModID) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query =
					'INSERT INTO test (TestID,DateIssued, AssetID, InspectorID, SupervisorID, Frequency, Urgent, TestModID) Values ( ?, ?, ?, ?, ?, ?, ?, ?)';

				connection.query(
					query,
					[ TestID, DateIssued, AssetID, InspectorID, SupervisorID, Frequency, Urgent, TestModID ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('New test added');
					}
				);
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}

	async setResult(TestID, Result, DateCompleted, comments) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'UPDATE test SET Result = ?, DateCompleted = ?, comments = ? WHERE TestID = ?';

				connection.query(query, [ Result, DateCompleted, comments, TestID ], (err, results) => {
					if (err) reject(err.message);
					resolve('Record updated');
				});
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}

	async AutoInsertIntoRepair(AssetID, CreatedDate) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'Insert into repair(AssetID, CreatedDate) values (?, ?)';

				connection.query(query, [ AssetID, CreatedDate ], (err, results) => {
					if (err) reject(err.message);
					resolve('Repair Entry Added');
				});
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}

	async orderByLocationAndInspector(empId, empLatitude, empLongitude) {
		try {
			const employeeCoordinates = {
				latitude: empLatitude,
				longitude: empLongitude
			};

			let nearByAssets = [];

			const response = await new Promise((resolve, reject) => {
				const query = `SELECT t.InspectorID, a.GPSLatitude, a.GPSLongitude, t.AssetID
                        from test t, asset a
                        where t.AssetID = a.AssetID
                        AND t.InspectorID = ?`;

				connection.query(query, [ empId ], (err, results) => {
					if (err) reject(new Error(err));
					results.forEach((element) => {
						let asset = {
							latitude: element.GPSLatitude,
							longitude: element.GPSLongitude
						};

						const distance = haversine(asset, employeeCoordinates, {
							unit: 'meter'
						});
						if (distance) {
							nearByAssets.push({
								distance: distance,
								assetID: element.AssetID
							});
						}
					});
					resolve(
						lodash.sortBy(nearByAssets, (e) => {
							return e.distance;
						})
					);
				});
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}

	async exportTests() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = `SELECT CONCAT("[", 
				GROUP_CONCAT( 
				CONCAT("['",TestID,"',"),
				CONCAT("'",DateIssued,"',"),
				CONCAT("'",AssetID,"',"),
				CONCAT("'",InspectorID,"',"),
				CONCAT("'",Result,"',"),
				CONCAT("'",SupervisorID,"',"),
				CONCAT("'",DateCompleted,"',"),
				CONCAT("'",Frequency,"',"),
				CONCAT("'",Priority,"',"),
				CONCAT("'",TestModID,"',"),
				CONCAT("'",comments,"']")
				) 
				,"]") 
				as json FROM test where DateCompleted is NULL`;

				connection.query(query, (err, results) => {
					if (err) reject(new Error(err));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}

}

module.exports = Dbservice;
