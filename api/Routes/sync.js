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
              const accessResults = db.exportAccess(); //del

              accessResults
                .then((data4) => {
                  var accessData = data4;
                  const roleResults = db.exportRoles();//del

                  roleResults
                    .then((data5) => {
                      var roleData = data5;
                      const userResults = db.exportUsers();

                      userResults
                        .then((data6) => {
                          var userData = data6;
                          const deviceResults = db.exportDevices();//del

                          deviceResults
                            .then((data7) => {
                              var deviceData = data7;
                              const roleaccessResults = db.exportRoleAccess();//del

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
                                                column: "id",
                                                value:
                                                  "TEXT PRIMARY KEY NOT NULL",
                                              },
                                              {
                                                column: "Access",
                                                value: "TEXT NOT NULL",
                                              },
                                              { 
                                                column: "last_modified",
                                                value: "INTEGER DEFAULT (strftime('%s', 'now'))" 
                                              }
                                            ],
                                            values: accessData,
                                          },
                                          {
                                            name: "asset",
                                            schema: [
                                              {
                                                column: "id",
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
                                              { 
                                                column: "last_modified",
                                                value: "INTEGER DEFAULT (strftime('%s', 'now'))" 
                                              }
                                            ],
                                            values: assetData,
                                          },
                                          {
                                            name: "role",
                                            schema: [
                                              {
                                                column: "id",
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
                                              { 
                                                column: "last_modified",
                                                value: "INTEGER DEFAULT (strftime('%s', 'now'))" 
                                              }
                                            ],
                                            values: roleData,
                                          },
                                          {
                                            name: "user",
                                            schema: [
                                              {
                                                column: "id",
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
                                                column: "last_modified",
                                                value: "INTEGER DEFAULT (strftime('%s', 'now'))" 
                                              },
                                              {
                                                constraint: "user_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (RoleID) REFERENCES role (id) ON DELETE CASCADE",
                                              },
                                            ],
                                            values: userData,
                                          },
                                          {
                                            name: "device",
                                            schema: [
                                              {
                                                column: "id",
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
                                                column: "last_modified",
                                                value: "INTEGER DEFAULT (strftime('%s', 'now'))" 
                                              },
                                              {
                                                constraint: "device_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (UserID) REFERENCES user(id) ON DELETE CASCADE",
                                              },
                                            ],
                                            values: deviceData,
                                          },
                                          {
                                            name: "repair",
                                            schema: [
                                              {
                                                column: "id",
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
                                                column: "last_modified",
                                                value: "INTEGER DEFAULT (strftime('%s', 'now'))" 
                                              },
                                              {
                                                constraint: "PK_repair",
                                                value:
                                                  "PRIMARY KEY (id, CreatedDate)",
                                              },
                                              {
                                                constraint: "repair_ibfk_2",
                                                value:
                                                  "FOREIGN KEY (EngineerID) REFERENCES user(id) ON DELETE CASCADE",
                                              },
                                              {
                                                constraint: "repair_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (id) REFERENCES asset(id) ON DELETE CASCADE",
                                              },
                                            ],
                                            values: repairData,
                                          },
                                          {
                                            name: "roleaccess",
                                            schema: [
                                              {
                                                column: "id",
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
                                                column: "last_modified",
                                                value: "INTEGER DEFAULT (strftime('%s', 'now'))" 
                                              },
                                              {
                                                constraint: "PK_roleaccesss",
                                                value:
                                                  "PRIMARY KEY (id, AccessID)",
                                              },
                                              {
                                                constraint: "roleaccess_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (id) REFERENCES role(id) ON DELETE CASCADE",
                                              },
                                              {
                                                constraint: "roleaccess_ibfk_2",
                                                value:
                                                  "FOREIGN KEY (AccessID) REFERENCES access(id) ON DELETE CASCADE",
                                              },
                                            ],
                                            values: roleaccessData,
                                          },
                                          {
                                            name: "testmodule",
                                            schema: [
                                              {
                                                column: "id",
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
                                                column: "last_modified",
                                                value: "INTEGER DEFAULT (strftime('%s', 'now'))" 
                                              },
                                              {
                                                constraint: "testmodule_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (SupervisorID) REFERENCES user (id) ON DELETE CASCADE",
                                              },
                                            ],
                                            values: testmoduleData,
                                          },
                                          {
                                            name: "test",
                                            schema: [
                                              {
                                                column: "id",
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
                                                column: "last_modified",
                                                value: "INTEGER DEFAULT (strftime('%s', 'now'))" 
                                              },
                                              {
                                                constraint: "test_ibfk_1",
                                                value:
                                                  "FOREIGN KEY (AssetID) REFERENCES asset(id) ON DELETE CASCADE",
                                              },
                                              {
                                                constraint: "test_ibfk_2",
                                                value:
                                                  "FOREIGN KEY (InspectorID) REFERENCES user(id) ON DELETE CASCADE",
                                              },
                                              {
                                                constraint: "test_ibfk_3",
                                                value:
                                                  "FOREIGN KEY (SupervisorID) REFERENCES user (id) ON DELETE CASCADE",
                                              },
                                              {
                                                constraint: "test_ibfk_4",
                                                value:
                                                  "FOREIGN KEY (TestModID) REFERENCES testmodule (id) ON DELETE CASCADE",
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

router.get("/partialexport", (req, res) => {
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
                                        mode: "partial",
                                        tables: [
                                          {
                                            name: "access",
                                            values: accessData,
                                          },
                                          {
                                            name: "asset",
                                            values: assetData,
                                          },
                                          {
                                            name: "role",
                                            values: roleData,
                                          },
                                          {
                                            name: "user",
                                            values: userData,
                                          },
                                          {
                                            name: "device",
                                            values: deviceData,
                                          },
                                          {
                                            name: "repair",
                                            values: repairData,
                                          },
                                          {
                                            name: "roleaccess",
                                            values: roleaccessData,
                                          },
                                          {
                                            name: "testmodule",
                                            values: testmoduleData,
                                          },
                                          {
                                            name: "test",
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

router.post("/fullimport", (req,res) => {
  let tables = req.body.tables;

  console.log(req.body.tables);

  const result = db.importAccess(tables[0].values); 

	result
		.then((reply) => {
      const result2 = db.importAsset(tables[1].values); 

      result2
      .then((reply) =>{
        const result3 = db.importRole(tables[2].values); 
        
        result3
        .then((reply) => {
          const result4 = db.importUser(tables[3].values);

          result4
          .then((reply) => {
            const result5 = db.importDevice(tables[4].values);

            result5
            .then((reply) => {
              const result6 = db.importRepair(tables[5].values); 

              result6
              .then((reply) => {
                const result7 = db.importRoleAccess(tables[6].values); 

                result7
                .then((reply) =>{
                  const result8 = db.importTestModule(tables[7].values);

                  result8
                  .then((reply) => {
                    const result9 = db.importTest(tables[8].values); 

                    result9
                    .then((reply) => res.json(reply))
                    .catch((err9) => console.log(err9)); 
                    })
                    .catch((err8) => console.log(err8));    
                  })
                  .catch((err7) => console.log(err7));  
                })
                .catch((err6) => console.log(err6));     
              })
              .catch((err5) => console.log(err5));   
            })
            .catch((err4) => console.log(err4));  
          })
          .catch((err3) => console.log(err3));  
        })
        .catch((err2) => console.log(err2));  
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
