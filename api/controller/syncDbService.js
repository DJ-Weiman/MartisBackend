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

    async exportAssets() {
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
                        currAss.push(results[i].last_modified);
                        
                        assets.push(currAss);
                    }
					resolve(assets);
				});
			});
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}

    async exportTests() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * from test`;

                connection.query(query, (err,result) => {
                    if (err) reject(new Error(err));

                    var tests = [];

                    for (var k = 0; k < result.length; k++){
                        var currTest = [];
                        currTest.push(result[k].TestID);
                        currTest.push(result[k].DateIssued);
                        currTest.push(result[k].AssetID);
                        currTest.push(result[k].InspectorID);
                        currTest.push(result[k].Result);
                        currTest.push(result[k].SupervisorID);
                        currTest.push(result[k].DateCompleted);
                        currTest.push(result[k].Frequency);
                        currTest.push(result[k].Priority);
                        currTest.push(result[k].TestModID);
                        currTest.push(result[k].comments);
                        currTest.push(result[k].last_modified);
                        
                        tests.push(currTest);
                    }
                    resolve(tests);
                });
            });
            return response;
        }
        catch (error) {
			console.log(error.message);
		}
    }

    async exportRepairs() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * from repair`;

                connection.query(query, (err,result) => {
                    if (err) reject(new Error(err));

                    var repairs = [];

                    for (var k = 0; k < result.length; k++){
                        var currTest = [];
                        
                        currTest.push(result[k].AssetID);
                        currTest.push(result[k].CreatedDate);
                        currTest.push(result[k].EngineerID);
                        currTest.push(result[k].CompletedDate);
                        currTest.push(result[k].comments);
                        currTest.push(result[k].last_modified);
                        
                        repairs.push(currTest);
                    }
                    resolve(repairs);
                });
            });
            return response;
        }
        catch (error) {
			console.log(error.message);
		}
    }

    async exportAccess() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * from access`;

                connection.query(query, (err,result) => {
                    if (err) reject(new Error(err));

                    var table = [];

                    for (var k = 0; k < result.length; k++){
                        var row = [];
                        row.push(result[k].AccessID);
                        row.push(result[k].Access);
                        row.push(result[k].last_modified);
                        
                        
                        table.push(row);
                    }
                    resolve(table);
                });
            });
            return response;
        }
        catch (error) {
			console.log(error.message);
		}
    }

    async exportRoles() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * from role`;

                connection.query(query, (err,result) => {
                    if (err) reject(new Error(err));

                    var table = [];

                    for (var k = 0; k < result.length; k++){
                        var row = [];
                        row.push(result[k].RoleID);
                        row.push(result[k].Title);
                        row.push(result[k].CreatedDate);
                        row.push(result[k].UpdatedDate);
                        row.push(result[k].DeletedDate);
                        row.push(result[k].last_modified);
                        
                        table.push(row);
                    }
                    resolve(table);
                });
            });
            return response;
        }
        catch (error) {
			console.log(error.message);
		}
    }

    async exportUsers() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * from user`;

                connection.query(query, (err,result) => {
                    if (err) reject(new Error(err));

                    var table = [];

                    for (var k = 0; k < result.length; k++){
                        var row = [];
                        row.push(result[k].UserID);
                        row.push(result[k].Name);
                        row.push(result[k].Email);
                        row.push(result[k].Password);
                        row.push(result[k].Region);
                        row.push(result[k].RoleID);
                        row.push(result[k].last_modified);
                        
                        
                        table.push(row);
                    }
                    resolve(table);
                });
            });
            return response;
        }
        catch (error) {
			console.log(error.message);
		}
    }

    async exportDevices() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * from device`;

                connection.query(query, (err,result) => {
                    if (err) reject(new Error(err));

                    var table = [];

                    for (var k = 0; k < result.length; k++){
                        var row = [];
                        row.push(result[k].DeviceID);
                        row.push(result[k].UserID);
                        row.push(result[k].PIN);
                        row.push(result[k].last_modified);
                        
                        table.push(row);
                    }
                    resolve(table);
                });
            });
            return response;
        }
        catch (error) {
			console.log(error.message);
		}
    }

    async exportRoleAccess() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * from roleaccess`;

                connection.query(query, (err,result) => {
                    if (err) reject(new Error(err));

                    var table = [];

                    for (var k = 0; k < result.length; k++){
                        var row = [];
                        row.push(result[k].RoleID);
                        row.push(result[k].AccessID);
                        row.push(result[k].CreatedDate);
                        row.push(result[k].UpdatedDate);
                        row.push(result[k].DeletedDate);
                        row.push(result[k].last_modified);
                        
                        table.push(row);
                    }
                    resolve(table);
                });
            });
            return response;
        }
        catch (error) {
			console.log(error.message);
		}
    }

    async exportTestModules() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * from testmodule`;

                connection.query(query, (err,result) => {
                    if (err) reject(new Error(err));

                    var table = [];

                    for (var k = 0; k < result.length; k++){
                        var row = [];
                        row.push(result[k].TestModID);
                        row.push(result[k].SupervisorID);
                        row.push(result[k].Description);
                        row.push(result[k].last_modified);
                        
                        table.push(row);
                    }
                    resolve(table);
                });
            });
            return response;
        }
        catch (error) {
			console.log(error.message);
		}
    }

    async importAll(tables){
        try{
            const response = await new Promise((resolve, reject) => {
				let query = "";// = `START TRANSACTION;`;

                //for(var x=1; x<tables.length; x++){
                    var x= 4;
                    for(var y=0; y<tables[x].values.length; y++){
                        query += "INSERT IGNORE INTO "+tables[x].name+" VALUES ("+tables[x].values[y].toString()+");";
                        console.log(query);
                    }
                //}

				connection.query(query, (err, results) => {
					if (err) {reject(err.message)};
					resolve('Tables Imported');
				});
			});
			return response;
        }
        catch (error){
            console.log(error.message);
        }
    }

    async importTest(test) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< test.length; x++){//
				const query =
					'INSERT IGNORE INTO test (TestID,DateIssued, AssetID, InspectorID, Result, SupervisorID, DateCompleted, Frequency, Priority, TestModID, comments) Values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

				connection.query(
					query,
					[ test[x][0], test[x][1], test[x][2], test[x][3], test[x][4], test[x][5], test[x][6], test[x][7], test[x][8], test[x][9], test[x][10] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Tests imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}

    async importTestModule(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					'INSERT IGNORE INTO testmodule (TestModID,SupervisorID, Description) Values ( ?, ?, ?)';

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Test modules imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}
    //edited to test the trigger 
    async importAccess(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					'INSERT INTO access (AccessID, Access, last_modified) Values ( ?, ?, ?) ON DUPLICATE KEY UPDATE Access = ?, last_modified = ?';

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2], values[x][1], values[x][2] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Access imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}

    async importAsset(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					'INSERT IGNORE INTO asset (AssetID, AssetType, Status, GPSLatitude, GPSLongitude, Region, Division, SubDivision, NearestMilePost, LastTestedDate) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2], values[x][3], values[x][4], values[x][5], values[x][6], values[x][7], values[x][8], values[x][9] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Asset imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}

    async importRole(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					'INSERT IGNORE INTO role (RoleID, Title, CreatedDate, UpdatedDate, DeletedDate) Values (?, ?, ?, ?, ?)';

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2], values[x][3], values[x][4]],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Role imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}

    async importUser(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					'INSERT IGNORE INTO user (UserID, Name, Email, Password, Region, RoleID) Values (?, ?, ?, ?, ?, ?)';

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2], values[x][3], values[x][4], values[x][5]],
					(err, results) => {
						if (err) reject(err.message);
						resolve('User imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}

    async importDevice(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					'INSERT IGNORE INTO device (DeviceID, UserID, PIN) Values (?, ?, ?)';

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2]],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Device imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}

    async importRoleAccess(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					'INSERT IGNORE INTO roleaccess (RoleID, AccessID, CreatedDate, UpdatedDate, DeletedDate) Values (?, ?, ?, ?, ?)';

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2], values[x][3], values[x][4]],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Role-access imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}

    async importRepair(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					'INSERT IGNORE INTO repair (AssetID, CreatedDate, EngineerID, CompletedDate, comments) Values (?, ?, ?, ?, ?)';

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2], values[x][3], values[x][4]],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Repair imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}

    async importRepairUpdates(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){
				const query =
					'UPDATE IGNORE repair SET EngineerID = ?, Comments = ? WHERE CreatedDate = ? AND AssetID = ?';

				connection.query(
					query,
					[ values[x][2], values[x][4], values[x][1], values[x][0] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Repair update imported');
					}
				);
                }
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}

    async importTestUpdates(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					'UPDATE IGNORE test SET Result = ?, DateCompleted = ?, comments = ? WHERE TestID = ?';

				connection.query(
					query,
					[ values[x][4], values[x][6], values[x][10], values[x][0] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Test update imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error');
		}
	}
}
module.exports = Dbservice;