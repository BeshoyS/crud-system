// Golbal Variables
// inputs
var nameInput = document.getElementById("productName");
var categoryInput = document.getElementById("productCategory");
var priceInput = document.getElementById("productPrice");
var descInput = document.getElementById("productDesc");
var searchInput = document.getElementById("searchInput");
var mainIndex;

//Btns
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

//The "tbody"
var tbody = document.getElementById("tbody");

//get the localStorage
if (localStorage.getItem("allProducts") == null) {
  // if no localStorge found
  //Array of singleProduct - EMPTY
  var productsList = [];
} else {
  var productsList = JSON.parse(localStorage.getItem("allProducts"));
}

//Display the list if there are old products add before from the LocalStorge or the server
displayProduct();

// Add
function addProduct() {
  var singlProduct = {
    productName: nameInput.value,
    productCategory: categoryInput.value,
    productPrice: priceInput.value,
    productDesc: descInput.value,
  };

  productsList.push(singlProduct);
  localStorage.setItem("allProducts", JSON.stringify(productsList));
  displayProduct();
  clearForm();
}

//Clear
function clearForm() {
  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  descInput.value = "";
}

//Display
function displayProduct() {
  var str = "";

  for (var i = 0; i < productsList.length; i++) {
    str += `<tr>
        <td>${i}</td>
        <td>${productsList[i].productName}</td>
        <td>${productsList[i].productCategory}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productDesc}</td>
        <td><button class="btn btn-transparent" onclick = "deleteRow(${i});"><i class="far fa-trash-alt red"></i></button></td>
        <td><button id="update" class="btn btn-transparent" onclick = "retrieveData(${i});"><i class="fas fa-edit yellow"></i></button></td>
      </tr>`;
  }
  tbody.innerHTML = str;
}

//Search
function search() {
  var str = "";
  for (var i = 0; i < productsList.length; i++) {
    if (
      productsList[i].productName
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      str += `<tr>
            <td>${i}</td>
            <td>${productsList[i].productName.toLowerCase().replace(searchInput.value,`<span class="highlight">${searchInput.value}</span>`)}</td>
            <td>${productsList[i].productCategory}</td>
            <td>${productsList[i].productPrice}</td>
            <td>${productsList[i].productDesc}</td>
            <td><button class="btn btn-transparent" onclick = "deleteRow(${i});"><i class="far fa-trash-alt red"></i></button></td>
            <td><button id="update" class="btn btn-transparent" onclick = "retrieveData(${i});"><i class="fas fa-edit yellow"></i></button></td>
          </tr>`;
    }
    tbody.innerHTML = str;
  }
}

//Delete
function deleteRow(index) {
  productsList.splice(index, 1);
  localStorage.setItem("allProducts", JSON.stringify(productsList));
  displayProduct();
}

//Update
function retrieveData(index) {
  nameInput.value = productsList[index].productName;
  categoryInput.value = productsList[index].productCategory;
  priceInput.value = productsList[index].productPrice;
  descInput.value = productsList[index].productDesc;
  mainIndex = index;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateData() {
  productsList[mainIndex].productName = nameInput.value;
  productsList[mainIndex].productCategory = categoryInput.value;
  productsList[mainIndex].productPrice = priceInput.value;
  productsList[mainIndex].productDesc = descInput.value;
  localStorage.setItem("allProducts", JSON.stringify(productsList));
  displayProduct();
  clearForm();
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}
