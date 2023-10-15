var api = new CallApi();

function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  var promise = api.fectchData();

  promise
    .then(function (result) {
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();

function renderUI(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
    <tr>
    <td>${i + 1}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>
    <img width="50"  src="${product.img}" />
    </td>
    <td>${product.desc}</td>
    <td>${product.screen}, ${product.backCamera}  sau và camera trước ${
      product.frontCamera
    }</td>
    <td style="
    display: flex;
    justify-content: space-between;
">
      <button class="btn btn-info" data-toggle="modal" data-target="#myModal"  onclick="editProduct(${
        product.id
      })">
      Edit</button>
      <button class="btn btn-danger" onclick="deleteProduct(${
        product.id
      })">Delete</button>
    </td>
</tr>
`;
  }

  getEle("tblDanhSachSP").innerHTML = content;
}

/**
 * edit
 */
function editProduct(id) {
  //sửa lại tiêu đề cho model
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";

  //tại nút "Add"=>gna81 vào footer củ model
  var btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  //lấy thông tin chi tiết của  product dựa vào id
  var promise = api.getProductById(id);

  promise
    .then(function (result) {
      var product = result.data;
      //show date ra ngoài cá thẻ input
      getEle("nameProduct").value = product.name;
      getEle("price").value = product.price;
      getEle("img").value = product.img;
      getEle("desc").value = product.desc;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * cập nhật
 *  */
function updateProduct(id) {
  //lấy thông tin từ user nhập liệu
  var name = getEle("nameProduct").value;
  var price = getEle("price").value;
  var img = getEle("img").value;
  var desc = getEle("desc").value;

  //tạo đối tượng product từ lớp đối tượng Product
  var product = new Product(id, name, price, img, desc);
  api
    .updateProductApi(product)
    .then(function () {
      //close modal
      document.getElementsByClassName("close")[0].click();
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Xóa
 *  */
function deleteProduct(id) {
  var promise = api.deleteProductById(id);
  promise
    .then(function (result) {
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSP").onclick = function () {
  //sửa lại tiêu đề cho model
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";

  //tại nút "Add"=>gắn vào footer của model
  var btnAdd = `<button class="btn btn-success" onclick="addProduct()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};

function addProduct() {
  //lấy thông tin từ user nhập liệu
  var name = getEle("nameProduct").value;
  var price = getEle("price").value;
  var img = getEle("img").value;
  var desc = getEle("desc").value;
  //tạo đối tượng product từ lớp đối tượng Product
  var product = new Product("", name, price, img, desc);

  var promise = api.addProductApi(product);

  promise
    .then(function (result) {
      //
      alert(`Success Add ` + result.data.tenSP);
      //close modal
      document.getElementsByClassName("close")[0].click();
      //thêm thành công => render ra giao diện
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}