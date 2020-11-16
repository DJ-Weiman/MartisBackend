const mysql = require('mysql');
const connection = require('./dbConnection');
let instance = null;

class Dbservice {
	static getDbServiceInstance() {
		return instance ? instance : new Dbservice();
	}

	async getAllRepairs() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'SELECT * FROM repair';

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

<<<<<<< HEAD
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

	async addRepair(assetID, createdDate) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = 'INSERT INTO repair(AssetID, CreatedDate) VALUES (?,?)';
=======
  // async addRepair(assetID, createdDate) {
  //   try {
  //     const response = await new Promise((resolve, reject) => {
  //       const query = "INSERT INTO repair(AssetID, CreatedDate) VALUES (?,?)";

  //       connection.query(query, [assetID, createdDate], (err, results) => {
  //         if (err) reject(err.message);
  //         resolve("Record added");
  //       });
  //     });
  //     return response;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
>>>>>>> 892ce675a4fbfb3971a1dd06cc0c24123cc8ddc0

				connection.query(query, [ assetID, createdDate ], (err, results) => {
					if (err) reject(err.message);
					resolve('Record added');
				});
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
					if (err) reject(err.message);
					resolve('Engineer assigned');
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
				const query = 'UPDATE repair SET CompletedDate = ?, comments = ? WHERE AssetID = ? AND CreatedDate = ?';

				connection.query(query, [ completedDate, comments, assetID, createdDate ], (err, results) => {
					if (err) reject(err.message);
					resolve('CompletedDate changed');
				});
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}
}

module.exports = Dbservice;
