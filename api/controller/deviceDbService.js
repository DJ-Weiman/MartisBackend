const mysql = require("mysql");
let instance = null;

const connection = require("./dbConnection");

class Dbservice {
  static getDbServiceInstance() {
    return instance ? instance : new Dbservice();
  }

  async getAllDevices() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM device";

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

  async getDeviceByID(deviceID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM device d WHERE d.DeviceID=? ";

        connection.query(query, [deviceID], (err, result) => {
          if (err) reject(new Error(err));
          resolve(result);
        });
      });

      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  async setPinAndID(deviceId, userId, devicePin) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "INSERT INTO device values (?,?,?, UNIX_TIMESTAMP())";

        connection.query(
          query,
          [deviceId, userId, devicePin],
          (err, result) => {
            if (err) reject(new Error(err));
            resolve(result);
          }
        );
      });

      return response;
    } catch (err) {
      console.log(err.message);
    }
  }
}

module.exports = Dbservice;
