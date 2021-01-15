const mysql = require("mysql");
const connection = require("./dbConnection");
let instance = null;

class Dbservice {
  static getDbServiceInstance() {
    return instance ? instance : new Dbservice();
  }

  async getReportDetails(inspectorID, InitialDate, FinalDate) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = 
        `SELECT t.Result, t.testID, t.InspectorID, t.DateCompleted, a.Division, a.SubDivision, a.NearestMilePost, a.Region, u.Name, t.comments
        from asset a, user u, testmodule tm, test t
        WHERE a.AssetID = t.AssetID
        AND u.UserID = t.InspectorID
        AND t.TestModID = tm.TestModID
        AND t.InspectorID = ?
        AND t.DateCompleted BETWEEN ?
        AND ?`;

        connection.query(
          query,
          [inspectorID, InitialDate, FinalDate],
          (err, results) => {
            if (err) reject(new Error(err));
            resolve(results);
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
