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
				let query = `START TRANSACTION;`;

                for(var x=0; x<tables.length; x++){
                    for(var y=0; y<tables[x].values.length; y++){
                        query += "INSERT IGNORE INTO "+tables[x].name+" VALUES ( "+tables[x].values[y].toString() +" );";
                        console.log(tables[x].values[y].toString());
                    }
                }
                //repair update
                // for (var y=0; y<tables[5].values.length; y++){
                //     query += "UPDATE IGNORE repair SET CompletedDate = "+ tables[5].values[y][3] +" , comments = "+ tables[5].values[y][4] +" WHERE AssetID = "+ tables[5].values[y][0] +" AND CreatedDate = "+ tables[5].values[y][1] + ";";
                // }
                //test update
                // for (var y=0; y<tables[8].values.length; y++){
                //     query += "UPDATE IGNORE test SET Result = "+ tables[8].values[y][4] +" , DateCompleted = "+ tables[8].values[y][6] +", comments = "+ tables[8].values[y][10] +" WHERE TestID = "+ tables[8].values[y][0] + ";";
                // }
                query += "COMMIT;"
				connection.query(query, (err, results) => {
					if (err) reject(err.message);
					resolve('Tables Imported');
				});
			});
			return response;
        }
        catch (error){
            console.log(error.message);
        }
    }
}
module.exports = Dbservice;