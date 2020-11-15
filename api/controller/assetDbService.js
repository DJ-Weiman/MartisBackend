const mysql = require("mysql");
const connection = require("./dbConnection");
let instance = null;

class Dbservice {
  static getDbServiceInstance() {
    return instance ? instance : new Dbservice();
  }

  async getAllAssets() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM asset";

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

  async createNewTest(
    AssetID,
    Status,
    GPSLatitude,
    GPSLongitude,
    Region,
    Division,
    SubDivision,
    NearesMilePost,
    LastTestedDate
  ) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO test (AssetID, Status, GPSLatitude, GPSLongitude, Region, Division, SubDivision, NearesMilePost, LastTestedDate) Values (?, ?, ?, ?, ?, ?, ?, ?)";

        connection.query(
          query,
          [
            AssetID,
            Status,
            GPSLatitude,
            GPSLongitude,
            Region,
            Division,
            SubDivision,
            NearesMilePost,
            LastTestedDate,
          ],
          (err, results) => {
            if (err) reject(err.message);
            resolve("New test added");
          }
        );
      });
      return response;
    } catch (error) {
      console.log("There was an error");
    }
  }
}

module.exports = Dbservice;
