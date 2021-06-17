window.onload = function() {
    setCartNumber();
    loadProductFromCart();
    const thisForm = document.getElementById('myForm');
    thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(thisForm).entries();
    const body = JSON.stringify({'contact': Object.fromEntries(formData), 'products': products.map(p => p._id)});
    // console.log(body);
    submit(body);
});
};

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

function submit(body) {
console.log(body);


    const xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/api/teddies/order', true);

    xhr.setRequestHeader('Content-type', 'application/json');

 
    xhr.onload = function () {
        console.log(this.status)
        if (this.status === 201) { 
            datafromServer = JSON.parse(this.responseText);
            console.log(datafromServer);
            console.log("Success");
            document.getElementById('alertSuccess').innerText=
            "Your order is confirmed successfully- orderId= " +datafromServer.orderId;

            document.getElementById('alertSuccess').classList.remove('d-none');
        }
        else {
            console.log("File not found");
        }
    }
    xhr.send(body);
}

let products = [];


function loadProductFromCart() {
    var productsInCart = localStorage.getItem('cart');
    if(productsInCart == null || productsInCart == undefined ){
    }
    else{
         products = JSON.parse(productsInCart);
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
            <h6 class="mb-0">
                <a href="#" class="text-dark d-inline-block">${product.name}</a>
            </h6>
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


        
        const quantityInput = document.createElement('span');

        quantityInput.innerHTML = product.quantity;

      
        quantityForm.appendChild(quantityInput);
        
        quantity.appendChild(quantityForm);

     
        const totalPrice = document.createElement('td');
        totalPrice.className = 'align-middle';
        totalPrice.id = `t${+product._id}`;
        totalPrice.innerHTML = `${+product.price * +product.quantity}$`;

       

        tr.appendChild(th);
        tr.appendChild(price);
        tr.appendChild(quantity);
        tr.appendChild(totalPrice);


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
