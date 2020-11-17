const haversine = require("haversine");
const lodash = require("lodash");
const { xor } = require("lodash");
let instance = null;

class orderByDistance {
  static getOrderByDistanceInstance() {
    return instance ? instance : new orderByDistance();
  }

  async assetIDs(assetIDs) {
    assetList = assetIDs;

    return assetList;
  }

  async getList(empLatitude, empLongitude) {
    try {
      const employeeCoordinates = {
        latitude: empLatitude,
        longitude: empLongitude,
      };

      let nearByAssets = [];

      const response = await new Promise((resolve, reject) => {
        const query = "";
      });
    } catch {}
  }
}

module.exports = orderByDistance;
