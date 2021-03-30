const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const dbService = require("../controller/syncDbService");
const { urlencoded } = require("body-parser");
const db = dbService.getDbServiceInstance();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/export", (req, res) => {
  const result = db.exportAssets();

  result
    .then((data) => {
      console.log(data);
      var assetData = data;
      const testResults = db.exportTests();
      testResults
        .then((data2) => {
          var testData = data2;
          const repairResults = db.exportRepairs();

          repairResults
            .then((data3) => {
              var repairData = data3;
              const accessResults = db.exportAccess();

              accessResults
                .then((data4) => {
                  var accessData = data4;
                  const roleResults = db.exportRoles();

                  roleResults
                    .then((data5) => {
                      var roleData = data5;
                      const userResults = db.exportUsers();

                      userResults
                        .then((data6) => {
                          var userData = data6;
                          const deviceResults = db.exportDevices();

                          deviceResults
                            .then((data7) => {
                              var deviceData = data7;
                              const roleaccessResults = db.exportRoleAccess();

                              roleaccessResults
                                .then((data8) => {
                                  var roleaccessData = data8;
                                  const testmoduleResults = db.exportTestModules();

                                  testmoduleResults
                                    .then((data9) => {
                                      var testmoduleData = data9;
                                      const dataToImport = {
                                        database: "martis",
                                        version: 1,
                                        encrypted: false,
                                        mode: "full",
                                        tables: [
                                          {
                                            name: "access",
                                            schema: [
                                              {
                                                column: "AccessID",
                                                value:
                                                  "TEXT PRIMARY KEY NOT NULL",
                                              },
                                              {
                                                column: "Access",
                                                value: "TEXT NOT NULL",
                                              },
                                            ],
                                            values: accessData,
                                          },
                                          {
                                            name: "asset",
                                            schema: [
                                              {
                                                column: "AssetID",
                                                value:
                                                  "TEXT PRIMARY KEY NOT NULL",
                                              },
                                              {
                                                column: "AssetType",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "Status",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "GPSLatitude",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "GPSLongitude",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "Region",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "Division",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "SubDivision",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "NearestMilePost",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "LastTestedDate",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                            ],
                                            values: assetData,
                                          },
                                          {
                                            name: "role",
                                            schema: [
                                              {
                                                column: "RoleID",
                                                value:
                                                  "TEXT PRIMARY KEY NOT NULL",
                                              },
                                              {
                                                column: "Title",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "CreatedDate",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "UpdatedDate",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "DeletedDate",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                            ],
                                            values: roleData,
                                          },
                                          {
                                            name: "user",
                                            schema: [
                                              {
                                                column: "UserID",
                                                value:
                                                  "TEXT PRIMARY KEY NOT NULL",
                                              },
                                              {
                                                column: "Name",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "Email",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "Password",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "Region",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "RoleID",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                constraint: "user_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (RoleID) REFERENCES role (RoleID)",
                                              },
                                            ],
                                            values: userData,
                                          },
                                          {
                                            name: "device",
                                            schema: [
                                              {
                                                column: "DeviceID",
                                                value:
                                                  "TEXT PRIMARY KEY NOT NULL",
                                              },
                                              {
                                                column: "UserID",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "PIN",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                constraint: "device_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (UserID) REFERENCES user(UserID)",
                                              },
                                            ],
                                            values: deviceData,
                                          },
                                          {
                                            name: "repair",
                                            schema: [
                                              {
                                                column: "AssetID",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "CreatedDate",
                                                value: "TEXT NOT NULL",
                                              },
											  {
                                                column: "EngineerID",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "CompletedDate",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "comments",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                constraint: "PK_repair",
                                                value:
                                                  "PRIMARY KEY (AssetID, CreatedDate)",
                                              },
                                              {
                                                constraint: "repair_ibfk_2",
                                                value:
                                                  "FOREIGN KEY (EngineerID) REFERENCES user(UserID)",
                                              },
                                              {
                                                constraint: "repair_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (AssetID) REFERENCES asset(AssetID)",
                                              },
                                            ],
                                            values: repairData,
                                          },
                                          {
                                            name: "roleaccess",
                                            schema: [
                                              {
                                                column: "RoleID",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "AccessID",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "CreatedDate",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "UpdatedDate",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "DeletedDate",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                constraint: "PK_roleaccesss",
                                                value:
                                                  "PRIMARY KEY (RoleID, AccessID)",
                                              },
                                              {
                                                constraint: "roleaccess_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (RoleID) REFERENCES role(RoleID)",
                                              },
                                              {
                                                constraint: "roleaccess_ibfk_2",
                                                value:
                                                  "FOREIGN KEY (AccessID) REFERENCES access(AccessID)",
                                              },
                                            ],
                                            values: roleaccessData,
                                          },
                                          {
                                            name: "testmodule",
                                            schema: [
                                              {
                                                column: "TestModID",
                                                value:
                                                  "TEXT PRIMARY KEY NOT NULL",
                                              },
                                              {
                                                column: "SupervisorID",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "Description",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                constraint: "testmodule_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (SupervisorID) REFERENCES user (UserID)",
                                              },
                                            ],
                                            values: testmoduleData,
                                          },
                                          {
                                            name: "test",
                                            schema: [
                                              {
                                                column: "TestID",
                                                value:
                                                  "TEXT PRIMARY KEY NOT NULL",
                                              },
                                              {
                                                column: "DateIssued",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "AssetID",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "InspectorID",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "Result",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "SupervisorID",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "DateCompleted",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                column: "Frequency",
                                                value: "INTEGER NOT NULL",
                                              },
                                              {
                                                column: "Priority",
                                                value: "INTEGER DEFAULT NULL",
                                              },
                                              {
                                                column: "TestModID",
                                                value: "TEXT NOT NULL",
                                              },
                                              {
                                                column: "comments",
                                                value: "TEXT DEFAULT NULL",
                                              },
                                              {
                                                constraint: "test_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (AssetID) REFERENCES asset(AssetID)",
                                              },
                                              {
                                                constraint: "test_ibfk_2",
                                                value:
                                                  "FOREIGN KEY (InspectorID) REFERENCES user(UserID)",
                                              },
                                              {
                                                constraint: "test_ibfk_3",
                                                value:
                                                  "FOREIGN KEY (SupervisorID) REFERENCES user (UserID)",
                                              },
                                              {
                                                constraint: "test_ibfk_4",
                                                value:
                                                  "FOREIGN KEY (TestModID) REFERENCES testmodule (TestModID)",
                                              },
                                            ],
                                            values: testData,
                                          },
                                        ],
                                      };
                                      res.json(dataToImport);
                                    })
                                    .catch((err) => console.log(err));
                                })
                                .catch((err) => console.log(err));
                            })
                            .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/exportTests", (req, res) => {
  const result = db.exportTests();

  result
    .then((data) => {
      console.log(data);

      res.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
