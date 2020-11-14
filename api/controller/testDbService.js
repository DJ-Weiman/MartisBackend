const mysql = require("mysql");
const connection = require("./dbConnection");
let instance = null;

class Dbservice {
  static getDbServiceInstance() {
    return instance ? instance : new Dbservice();
  }

  async getAllTests() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM test";

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
    Urgent,
    TestModID
  ) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO test (TestID, DateIssued, AssetID, InspectorID, SupervisorID, Frequency, Urgent, TestModID) Values (?, ?, ?, ?, ?, ?, ?, ?)";

        connection.query(
          query,
          [
            TestID,
            DateIssued,
            AssetID,
            InspectorID,
            SupervisorID,
            Frequency,
            Urgent,
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

  async setResult(TestID, Result, DateCompleted) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE test SET Result = ?, DateCompleted = ? WHERE TestID = ?";

        connection.query(
          query,
          [Result, DateCompleted, TestID],
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
