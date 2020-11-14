const mysql = require('mysql');
const connection = require('./dbConnection');
let instance = null;

class Dbservice{
    static getDbServiceInstance(){
        return instance ? instance : new Dbservice();
    };

    async getAllData(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM test";

                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err));
                    resolve(results)
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }

    async changeStatus(assetID, inspectorID, status){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE test SET Result = ? WHERE AssetID = ? AND InspectorID = ?";

                connection.query(query, [status, assetID, inspectorID], (err, results) => {
                    if(err) reject(err.message);
                    resolve("Status changed");
                })
            })
            return response;
        }
        catch(error){
            console.log(error.message);
        }
    }
}


module.exports = Dbservice;