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

  async getAllTests() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM test where DateCompleted is NULL OR DateCompleted = "0000-00-00 00:00:00"`;
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

  async getLatestTest() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT TestID FROM test ORDER BY TestID DESC limit 1`;
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
    TestID,
    DateIssued,
    AssetID,
    InspectorID,
    SupervisorID,
    Frequency,
    Priority,
    TestModID
  ) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO test (TestID,DateIssued, AssetID, InspectorID, SupervisorID, Frequency, Priority, TestModID, last_modified) Values ( ?, ?, ?, ?, ?, ?, ?, ?, UNIX_TIMESTAMP())";

        connection.query(
          query,
          [
            TestID,
            DateIssued,
            AssetID,
            InspectorID,
            SupervisorID,
            Frequency,
            Priority,
            TestModID,
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

  async importTest(
    TestID,
    DateIssued,
    AssetID,
    InspectorID,
    Result,
    SupervisorID,
    DateCompleted,
    Frequency,
    Priority,
    TestModID,
    comments
  ) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT IGNORE INTO test (TestID,DateIssued, AssetID, InspectorID, Result, SupervisorID, DateCompleted, Frequency, Priority, TestModID, comments) Values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(
          query,
          [
            TestID,
            DateIssued,
            AssetID,
            InspectorID,
            Result,
            SupervisorID,
            DateCompleted,
            Frequency,
            Priority,
            TestModID,
            comments,
          ],
          (err, results) => {
            if (err) reject(err.message);
            resolve("New test imported");
          }
        );
      });
      return response;
    } catch (error) {
      console.log("There was an error");
    }
  }

  async setResult(TestID, Result, DateCompleted, comments) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE test SET Result = ?, DateCompleted = ?, comments = ? WHERE TestID = ?";
        connection.query(
          query,
          [Result, DateCompleted, comments, TestID],
          (err, results) => {
            if (err) reject(err.message);
            resolve("Record updated");
          }
        );
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async AutoInsertIntoRepair(AssetID, CreatedDate) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "INSERT INTO repair(AssetID, CreatedDate) VALUES (?, ?)";
        connection.query(query, [AssetID, CreatedDate], (err, results) => {
          console.log(query);
          if (err) reject(err.message);
          resolve("Repair Entry Added");
        });
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async orderByLocationAndInspector(empId, empLatitude, empLongitude) {
    try {
      const employeeCoordinates = {
        latitude: empLatitude,
        longitude: empLongitude,
      };
      let nearByAssets = [];
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT t.InspectorID, a.GPSLatitude, a.GPSLongitude, t.AssetID, t.TestID, t.TestModID
                        from test t, asset a
                        where t.AssetID = a.AssetID
                        AND (DateCompleted is NULL OR  DateCompleted = "0000-00-00 00:00:00")`;
        connection.query(query, [empId], (err, results) => {
          if (err) reject(new Error(err));
          console.log(results);
          results.forEach((element) => {
            let asset = {
              latitude: element.GPSLatitude,
              longitude: element.GPSLongitude,
            };
            const distance = Math.round(
              haversine(asset, employeeCoordinates, {
                unit: "meter",
              })
            );
            if (distance) {
              nearByAssets.push({
                distance: distance,
                AssetID: element.AssetID,
                InspectorID: element.InspectorID,
                TestID: element.TestID,
                TestModID: element.TestModID,
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

  async orderByLocationAndInspectorAndEmpID(empId, empLatitude, empLongitude) {
    try {
      const employeeCoordinates = {
        latitude: empLatitude,
        longitude: empLongitude,
      };
      let nearByAssets = [];
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT t.InspectorID, a.GPSLatitude, a.GPSLongitude, t.AssetID, t.TestID, t.TestModID
                        from test t, asset a
                        where t.AssetID = a.AssetID
                        AND (DateCompleted is NULL OR  DateCompleted = "0000-00-00 00:00:00")
						AND t.InspectorID = (?)`;
        connection.query(query, [empId], (err, results) => {
          if (err) reject(new Error(err));
          console.log(results);
          results.forEach((element) => {
            let asset = {
              latitude: element.GPSLatitude,
              longitude: element.GPSLongitude,
            };
            const distance = Math.round(
              haversine(asset, employeeCoordinates, {
                unit: "meter",
              })
            );
            if (distance) {
              nearByAssets.push({
                distance: distance,
                AssetID: element.AssetID,
                InspectorID: element.InspectorID,
                TestID: element.TestID,
                TestModID: element.TestModID,
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

  async orderByPriority() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * from test where DateCompleted is NULL or DateCompleted = "0000-00-00 00:00:00" ORDER by Priority ASC`;
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

  async orderByPriorityAndEmpID(empId) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * from test where (DateCompleted is NULL or DateCompleted = "0000-00-00 00:00:00") AND InspectorID = (?) ORDER by Priority ASC`;
        connection.query(query, [empId], (err, results) => {
          if (err) reject(new Error(err));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Dbservice;
