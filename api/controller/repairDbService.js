const mysql = require('mysql');
const connection = require('./dbConnection');
let instance = null;

class Dbservice{
    static getDbServiceInstance(){
        return instance ? instance : new Dbservice();
    };

    async getAllRepairs(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM repair";

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

    async changeComments(engineerID, assetID, repairDate, comments){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE repair SET Comments = ? WHERE AssetID = ? AND EngineeerID = ? AND RepairDate = ?";

                connection.query(query, [comments, assetID, engineerID,  repairDate], (err, results) => {
                    if(err) reject(err.message);
                    resolve("Comment changed");
                })
            })
            return response;
        }
        catch(error){
            console.log(error.message);
        }
    }

    async addRepair(engineerID, assetID, repairDate, comments){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO repair VALUES (?,?,?,?)";

                connection.query(query, [engineerID, assetID, repairDate, comments], (err, results) => {
                    if(err) reject(err.message);
                    resolve("Repair added");
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