var api = new CallApi();

function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  var promise = api.fectchData();

  promise
    .then(function (result) {
      renderProduct(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProduct();

function renderProduct(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
       
        <div class="product_item">
        <img src="${product.img}" />
        <div class="item_title">
          <h3>${product.name}</h3>
          <span>${product.price}</span>
        </div>
        
        <p class="sub_title">${product.type}</p>
        

        <div class="product_action">
          <div class="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <button class="buy_now">Add to cart</button>
        </div>
      </div>
        
        `;
  }
  getEle("listProduct").innerHTML = content;
}
