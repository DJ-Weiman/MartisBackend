const mysql = require("mysql");
const connection = require("./dbConnection");
let instance = null;

class Dbservice {
  static getDbServiceInstance() {
    return instance ? instance : new Dbservice();
  }

  async getAllRepairs() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM repair";

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

  async changeCompletedDate(engineerID, assetID, createdDate, completedDate) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE repair SET CompletedDate = ? WHERE AssetID = ? AND EngineerID = ? AND CreatedDate = ?";

        connection.query(
          query,
          [completedDate, assetID, engineerID, createdDate],
          (err, results) => {
            if (err) reject(err.message);
            resolve("CompletedDate changed");
          }
        );
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async addRepair(engineerID, assetID, repairDate) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO repair(EngineerID, AssetID, CreatedDate) VALUES (?,?,?)";

        connection.query(
          query,
          [engineerID, assetID, repairDate],
          (err, results) => {
            if (err) reject(err.message);
            resolve("Record added");
          }
        );
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Dbservice;
