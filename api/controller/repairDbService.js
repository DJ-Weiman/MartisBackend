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

	async getAllRepairs() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'SELECT * FROM repair WHERE CompletedDate IS null OR EngineerID IS NOT NULL';

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
	async getUnassignedRepairs() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'SELECT * FROM repair WHERE EngineerID IS NULL';

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

	async addRepair(AssetID, EngineerID, CreatedDate, CompletedDate, comments) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'INSERT INTO repair VALUES (?, ?, ?, ?, ?)';

				connection.query(
					query,
					[ EngineerID, AssetID, CreatedDate, CompletedDate, comments ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Record added');
					}
				);
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}

	async assignEngineer(assetID, createdDate, engineerID) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'UPDATE repair SET EngineerID = ? WHERE CreatedDate = ? AND AssetID = ?';

				connection.query(query, [ engineerID, createdDate, assetID ], (err, results) => {
					if (err) {
						reject(err.message);
					}
					resolve('Engineer assigned');
				});
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}

	async removeAssignment(assetID, createdDate, comments) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'UPDATE repair SET EngineerID = ?, Comments = ? WHERE CreatedDate = ? AND AssetID = ?';

				connection.query(query, [ null, comments, createdDate, assetID ], (err, results) => {
					if (err) reject(err.message);
					resolve('Manager Notified');
				});
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}

	async addCompletedDateAndComments(assetID, createdDate, completedDate, comments) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'update repair set CompletedDate=? , comments=? WHERE AssetID=? AND CreatedDate = ?';

				connection.query(query, [ completedDate, comments, assetID, createdDate ], (err, results) => {
					if (err) reject(err.message);
					resolve('Repair completed');
				});
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}

	async orderRepairsByLocation(empLatitude, empLongitude) {
		try {
			const employeeCoordinates = {
				latitude: empLatitude,
				longitude: empLongitude
			};

			let nearByAssets = [];

			const response = await new Promise((resolve, reject) => {
				const query = `SELECT asset.GPSLatitude, asset.GPSLongitude, repair.AssetID FROM repair, asset WHERE repair.EngineerID IS NOT NULL
        AND repair.AssetID = asset.AssetID`;

				connection.query(query, (err, results) => {
					if (err) reject(new Error(err));
					results.forEach((element) => {
						let asset = {
							latitude: element.GPSLatitude,
							longitude: element.GPSLongitude
						};

						const distance = haversine(asset, employeeCoordinates, {
							unit: 'meter'
						});
						if (distance < 500) {
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
}

module.exports = Dbservice;
