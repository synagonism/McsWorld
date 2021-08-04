module.exports = {
  /*
   * Output: current-date in format: 2017-10-17
   */
  fDateYMD: function() {
    var
      oD, sY, sM, sD;
    oD = new Date();
    sY = oD.getFullYear().toString();
    sM = (oD.getMonth() + 1).toString();
    if (sM.length == 1) {
      sM = "0" + sM;
    }
    sD = oD.getDate().toString();
    if (sD.length == 1) {
      sD = "0" + sD;
    }
    return sY + "-" + sM + "-" + sD;
  },

  /*
   * Output: current-date in format: 20190908
   */
  fDateYMD2: function() {
    var
      oD, sY, sM, sD;
    oD = new Date();
    sY = oD.getFullYear().toString();
    sM = (oD.getMonth() + 1).toString();
    if (sM.length == 1) {
      sM = "0" + sM;
    }
    sD = oD.getDate().toString();
    if (sD.length == 1) {
      sD = "0" + sD;
    }
    return sY + sM + sD;
  }
}