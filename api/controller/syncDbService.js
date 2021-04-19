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
            console.log("test");
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< test.length; x++){//
				const query =
					`INSERT INTO test (TestID,DateIssued, AssetID, InspectorID, Result, SupervisorID, DateCompleted, Frequency, Priority, TestModID, comments, last_modified) Values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE DateIssued = VALUES(DateIssued), AssetID = VALUES(AssetID), InspectorID = VALUES(InspectorID), Result = VALUES(Result), SupervisorID = VALUES(SupervisorID), DateCompleted = VALUES(DateCompleted), Frequency = VALUES(Frequency), Priority = VALUES(Priority), TestModID = VALUES(TestModID), comments = VALUES(comments), last_modified = VALUES(last_modified)`;
                
				connection.query(
					query,
					[ test[x][0], test[x][1], test[x][2], test[x][3], test[x][4], test[x][5], test[x][6], test[x][7], test[x][8], test[x][9], test[x][10], test[x][11] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Tests imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error in test import');
		}
	}
//edited to test the triggger 
    async importTestModule(values) {
		try {
            console.log("TM");
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					'INSERT INTO testmodule (TestModID,SupervisorID, Description, last_modified) Values ( ?, ?, ?, ?) ON DUPLICATE KEY UPDATE SupervisorID = VALUES(SupervisorID), Description = VALUES(Description), last_modified = VALUES(last_modified)';

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2], values[x][3]],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Test modules imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error in test module import');
		}
	}
    //edited to test the trigger 
    async importAccess(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					'INSERT INTO access (AccessID, Access, last_modified) Values ( ?, ?, ?) ON DUPLICATE KEY UPDATE Access = VALUES(Access), last_modified = VALUES(last_modified)';

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Access imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error in access import');
		}
	}

    async importAsset(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					`INSERT INTO asset (AssetID, AssetType, Status, GPSLatitude, GPSLongitude, Region, Division, SubDivision, NearestMilePost, LastTestedDate, last_modified) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE AssetType = VALUES(AssetType), Status = VALUES(Status), GPSLatitude = VALUES(GPSLatitude), 
                    GPSLongitude = VALUES(GPSLongitude), Region = VALUES(Region), Division = VALUES(Division), 
                    SubDivision = VALUES(SubDivision), NearestMilePost = VALUES(NearestMilePost), 
                    LastTestedDate = VALUES(LastTestedDate), last_modified = VALUES(last_modified)`;
                
                    var aType = (values[x][1].toString() == "NULL") ? null : values[x][1];
				connection.query(
					query,
					[ values[x][0], aType, values[x][2], values[x][3], values[x][4], values[x][5], values[x][6], values[x][7], values[x][8], values[x][9].toString().replace(/T/, ' ').replace(/\..+/, ''), values[x][10] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Asset imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error in asset import:'+error.message);
		}
	}

    async importRole(values) {
		try {
            
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					`INSERT INTO role (RoleID, Title, CreatedDate, UpdatedDate, DeletedDate, last_modified) Values (?, ?, ?, ?, ?, ?) 
                    ON DUPLICATE KEY UPDATE Title = VALUES(Title), CreatedDate = VALUES(CreatedDate), UpdatedDate = VALUES(UpdatedDate), DeletedDate = VALUES(DeletedDate), last_modified = VALUES(last_modified)`;

                    var createdD = (values[x][2].toString() == "NULL")? null : values[x][2].toString().replace(/T/, ' ').replace(/\..+/, '');
                    var updatedD = (values[x][3].toString() == "NULL")? null : values[x][3].toString().replace(/T/, ' ').replace(/\..+/, '');
                    var deletedD = (values[x][4].toString() == "NULL")? null : values[x][4].toString().replace(/T/, ' ').replace(/\..+/, '');
				connection.query(
					query,
					[ values[x][0], values[x][1], createdD, updatedD, deletedD, values[x][5] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Role imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error in role import:'+ error.message);
		}
	}

    async importUser(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					`INSERT INTO user (UserID, Name, Email, Password, Region, RoleID, last_modified) Values (?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE Name = VALUES(Name), Email = VALUES(Email), Password = VALUES(Password), Region = VALUES(Region), RoleID = VALUES(RoleID), last_modified = VALUES(last_modified)`;

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2], values[x][3], values[x][4], values[x][5], values[x][6] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('User imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error in user import');
		}
	}

    async importDevice(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					`INSERT INTO device (DeviceID, UserID, PIN, last_modified) Values (?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE UserID = VALUES(UserID), PIN = VALUES(PIN), last_modified = VALUES(last_modified)`;

				connection.query(
					query,
					[ values[x][0], values[x][1], values[x][2], values[x][3] ],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Device imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error in device import');
		}
	}

    async importRoleAccess(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					`INSERT IGNORE INTO roleaccess (RoleID, AccessID, CreatedDate, UpdatedDate, DeletedDate) Values (?, ?, ?, ?, ?)`;

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
			console.log('There was an error in roleaccess import');
		}
	}

    async importRepair(values) {
		try {
			const response = await new Promise((resolve, reject) => {
                for(var x = 0; x< values.length; x++){//
				const query =
					`INSERT INTO repair (AssetID, CreatedDate, EngineerID, CompletedDate, comments, last_modified) Values (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE AssetID = VALUES(AssetID), CreatedDate = VALUES(CreatedDate), EngineerID = VALUES(EngineerID), CompletedDate = VALUES(CompletedDate), comments = VALUES(comments), last_modified = VALUES(last_modified)`;

                    var engineerID = (values[x][2].toString() == "NULL")? null : values[x][2];
                    var completedD = (values[x][3].toString() == "NULL")? null : values[x][3].toString().replace(/T/, ' ').replace(/\..+/, '');
                    var comments = (values[x][4].toString() == "NULL")? null : values[x][4];
				connection.query(
					query,
					[ values[x][0], values[x][1].toString().replace(/T/, ' ').replace(/\..+/, ''), engineerID, completedD, comments, values[x][5]],
					(err, results) => {
						if (err) reject(err.message);
						resolve('Repair imported');
					}
				);
                }//
			});
			return response;
		} catch (error) {
			console.log('There was an error in repair import');
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
			console.log('There was an error in repair update');
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