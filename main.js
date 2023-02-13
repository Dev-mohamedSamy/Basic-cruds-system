//declare elements

let prodcutTitle = document.querySelector(".product-title");
let productPrice = document.querySelector(".product-price");
let productTaxes = document.querySelector(".product-taxes");
let productAds = document.querySelector(".ads");
let productDiscount = document.querySelector(".product-discount");
let productTotalPrice = document.querySelector(".product-total-price");
let productCount = document.querySelector(".product-count");
let productCategory = document.querySelector(".product-category");
let productSubmitBtn = document.querySelector(".product-submit");
let searchInput = document.querySelector(".product-search-input");

let searchTitleBtn = document.querySelector(".search-btn-title");

let searchCategoryBtn = document.querySelector(".search-btn-category");
let tbody = document.getElementById("tbody");
let deleteAllBtn = document.querySelector(".btn-delete-all");
let tableIcon = document.querySelector(".table-icon");
let cardIcon = document.querySelector(".card-icon");
let productsContainer = document.querySelector(".products-container");
let cardsContainer = document.querySelector(".cards-container");
let tableContainer = document.querySelector(".table-container");
 
let createMood = "create";

let displayMood = "table" ;





let ii;

// get total
productPrice.onkeyup= ()=>{
     getTotal();
}
productTaxes.onkeyup = () => {
  getTotal();
};
productAds.onkeyup = () => {
  getTotal();
};

productDiscount.onkeyup = () => {
  getTotal();
};

function getTotal() {
    if (productPrice.value != '') {
        let result = (+productPrice.value + +productTaxes.value + +productAds.value) - +productDiscount.value;
        productTotalPrice.innerHTML = result;
        
        productTotalPrice.style.background = "#050";
    } else {
        productTotalPrice.innerHTML = ""; 
        productTotalPrice.style.background = "red";
    }
}

// create product

let products;
if (localStorage.products != null ) {
  products = JSON.parse(localStorage.getItem("products"));
} else {
  products = [];
}

productSubmitBtn.onclick = function () {


    let newProduct = {
        title: prodcutTitle.value.toLowerCase(),
        price: +productPrice.value,
        taxes: +productTaxes.value,
        ads: +productAds.value,
        discount: +productDiscount.value,
        totalPrice: +productTotalPrice.innerHTML,
        count: productCount.value,
        category: productCategory.value.toLowerCase(),
    };


    if (
      prodcutTitle.value != "" &&
      productPrice.value != "" &&
      productCategory.value != ""
    ) {
      if (createMood === "create") {
        if (newProduct.count > 1   ) {
          for (let i = 0; i < newProduct.count; i++) {
            products.push(newProduct);
          }
        } else {
          products.push(newProduct);
        }
      } else {
        products[ii] = newProduct;
        createMood = "create";
        productCount.style.display = "block";
        productSubmitBtn.innerHTML = "create";
      }
      showProdcuts(products,displayMood);
        clearInputs();
        getTotal();
    }
    // save data in local storage
    localStorage.setItem("products", JSON.stringify(products));
}




// clear inputs
function clearInputs() {
    prodcutTitle.value = "";
    productPrice.value = "";
    productTaxes.value = "";
    productAds.value = "";
    productDiscount.value = "";
    productTotalPrice.innerHTML = "";
    productCount.value  = "";
    productCategory.value  = "";
}

// read



// testing zone




// show  Prodcuts in table of in cards
function showProdcuts(array, displayMood) {
  getTotal();
  

  if (displayMood == "table") {
    
    
    let productRow = '';
    for (let i = 0; i < array.length; i++) {
      productRow += `
          <tr>
                        <td>${i + 1}</td>
                        <td>${array[i].title}</td>
                        <td>${array[i].price}</td>
                        <td>${array[i].taxes}</td>
                        <td>${array[i].ads}</td>
                        <td>${array[i].discount}</td>
                        <td>${array[i].totalPrice}</td>
                        <td>${array[i].category}</td>
                        <td>
                            <button  onclick= "updateProdcut(${i})" class="btn btn-update" >update</button>
                        </td>
                        <td>   
                            <button onclick= "deleteProdcut(${i})" class="btn btn-delete">delete</button>
                            
                        </td>
        </tr>
        `;


        
        
        
    }
    tbody.innerHTML = productRow;
  } 
  else if(displayMood =="cards"){
    let prodcutCard='';
    for (let i = 0; i < array.length; i++) {
      prodcutCard += `
           <div class="product">
            <p>${i+1}</p>
            <h4>${array[i].title}</h4>
            <p>price is ${array[i].price}</p>
            <p>taxes: ${array[i].taxes}</p>
            <p>ads: ${array[i].ads}</p>
            <p>discount: ${array[i].discount}</p>
            <p>totlal price: ${array[i].totalPrice}</p>
            <p>category price: ${array[i].category}</p>
            <button  onclick= "updateProdcut(${i})" class="btn btn-update" >update</button>

            <button onclick= "deleteProdcut(${i})" class="btn btn-delete">delete</button>

          </div>
          `;
    }

    cardsContainer.innerHTML = prodcutCard;
  }


    deleteAllBtn.innerText = `delete all (${products.length})`;
    if (products.length > 0) {
        deleteAllBtn.style.display = "block"

        deleteAllBtn.onclick = () => {
          deleteAllProdcuts();
        };
    } else {
        deleteAllBtn.style.display = "none"
        
    }
}


window.onload = () => {
  
  showProdcuts(products,displayMood)
}



// swicher



tableIcon.onclick = () => {
  displayMood= "table"
  cardsContainer.style.display = "none";
  tableContainer.style.display = "block";
  showProdcuts(products, displayMood);

};




cardIcon.onclick = () => {
  displayMood = "cards"
  
  tableContainer.style.display = "none";
  cardsContainer.style.display = "grid";
  showProdcuts(products, displayMood);
};











// delete

function deleteProdcut(i) {
  products.splice(i, 1);
  localStorage.products = JSON.stringify(products);
  showProdcuts(products, displayMood);
  // if (i > 0) {
  // }
    // } else if (i == 0) {
    //   deleteAllProdcuts();
    // }
}

// deleteAll 
function deleteAllProdcuts() {
    products = [];
    localStorage.removeItem("products");
    showProdcuts(products,displayMood);
}




//update

function updateProdcut(i) {
       prodcutTitle.value = products[i].title;
       productPrice.value = products[i].price;
       productTaxes.value = products[i].taxes;
       productAds.value = products[i].ads;
    productDiscount.value = products[i].discount;
    getTotal();
    productTotalPrice.innerHTML = products[i].totalPrice;
    productCount.style.display= "none";
    productCategory.value = products[i].category;
    productSubmitBtn.innerHTML = "update";
    createMood = "update";
    ii = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}


let searchMode = "title";
function getSearch(id) {
  if (id == "search-btn-title") {
    searchMode = "title";
    searchInput.value="";
    
  } else {
    
    searchMode = "category";
    searchInput.value="";
  }
  searchInput.focus();
  searchInput.placeholder = `search by ${searchMode}`;
  showProdcuts(products)
}





function searchProducts(value) {
  let productRow = "";
  let prodcutCard = '';
  for (let i = 0; i < products.length; i++) {
    if (searchMode == "title") {
      if (products[i].title.includes(value)) {
        
        if (displayMood == "table") {
          productRow += `
          <tr>
                        <td>${i + 1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].totalPrice}</td>
                        <td>${products[i].category}</td>
                        <td>
                            <button  onclick= "updateProdcut(${i})" class="btn btn-update" >update</button>
                        </td>
                        <td>   
                            <button onclick= "deleteProdcut(${i})" class="btn btn-delete">delete</button>
                            
                        </td>
        </tr>
        `;
          tbody.innerHTML = productRow;

        } else {
          prodcutCard += `
           <div class="product">
            <p>${i + 1}</p>
            <h4>${products[i].title}</h4>
            <p>price is ${products[i].price}</p>
            <p>taxes: ${products[i].taxes}</p>
            <p>ads: ${products[i].ads}</p>
            <p>discount: ${products[i].discount}</p>
            <p>totlal price: ${products[i].totalPrice}</p>
            <p>category price: ${products[i].category}</p>
            <button  onclick= "updateProdcut(${i})" class="btn btn-update" >update</button>

            <button onclick= "deleteProdcut(${i})" class="btn btn-delete">delete</button>

          </div>
          `
          cardsContainer.innerHTML = prodcutCard;
        }
        

      }
      
    }
    else {
      let productRow = "";
      if (products[i].category.includes(value)) {
        if (displayMood == "table") {
          productRow += `
          <tr>
                        <td>${i + 1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].totalPrice}</td>
                        <td>${products[i].category}</td>
                        <td>
                            <button  onclick= "updateProdcut(${i})" class="btn btn-update" >update</button>
                        </td>
                        <td>   
                            <button onclick= "deleteProdcut(${i})" class="btn btn-delete">delete</button>
                            
                        </td>
        </tr>
        `;
        tbody.innerHTML = productRow;
        }
        
        else {
          prodcutCard += `
           <div class="product">
            <p>${i + 1}</p>
            <h4>${products[i].title}</h4>
            <p>price is ${products[i].price}</p>
            <p>taxes: ${products[i].taxes}</p>
            <p>ads: ${products[i].ads}</p>
            <p>discount: ${products[i].discount}</p>
            <p>totlal price: ${products[i].totalPrice}</p>
            <p>category price: ${products[i].category}</p>
            <button  onclick= "updateProdcut(${i})" class="btn btn-update" >update</button>

            <button onclick= "deleteProdcut(${i})" class="btn btn-delete">delete</button>

          </div>
          `;
                    cardsContainer.innerHTML = prodcutCard;

        }
      }
  
         
    }

      
  }

  }







