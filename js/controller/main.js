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

// lọc brand
function filterProductsByBrand() {
  var brandCheckboxes = document.querySelectorAll('.brand_name');

  var selectedBrands = [];

  brandCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedBrands.push(checkbox.value);
    }
  });

  var productItems = document.querySelectorAll('.product_item');

  productItems.forEach(function (item) {
    var productBrand = item.querySelector('.sub_title').textContent;

    if (selectedBrands.includes(productBrand) || selectedBrands.includes('All')) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

var brandCheckboxes = document.querySelectorAll('.brand_name');
brandCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', filterProductsByBrand);
});