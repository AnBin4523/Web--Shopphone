function CallApi() {
  this.fectchData = function () {
    var promise = axios({
      url: "https://650f9b1754d18aabfe9a205f.mockapi.io/api/ProductPhoneHW",
      method: "GET",
    });

    return promise;
  };
  this.deleteProductById = function (id) {
    var promise = axios({
      url: `https://650f9b1754d18aabfe9a205f.mockapi.io/api/ProductPhoneHW/${id}`,
      method: "DELETE",
    });
    return promise;
  };
  this.addProductApi = function (product) {
    var promise = axios({
      url: "https://650f9b1754d18aabfe9a205f.mockapi.io/api/ProductPhoneHW",
      method: "POST",
      data: product,
    });
    return promise;
  };
  this.getProductById = function (id) {
    var promise = axios({
      url: `https://650f9b1754d18aabfe9a205f.mockapi.io/api/ProductPhoneHW/${id}`,
      method: "GET",
    });
    return promise;
  };
  this.updateProductApi = function (product) {
    return axios({
      url: `https://650f9b1754d18aabfe9a205f.mockapi.io/api/ProductPhoneHW/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}
