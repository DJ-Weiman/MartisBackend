const mysql = require("mysql");
const connection = require("./dbConnection");
const haversine = require("haversine");
const lodash = require("lodash");
const { xor } = require("lodash");

let instance = null;

class Dbservice {
  static getDbServiceInstance() {
    return instance ? instance : new Dbservice();
  }

  async getAllRepairs() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM repair WHERE CompletedDate IS null";
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

  async getUnassignedRepairs() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM repair WHERE EngineerID IS NULL";
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

  async addRepair(AssetID, EngineerID, CreatedDate, CompletedDate, comments) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "INSERT INTO repair VALUES (?, ?, ?, ?, ?)";
        connection.query(
          query,
          [EngineerID, AssetID, CreatedDate, CompletedDate, comments],
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

  async assignEngineer(assetID, createdDate, engineerID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE repair SET EngineerID = ? WHERE CreatedDate = ? AND AssetID = ?";
        connection.query(
          query,
          [engineerID, createdDate, assetID],
          (err, results) => {
            if (err) {
              reject(err.message);
            }
            resolve("Engineer assigned");
          }
        );
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async removeAssignment(assetID, createdDate, comments) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE repair SET EngineerID = ?, Comments = ? WHERE CreatedDate = ? AND AssetID = ?";
        connection.query(
          query,
          [null, comments, createdDate, assetID],
          (err, results) => {
            if (err) reject(err.message);
            resolve("Manager Notified");
          }
        );
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async addCompletedDateAndComments(
    assetID,
    employeeid,
    createdDate,
    completedDate,
    comments,
    Result
  ) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE repair SET EngineerID = ?, CompletedDate = ? , comments = ?, Result = ? WHERE AssetID = ? AND CreatedDate = ?";
        connection.query(
          query,
          [employeeid, completedDate, comments, Result, assetID, createdDate],
          (err, results) => {
            console.log(query);
            console.log(results);
            if (err) reject(err.message);
            resolve("Repair completed");
          }
        );
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async AutoAssetDisable(AssetID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = 'UPDATE asset SET Status = "Offline" WHERE AssetID = ?;';
        connection.query(query, [AssetID], (err, results) => {
          console.log(query);
          if (err) reject(err.message);
          resolve("Change completed");
        });
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async orderRepairsByLocation(empLatitude, empLongitude) {
    try {
      const employeeCoordinates = {
        latitude: empLatitude,
        longitude: empLongitude,
      };
      let nearByAssets = [];
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT repair.AssetID, repair.CreatedDate, repair.CompletedDate, repair.comments, repair.EngineerID, asset.GPSLatitude, asset.GPSLongitude 
				FROM repair, asset 
				WHERE repair.AssetID = asset.AssetID 
				AND (repair.CompletedDate is NULL OR  repair.CompletedDate = "0000-00-00 00:00:00")`;
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err));
          results.forEach((element) => {
            let asset = {
              latitude: element.GPSLatitude,
              longitude: element.GPSLongitude,
            };
            const distance = Math.round(
              haversine(asset, employeeCoordinates, {
                unit: "km",
              })
            );
            if (distance) {
              nearByAssets.push({
                distance: distance,
                AssetID: element.AssetID,
                CreatedDate: element.CreatedDate,
                CompletedDate: element.CompletedDate,
                comments: element.comments,
                EngineerID: element.EngineerID,
                GPSLatitude: element.GPSLatitude,
                GPSLongitude: element.GPSLongitude,
              });
            }
          });
          resolve(
            lodash.sortBy(nearByAssets, (e) => {
              return e.distance;
            })
          );
        });
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Dbservice;
