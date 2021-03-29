const mysql = require('mysql');
const connection = require('./dbConnection');
const haversine = require('haversine');
const lodash = require('lodash');
const { xor, values } = require('lodash');
let instance = null;

class Dbservice {
	static getDbServiceInstance() {
		return instance ? instance : new Dbservice();
	}

	async exportAll() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = `START TRANSACTION;
                SELECT * FROM asset;
                SELECT * FROM repair;
                SELECT * FROM test WHERE CompletedDate IS NULL;
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

    async exAll() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = `SELECT * FROM asset;`;

				connection.query(query, (err, results) => {
					if (err) reject(new Error(err));

                    var assets = [];

                    for (var i =0; i <results.length; i++){

                        var currAss = [];
                        currAss.push(results[i].AssetID);
                        currAss.push(results[i].AssetType);
                        currAss.push(results[i].Status);
                        currAss.push(results[i].GPSLatitude);
                        currAss.push(results[i].GPSLongitude);
                        currAss.push(results[i].Region);
                        currAss.push(results[i].Division);
                        currAss.push(results[i].SubDivision);
                        currAss.push(results[i].NearestMilePost);
                        currAss.push(results[i].LastTestedDate);
                        
                        assets.push(currAss);
                    }
					//resolve(assets);
				});

                const query2 = `SELECT * from test`;

                connection.query(query2, (err2,result) => {
                    if (err2) reject(new Error(err2));

                    var tests = [];

                    for (var i = 0; i < result.length; i++){
                        var currTest = [];
                        currTest.push(result[i].TestID);
                        currTest.push(result[i].DateIssued);
                        
                        tests.push(currTest);
                    }
                    
                    var exportJsonText = {
                        "json":
                    [
                        {
                            "name" : "asset",
                            "values": assets
                        },
                        {
                            "name": "test",
                            "values": tests
                        }
                    ]
                    };

                    resolve(exportJsonText);

                })
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}
}
module.exports = Dbservice;