        //making add to cart

        //cart working JS

        if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", ready);
        }else{
        ready();
        }

        //making function

        function ready() {
        //remove item from cart
        var removeCartButtons = document.getElementsByClassName("cart-remove");
        for(var i = 0; i<removeCartButtons.length; i++){
            var button = removeCartButtons[i];
            button.addEventListener("click", removeCartItem);
        }

        // quantity change

        var quantityInputs = document.getElementsByClassName("cart-quantity");
        for(var i = 0; (i<quantityInputs.length); i++){
            var input = quantityInputs[i];
            input.addEventListener("change", quantityChanged);
        }

        //add to cart

        var addCart = document.getElementsByClassName("add-cart");
        for (var i = 0; i < addCart.length; i++){
            var button = addCart[i];
            button.addEventListener("click", addCartClicked);
        }
        loadCartItems();
        updateCartItem()
        }

        //remove cart item
        function removeCartItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        updateTotal();
        saveCartItems();
        updateCartItem()
        }

        //quantity change
        function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value<=0){
            input.value = 1;  
        }
        updateTotal();
        saveCartItems();
        updateCartItem()
        }

        //add cart function
        function addCartClicked(event) {
        var button = event.target;
        var shopProducts = button.parentElement;
        var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
        var price = shopProducts.getElementsByClassName("price")[0].innerText;
        var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
        addProductToCart(title,price,productImg);
        updateTotal();
        saveCartItems();
        updateCartItem()
        }

        function addProductToCart(title,price,productImg) {
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        var cartItems = document.getElementsByClassName("cart-content")[0];
        var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
        for (var i = 0; i < cartItemNames.length; i++){
            if (cartItemNames[i].innerText == title){
            alert('You have already added this item to cart');
            return;
            }
        }
        var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img" />
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input 
            type="number"
            name=""
            id=""
            value="1"
            class="cart-quantity"
            />
        </div>
        <i class="bx bx-trash-alt cart-remove"></i>`;
        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName('cart-remove')[0]
        .addEventListener("click", removeCartItem);
        cartShopBox.getElementsByClassName('cart-quantity')[0]
        .addEventListener("change", quantityChanged);
        saveCartItems();
        updateCartItem()
        }

        //update total
        function updateTotal() {
        var cartContent = document.getElementsByClassName("cart-content")[0];
        var cartBoxes = cartContent.getElementsByClassName("cart-box");
        var total = 0;
        for (var i = 0; i < cartBoxes.length; i++ ){
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName("cart-price")[0];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            var price = parseFloat(priceElement.innerText.replace("$", ""));
            var quantity = quantityElement.value;
            total += price * quantity;
        }
        total = Math.round(total*100)/100;
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;

        //save total to local storage
        localStorage.setItem('cartTotal', total);
        }

        //keep item in cart when page refresh with local storage

        function saveCartItems() {
        var cartContent = document.getElementsByClassName("cart-content")[0];
        var cartBoxes = cartContent.getElementsByClassName("cart-box");
        var cartItems = [];

        for (var i=0; i< cartBoxes.length; i++){
            var cartBox = cartBoxes[i];
            var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
            var priceElement = cartBox.getElementsByClassName('cart-price')[0];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

            var item = {
            title: titleElement.innerText,
            price: priceElement.innerHTML,
            quantity: quantityElement.value,
            productImg: productImg,
            };
            cartItems.push(item);
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }

        //load in cart
        function loadCartItems() {
        var cartItems = localStorage.getItem('cartItems');
        if (cartItems){
            cartItems = JSON.parse(cartItems);

            for (var i = 0; i < cartItems.length; i++){
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            quantityElement.value = item.quantity;
            }
        }
        var cartTotal = localStorage.getItem("cartToatal");
        if (cartTotal) {
            document.getElementsByClassName("total-price")[0].innerText = "$" + cartTotal;
        }
        updateCartItem()
        }

        //quantity in cart item
        function updateCartItem() {
        var cartBoxes = document.getElementsByClassName('cart-box');
        var quantity = 0;

        for (var i =0; i < cartBoxes.length; i++){
            var cartBox = cartBoxes[i];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            quantity += parseInt(quantityElement.value);
        }
        var cartIcon = document.querySelector("#cart-icon");
        cartIcon.setAttribute("data-quantity", quantity);
        }

        //cart 0pen close
        let cartIcon = document.querySelector("#cart-icon");
        let cart = document.querySelector(".cart");
        let closeCart = document.querySelector("#close-cart");

        //open cart

        cartIcon.onclick = () => {
            cart.classList.add("active");
        };

        //closs cart

        closeCart.onclick = () => {
            cart.classList.remove("active");
        };

        function scrollToUp() {
            window.scrollTo(0,0);
          }
  
        //scroll to pre workout
        function scrollToPreWorkout() {
        window.scrollTo(700,1950);
        }
  
        //scroll to Whey
        function scrollToWhey() {
        window.scrollTo(700,2800);
        }
  
        //payment option------------------------------------------------------
        const payBtn = document.querySelector(".btn-buy");
  
        payBtn.addEventListener("click", () => {
        fetch("/store/stripe-checkout", {
            method: "post",
            headers: new Headers({ "Content-Type": "application/Json" }),
            body: JSON.stringify({
            items: JSON.parse(localStorage.getItem("cartItems")),
            }),
        })
        .then((res) => res.json())
        .then((url) => {
            location.href = url;
        })
        .catch((err) => console.log(err));
        })