var api = new CallApi();
var products = [];
const cart = new Cart();

getLocalStorage();

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
  products = data;
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
          <button class="buy_now" onclick="addToCart('${product.id}')">Add to cart</button>
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

// tạo giỏ hàng
function addToCart(id) {
  // Tìm sản phẩm trong giỏ hàng dựa trên id
  const existingItem = cart.list.find((item) => item.id === id);

  if (existingItem) {
    // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1 đơn vị
    cart.increaseQuantity(id);
  } else {
    const existingProduct = products.find((item) => item.id === id);
    // Nếu sản phẩm chưa có trong giỏ hàng, tạo đối tượng mới và thêm vào giỏ hàng
    const cartItem = new CartItem(existingProduct.id, existingProduct.name, existingProduct.price, existingProduct.img, 1);
    cart.themSP(cartItem);
  }
  // console.log(cart.list);
  renderCart();
  setLocalStorage();
}

function renderCart() {
  var contentItem = "";
  var contentTotal = "";
  var total = 0;

  for (var i = 0; i < cart.list.length; i++) {
    var cartItem = cart.list[i];

    var itemPrice = cartItem.price * cartItem.quantity;
    total += itemPrice;

    contentItem += `
      <tr>
        <td>
          <img src="${cartItem.img}">
          <span>${cartItem.name}</span>
        </td>
        <td><span>${cartItem.price}</span></td>
        <td>
          <button class="btn-quantity btn-success btn-increase" onclick="changeQuantity('${cartItem.id}', 'increase')">+</button>
          <span>${cartItem.quantity}</span>
          <button class="btn-quantity btn-danger btn-decrease" onclick="changeQuantity('${cartItem.id}', 'decrease')">-</button>        
        </td>
        <td><button id="cart-delete" class="btn btn-danger" onclick="deleteProduct('${cartItem.id}')">Remove</button></td>
      </tr>
    `
  }
  
  contentTotal += `
    <p style="font-weight: bold;">Total: <span id="cart_total">${total}</span></p>
    <button class="checkout-button btn btn-success" onclick="checkOutCart()">Checkout</button>
  `
  getEle("tbodyCart").innerHTML = contentItem;
  getEle("cart-summary").innerHTML = contentTotal;
}

// remove sản phẩm
function deleteProduct(id) {
  const index = cart.list.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.list.splice(index, 1); 
    renderCart(); 
    setLocalStorage();
  }
}

// tăng giảm sản phẩm
function changeQuantity(id, action) {
  const product = cart.list.find((item) => item.id === id);

  if (product) {
    if (action === 'increase') {
      product.quantity += 1;
    } else if (action === 'decrease') {
      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        deleteProduct(id);
      }
    }
    renderCart();
    setLocalStorage();
  }
}

// checkout sản phẩm
function checkOutCart() {
  cart.list = [];
  renderCart();
  setLocalStorage();
}

// on off giỏ hàng
const cartBtnOff = document.querySelector(".fa-x");
cartBtnOff.addEventListener("click", function(){
  document.querySelector(".cart").style.right = "-100%";
});

const cartBtnOn = document.querySelector(".btn_clickMe");
cartBtnOn.addEventListener("click", function(){
  document.querySelector(".cart").style.right = "0";
});

// set local storage
function setLocalStorage() {
  var dataString = JSON.stringify(cart.list);
  localStorage.setItem("CART", dataString);
}

// get local storage
function getLocalStorage() {
  if (localStorage.getItem("CART")) {
    var dataString = localStorage.getItem("CART");
    var dataJson = JSON.parse(dataString);
    cart.list = dataJson;
    renderCart(cart.list);
  }
}