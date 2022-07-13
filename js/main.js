// Cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open Cart
cartIcon.onclick = () => {
    cart.classList.add('active');
}

// Close cart
closeCart.onclick = () => {
    cart.classList.remove('active');
}

// Cart working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Making function
function ready(){
    // Remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', (e) => {
            var buttonClicked = e.target
            buttonClicked.parentElement.remove()
            updatetotal();
        })    
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', (e) => {
            let input = e.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1
            }
            updatetotal();
        })
    }

    // Add to cart
    let addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++) {
        let button = addCart[i]
        button.addEventListener('click', (e) => {
            let button = e.target
            let shopProducts = button.parentElement
            let title = shopProducts.getElementsByClassName('product-title')[0].innerText
            let price = shopProducts.getElementsByClassName('price')[0].innerText
            let productImg = shopProducts.getElementsByClassName('product-img')[0].src
            addProductToCart(title, price, productImg);
            updatetotal();
        })
    }

    // Buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', () => {
        alert('Your Order is placed')
        let cartContent = document.getElementsByClassName('cart-content')[0]
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild)
        }
        updatetotal()
    })

}

// Add Product To Cart
const addProductToCart = (title, price, productImg) => {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0]
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Item already added to cart");
            return;
        }
    }
    let cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>

                        <!-- Remove cart -->
                        <i class="bx bxs-trash-alt cart-remove"></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', (e) => {
            var buttonClicked = e.target
            buttonClicked.parentElement.remove()
            updatetotal();
        });
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', (e) => {
            let input = e.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1
            }
            updatetotal();
        });
}

// Update Total
const updatetotal = () => {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = document.getElementsByClassName('cart-box');
    let total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("KES", ""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // If Price contain some cents value
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = 'KES' + total;
}