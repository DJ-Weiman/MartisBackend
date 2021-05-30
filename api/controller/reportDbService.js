const mysql = require('mysql');
const connection = require('./dbConnection');
let instance = null;

class Dbservice {
	static getDbServiceInstance() {
		return instance ? instance : new Dbservice();
	}

	async getReportDetails(inspectorID, InitialDate, FinalDate) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = `SELECT t.TestID, t.InspectorID, t.DateCompleted, a.Division, a.SubDivision, a.NearestMilePost, u.Region, t.Result, u.Email, u.Name, t.comments
        from asset a, user u, testmodule tm, test t
        WHERE a.AssetID = t.AssetID
        AND u.UserID = t.InspectorID
        AND t.TestModID = tm.TestModID
        AND t.InspectorID = ? 
		AND t.DateCompleted IS NOT NULL
        AND t.DateIssued BETWEEN ?
        AND ? `;

				connection.query(query, [ inspectorID, InitialDate, FinalDate ], (err, results) => {
					if (err) reject(new Error(err));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}

	async getAssetReportDetails(assetID, InitialDate, FinalDate) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = `SELECT a.Status,a.Region, t.Result,a.GPSLatitude, a.GPSLongitude, t.TestID, t.InspectorID, t.DateCompleted, a.Division, a.SubDivision, a.NearestMilePost, t.comments from asset a, test t WHERE a.AssetID = t.AssetID AND t.AssetID = ? AND t.DateCompleted IS NOT NULL AND t.DateIssued BETWEEN ? AND ?  `;

				connection.query(query, [ assetID, InitialDate, FinalDate ], (err, results) => {
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
