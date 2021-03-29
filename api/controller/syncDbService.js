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
                SELECT CONCAT("{", 
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
				,"}") 
				as json FROM test where DateCompleted is NULL;
                SELECT CONCAT("{", 
				GROUP_CONCAT( 
				CONCAT("['",AssetID,"',"),
				CONCAT("'",AssetType,"',"),
				CONCAT("'",Status,"',"),
				CONCAT("'",GPSLatitude,"',"),
				CONCAT("'",GPSLongitude,"',"),
				CONCAT("'",Region,"',"),
				CONCAT("'",Division,"',"),
				CONCAT("'",SubDivision,"',"),
                CONCAT("'",NearestMilePost,"',"),
				CONCAT("'",LastTestedDate,"']")
				) 
				,"}") 
				as arson FROM asset;
                SELECT CONCAT("{", 
				GROUP_CONCAT( 
				CONCAT("['",EngineerID,"',"),
				CONCAT("'",AssetID,"',"),
				CONCAT("'",CreatedDate,"',"),
				CONCAT("'",CompletedDate,"',"),
				CONCAT("'",comments,"']")
				) 
				,"}") 
				as reparson FROM repair;
                COMMIT;
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
module.exports = Dbservice;