
// 
window.onload = function() {
    loadProductFromCart();
    setCartNumber();
};

var products = [];



function loadProductFromCart() {

var productsInCart = localStorage.getItem('cart');


if(productsInCart == null ){

}

else{ 

    products =JSON.parse(productsInCart) ;

createCardElements();


calculateTotalPrice();
}

}




function createCardElements() {
 
 


    const element = (product) => {

      
        const tr = document.createElement('tr');
       
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
           <br/> <span> Color:<b> ${product.colorValue} </b> </span>
            </div>
        </div>
        `;

      
        const price = document.createElement('td');
        price.className = 'align-middle';
        price.innerHTML = `<strong>$${product.price}</strong>`;

    
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

      
        const totalPrice = document.createElement('td');
        totalPrice.className = 'align-middle';
        totalPrice.id = `t${+product._id}`;
        totalPrice.innerHTML = `${+product.price * +product.quantity}$`;

      
        const options = document.createElement('td');
        options.className = 'align-middle text-center';
        const removeOption = document.createElement('a');
        removeOption.className = 'text-danger';
        removeOption.href = '#';
        removeOption.innerHTML = '<i class="bi bi-trash"></i>';
        removeOption.onclick = () => { 
          
            products.splice(products.indexOf(product), 1);

            
            document.getElementById('products').removeChild(tr);

            localStorage.setItem('cart', JSON.stringify(products));

            calculateTotalPrice();

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



function calculateTotalPrice() {

   
    const totalPriceElement = document.getElementById('totalPrice');

    
    const totalPrice = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    totalPriceElement.innerHTML = `${totalPrice}`;
}

function checkout() {
    localStorage.setItem('cart', JSON.stringify(products));
    window.location.href = '/confirmation.html';
}


function addToCart(product){
   
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
     
        var products = JSON.parse(productsInCart);
           

        var productExsits = products.findIndex( a=>a._id == product._id );
        if(productExsits < 0){ 
            products.push(product);
            localStorage.setItem('cart',JSON.stringify(product) );
            document.getElementById('cartQuantity').innerText = products.length;
        }else{
          
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

