const mysql = require("mysql");
let instance = null;

const connection = require("./dbConnection");

class Dbservice {
  static getDbServiceInstance() {
    return instance ? instance : new Dbservice();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM user";

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

  async getEmps() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT UserID, Name FROM user";

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

  async createNewUser(userID, name, email, password, designation, roleID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?) ";

        connection.query(
          query,
          [userID, name, email, password, designation, roleID],
          (err, result) => {
            if (err) reject(new Error(err));
            resolve({ Status: "Sucessful" });
          }
        );
      });

      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  async checkExistingUser(email) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM user WHERE email=?";

        connection.query(query, [email], (err, results) => {
          if (err) reject(new Error(err));
          resolve(results[0]);
        });
      });
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  async deleteUser(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE from user WHERE UserID=?";

        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err));
          resolve({ message: "This record was removed" });
        });
      });
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  async getUserNameAndRole(userID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT u.Name, r.Title FROM user u, role r where r.RoleID = u.RoleID AND u.UserID = ?";

        connection.query(query, [userID], (err, results) => {
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
