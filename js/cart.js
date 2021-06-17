
// 
window.onload = function() {
    loadProductFromCart();
    setCartNumber();
};

// array name // empty array
var products = [];


// what? to load products data from cart 
function loadProductFromCart() {
// 1- get information from local storage
var productsInCart = localStorage.getItem('cart');

// 2- check if  productsInCart  = null or not
if(productsInCart == null ){
  // Show (No Data inside the card ) // later   
}

else{ // There ara data in productsInCart = array 

    products =JSON.parse(productsInCart) ;


// create HTML Code with products data ...
createCardElements();

//What?  To Calculate The Overall Total Price 
calculateTotalPrice();
}

}// end 




// What? design our html code  
function createCardElements() {
 
    //How
// 1-  document.createElement("tr")
//2- Give Class to the element
//3- innerHTML = "my HTML code"


    const element = (product) => {

        // create table row
        const tr = document.createElement('tr');
        
        // create product details img - name - description. element
        const th = document.createElement('th');
        th.scope = 'row';
        th.innerHTML = `
        <div class="p-2">
            <img src="${product.imageUrl}" alt="" width="70" class="img-fluid rounded shadow-sm">
            <div class="ml-3 d-inline-block align-middle">
            <h5 class="mb-0">
                <a href="#" class="text-dark d-inline-block">${product.name}</a>
            </h5>
            <span class="text-muted font-weight-normal font-italic">${product.description}</span>
            </div>
        </div>
        `;

        // create price element
        const price = document.createElement('td');
        price.className = 'align-middle';
        price.innerHTML = `<strong>$${product.price}</strong>`;

        // create quantity element 
        const quantity = document.createElement('td');
        quantity.className = 'align-middle';
        
        const quantityForm = document.createElement('form');
        quantityForm.className = 'quantity d-flex align-items-center';
        const createButton = (type, innerHTML, onclick) => {
            const button = document.createElement('div');
            button.innerHTML = innerHTML;
            button.className = `value-button ${type}`;
            button.id = type;
            button.style = `
                z-index: 2;
                position: relative;
            `;
            button.onclick = onclick;
            button.value = `${type.charAt(0).toUpperCase() + type.slice(1)} Value`;
            return button;
        }
        const decreaseButton = createButton('decrease', '-', () => {
            quantityInput.valueAsNumber--;
            product.quantity = quantityInput.valueAsNumber;
            totalPrice.innerHTML = `${+product.price * +product.quantity}$`;
            calculateTotalPrice();
        });
        
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.className = 'quantity';
        quantityInput.id = `quantity${product._id}`;
        quantityInput.name = `quantity${product._id}`;
        quantityInput.valueAsNumber = product.quantity;
        const increaseButton = createButton('increase', '+', () => {
            quantityInput.valueAsNumber++;
            product.quantity = quantityInput.valueAsNumber;
            totalPrice.innerHTML = `${+product.price * +product.quantity}$`;
            calculateTotalPrice();
        });
      
        quantityForm.appendChild(decreaseButton);
        quantityForm.appendChild(quantityInput);
        quantityForm.appendChild(increaseButton);
        
        quantity.appendChild(quantityForm);

        // create total price element
        const totalPrice = document.createElement('td');
        totalPrice.className = 'align-middle';
        totalPrice.id = `t${+product._id}`;
        totalPrice.innerHTML = `${+product.price * +product.quantity}$`;

        // create delete element
        const options = document.createElement('td');
        options.className = 'align-middle text-center';
        const removeOption = document.createElement('a');
        removeOption.className = 'text-danger';
        removeOption.href = '#';
        removeOption.innerHTML = '<i class="bi bi-trash"></i>';
        removeOption.onclick = () => { // when click to remove function
            //1- remove item from array
            products.splice(products.indexOf(product), 1);

             //2- remove item from html
            document.getElementById('products').removeChild(tr);

            //3- set cart information in local storage
            localStorage.setItem('cart', JSON.stringify(products));

             //4- calculateTotalPrice
            calculateTotalPrice();

            //5-  change the number of cart in the header
            setCartNumber();
        }
        options.appendChild(removeOption);


        tr.appendChild(th);
        tr.appendChild(price);
        tr.appendChild(quantity);
        tr.appendChild(totalPrice);
        tr.appendChild(options);


        return tr;
    }

    const productsElement = document.getElementById('products');
    productsElement.innerHTML = '';

    for (const product of products) {
        productsElement.appendChild(element(product));
    }
}


// 
function calculateTotalPrice() {

    //How 
    // 1- document.getElementById
    const totalPriceElement = document.getElementById('totalPrice');

    //2- Calculate the total price = (product 1 price * quantity) + (product 2 price * quantity 2) .. etc

    const totalPrice = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    //3-element. innerHTML = " My Code"
    totalPriceElement.innerHTML = `${totalPrice}`;
}

function checkout() {
    localStorage.setItem('cart', JSON.stringify(products));
    window.location.href = '/confirmation.html';
}


function addToCart(product){
    // debugger
    let productsList =[];
    var productsInCart = localStorage.getItem('cart');
        product["quantity"] = document.getElementById("inputQuantity").value;

        console.log(product);
    if(productsInCart == null || productsInCart == undefined ){
        productsList.push(product);
        localStorage.setItem('cart',JSON.stringify(productsList) );
        document.getElementById('cartQuantity').innerText = 1;
        console.log("product addedd to the cart")
    }else{
        // debugger
        var products = JSON.parse(productsInCart);
           

        var productExsits = products.findIndex( a=>a._id == product._id );
        if(productExsits < 0){ // == -1 if not
            products.push(product);
            localStorage.setItem('cart',JSON.stringify(product) );
            document.getElementById('cartQuantity').innerText = products.length;
        }else{
            //already here in the list - do not add again
        }

    }

}


function setCartNumber(){
    var productsList = localStorage.getItem('cart');
    if(productsList == null  ){
        document.getElementById('cartQuantity').innerText = 0; 
    }
    else{
        productsList = JSON.parse(productsList);
        document.getElementById('cartQuantity').innerText = productsList.length; 
    }
       
    }

