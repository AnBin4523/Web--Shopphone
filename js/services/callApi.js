function CallApi() {
  this.fectchData = function () {
    var promise = axios({
      url: "https://650f9b1754d18aabfe9a205f.mockapi.io/api/ProductPhoneHW",
      method: "GET",
    });
    return promise;
  };
}
