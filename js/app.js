let productTitle = document.getElementById("productTitle");
let productPrice = document.getElementById("productPrice");
let productTaxes = document.getElementById("productTaxes");
let productAds = document.getElementById("productAds");
let productDiscount = document.getElementById("productDiscount");
let totalPrice = document.getElementById("totalPrice");
let count = document.getElementById("count");
let productCategory = document.getElementById("productCategory");
let submit = document.getElementById("submit");

let state = "create";
let TempIdUpdate;
// get total 
function getTotal() {
    if(productPrice.value != ''){
        let result = (+productPrice.value + +productTaxes.value + +productAds.value) - +productDiscount.value;
        totalPrice.innerText = result;
        document.getElementById("totalSpanEl").style.backgroundColor = 'green';
    } else{
        totalPrice.innerText = '';
        document.getElementById("totalSpanEl").style.backgroundColor = '#111';
    }
}

// create product & save to localstorage
let productsList = [];
// if condition for data loss prevention when user refresh the brwser
if(localStorage.product != null) {
    productsList = JSON.parse(localStorage.product)
}
submit.onclick = function() {
    let newProduct = {
        title:productTitle.value.toLowerCase(),
        price:productPrice.value,
        taxes:productTaxes.value,
        ads:productAds.value,
        discount:productDiscount.value,
        total:totalPrice.innerText,
        count:count.value,
        category:productCategory.value.toLowerCase(),
    }

    if (state == "create") {
        if(newProduct.count > 1) {
            for(let i = 0; i < newProduct.count; i++) {
                productsList.push(newProduct);
            }
        } else {
            productsList.push(newProduct);
        }
    } else {
        productsList[TempIdUpdate] = newProduct;
        state = "create";
        submit.innerText = "create";
        count.style.display = "block";
    }
    
    localStorage.setItem('product', JSON.stringify(productsList))
    clearData()
    showProducts()
}

// clear input
function clearData() {
    productTitle.value = '';
    productPrice.value = '';
    productTaxes.value = '';
    productAds.value = '';
    productDiscount.value = '';
    totalPrice.innerText = '';
    count.value = '';
    productCategory.value = '';
}

// read data
function showProducts() {
    let tableBody = '';
    for(let i = 0; i < productsList.length; i++) {
        tableBody += `
                <tr>
                    <td>${i}</td>
                    <td>${productsList[i].title}</td>
                    <td>${productsList[i].price}</td>
                    <td>${productsList[i].taxes}</td>
                    <td>${productsList[i].ads}</td>
                    <td>${productsList[i].discount}</td>
                    <td>${productsList[i].total}</td>
                    <td>${productsList[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i})"><img src="assets/icons/edit.png" alt="edit-btn"></button></td>
                    <td><button id="delete" onclick="deleteProduct(${i})"><img src="assets/icons/delete.png" alt="delete-btn"></button></td>
                </tr>
            `;
    }
    document.getElementById("tableBody").innerHTML = tableBody;
    let deleteBtnDiv = document.getElementById("deleteAllDiv")
    if(productsList.length > 0) {
        deleteBtnDiv.innerHTML = `<button onclick="deleteAllProducts()">delete all products [${productsList.length}]</button>`;
    } else {
        deleteBtnDiv.innerHTML = "";
    }
}
showProducts()

// update
function updateProduct(productId) {
    productTitle.value = productsList[productId].title;
    productPrice.value = productsList[productId].price;
    productTaxes.value = productsList[productId].taxes;
    productAds.value = productsList[productId].ads;
    productDiscount.value = productsList[productId].discount;
    productCategory.value = productsList[productId].category;
    count.style.display = "none";
    getTotal();

    submit.innerText = "update";
    state = "update";
    TempIdUpdate = productId;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

// delete
function deleteProduct(productId) {
    productsList.splice(productId,1);
    localStorage.product = JSON.stringify(productsList);
    showProducts();
}

function deleteAllProducts() {
    localStorage.clear();
    productsList.splice(0);
    showProducts();
}

// search
let searchState = "title";
function detectSearchState(btnId) {
    let searchField = document.getElementById("search");
    if(btnId == "searchTitle") {
        searchState = "title";
    } else {
        searchState = "category";
    }
    searchField.placeholder = "search by title " + searchState;
    searchField.focus();
    searchField.value = "";
    showProducts();
}
function searchProduct(value) {
    let tableBody = "";
    if (searchState == "title") {
        for (let i = 0; i < productsList.length; i++) {
            if (productsList[i].title.includes(value.toLowerCase())) {
                tableBody += `
                    <tr>
                        <td>${i}</td>
                        <td>${productsList[i].title}</td>
                        <td>${productsList[i].price}</td>
                        <td>${productsList[i].taxes}</td>
                        <td>${productsList[i].ads}</td>
                        <td>${productsList[i].discount}</td>
                        <td>${productsList[i].total}</td>
                        <td>${productsList[i].category}</td>
                        <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                        <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                    </tr>
                `;               
            }
        }
    } else {
        for (let i = 0; i < productsList.length; i++) {
            if (productsList[i].category.includes(value.toLowerCase())) {
                tableBody += `
                    <tr>
                        <td>${i}</td>
                        <td>${productsList[i].title}</td>
                        <td>${productsList[i].price}</td>
                        <td>${productsList[i].taxes}</td>
                        <td>${productsList[i].ads}</td>
                        <td>${productsList[i].discount}</td>
                        <td>${productsList[i].total}</td>
                        <td>${productsList[i].category}</td>
                        <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                        <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                    </tr>
                `;               
            }
        }
    }
    document.getElementById("tableBody").innerHTML = tableBody;
}