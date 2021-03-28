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

	async exportAll() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = `START TRANSACTION;
                SELECT * FROM test where DateCompleted is NULL;
                SELECT * FROM asset;
                SELECT * FROM repair;
                `;

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