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

  async createNewAsset(
    AssetID,
    AssetType,
    Status,
    GPSLatitude,
    GPSLongitude,
    Region,
    Division,
    SubDivision,
    NearestMilePost,
    LastTestedDate
  ) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO asset (AssetID, AssetType, Status, GPSLatitude, GPSLongitude, Region, Division, SubDivision, NearestMilePost, LastTestedDate) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        connection.query(
          query,
          [
            AssetID,
            AssetType,
            Status,
            GPSLatitude,
            GPSLongitude,
            Region,
            Division,
            SubDivision,
            NearestMilePost,
            LastTestedDate,
          ],
          (err, results) => {
            if (err) reject("Error in asset creation");
            resolve("New Asset added");
          }
        );
      });
      return response;
    } catch (error) {
      console.log("There was an error:"+ error.message);
      return "Error";
    }
  }

  async orderAssetsByLocation(empLatitude, empLongitude) {
    try {
      const employeeCoordinates = {
        latitude: empLatitude,
        longitude: empLongitude,
      };

      let nearByAssets = [];

      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM asset";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err));
          results.forEach((element) => {
            let asset = {
              latitude: element.GPSLatitude,
              longitude: element.GPSLongitude,
            };

            const distance = haversine(asset, employeeCoordinates, {
              unit: "meter",
            });
            if (distance < 500) {
              nearByAssets.push({
                distance: distance,
                assetID: element.AssetID,
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
