const navEmail = document.querySelector(".navbar-email");
const desktopMenu = document.querySelector(".desktop-menu");

const navbarShoppingCart = document.querySelector(".navbar-shopping-cart");
const shoppingCartContainer = document.querySelector("#shoppingCartContainer");

const menuHamIcon = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");

const productDetail = document.querySelector("#productDetail");
const productDetailClose = document.querySelector(".product-detail-close");
productDetailClose.addEventListener("click", toggleProductDetail);

const myOrderContent = document.querySelector(".my-order-content");

const countCart = document.querySelector("#countCart");

function countProducts() {

    if (localStorage.getItem("productsCart") == null) {
        localStorage.setItem("productsCart", JSON.stringify([]));
    }

    const arrayProducts = JSON.parse(localStorage.getItem("productsCart"));
    countCart.innerText = arrayProducts.length;

}

function addProductToCart(product) {

    if (localStorage.getItem("productsCart").length == 0) {
        localStorage.setItem("productsCart", JSON.stringify([product]));
        location.reload();
        return;
    }

    let arrayProducts = JSON.parse(localStorage.getItem("productsCart"));
    arrayProducts.push(product);
    localStorage.setItem("productsCart", JSON.stringify(arrayProducts));
    location.reload();
}

navEmail.addEventListener("click", () => {
    shoppingCartContainer.classList.add("inactive");
    productDetail.classList.add("inactive");
    desktopMenu.classList.toggle("inactive");
});

menuHamIcon.addEventListener("click", () => {
    shoppingCartContainer.classList.add("inactive");
    productDetail.classList.add("inactive");
    mobileMenu.classList.toggle("inactive");
});

navbarShoppingCart.addEventListener("click", () => {
    mobileMenu.classList.add("inactive");
    desktopMenu.classList.add("inactive");
    productDetail.classList.add("inactive");
    shoppingCartContainer.classList.toggle("inactive");
});

function toggleProductDetail() {
    desktopMenu.classList.add("inactive");
    shoppingCartContainer.classList.add("inactive");
    mobileMenu.classList.add("inactive");
    productDetail.classList.toggle("inactive");
}

function renderProducts() {

    const cardsContainer = document.querySelector(".cards-container");

    for (const product of arrayProducts) {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const img = document.createElement("img");
        img.setAttribute("src", product.image);
        img.setAttribute("class", "imgProduct");
        img.addEventListener("click", toggleProductDetail);
        productCard.append(img);

        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        const priceAndName = document.createElement("div");
        const price = document.createElement("p");
        price.append(`$${product.price}`);
        const name = document.createElement("p");
        name.append(product.name);
        priceAndName.append(price);
        priceAndName.append(name);
        productInfo.append(priceAndName);

        const figure = document.createElement("figure");
        const imgCart = document.createElement("img");
        imgCart.setAttribute("src", "./icons/bt_add_to_cart.svg");
        imgCart.addEventListener("click", () => addProductToCart(product));
        figure.append(imgCart);
        productInfo.append(figure);

        productCard.append(productInfo);
        cardsContainer.append(productCard);
    }

}

function recalculateTotal() {

    const parrafoPriceTotal = document.querySelector(".totalPriceAllProducts");
    const arrayProducts = JSON.parse(localStorage.getItem("productsCart"));

    if (arrayProducts.length > 0) {
        
        let totalPriceAllProducts = 0;

        for (const object of arrayProducts) {
            
            totalPriceAllProducts += Number(object.price);

        }

        parrafoPriceTotal.innerText = `$${totalPriceAllProducts}`;

    } else {

        location.reload();

    }

}

function deleteProducts(shoppingCart, arrayProducts, object) {

    const index = arrayProducts.findIndex((item) => item.id == object.id);
    arrayProducts.splice(index, 1);
    localStorage.setItem("productsCart", JSON.stringify(arrayProducts));
    myOrderContent.removeChild(shoppingCart);
    countProducts();
    recalculateTotal();

}

function renderShoppingCart() {

    const arrayProducts = JSON.parse(localStorage.getItem("productsCart"));
    let totalPriceAllProducts = 0;

    if (arrayProducts != null && arrayProducts.length > 0) {

        for (const object of arrayProducts) {

            const shoppingCart = document.createElement("div");
            shoppingCart.classList.add("shopping-cart");

            const figure = document.createElement("figure");
            const imgProduct = document.createElement("img");
            imgProduct.setAttribute("src", object.image);
            figure.append(imgProduct);

            const nameProduct = document.createElement("p");
            nameProduct.innerText = object.name;

            const priceProduct = document.createElement("p");
            priceProduct.innerText = `$${object.price}`;

            shoppingCart.append(figure);
            shoppingCart.append(nameProduct);
            shoppingCart.append(priceProduct);
            const imgClose = document.createElement("img");
            imgClose.setAttribute("src", "./icons/icon_close.png");
            imgClose.setAttribute("alt", "close");

            imgClose.addEventListener("click", () => deleteProducts(shoppingCart, arrayProducts, object));

            shoppingCart.append(imgClose);

            myOrderContent.append(shoppingCart);

            totalPriceAllProducts += Number(object.price);

        }

    }

    const imgFlechita = document.createElement("img");
    imgFlechita.setAttribute("src", "./icons/flechita.svg");
    imgFlechita.setAttribute("alt", "arrow");
    imgFlechita.addEventListener("click", () => { shoppingCartContainer.classList.add("inactive") })

    const title = document.createElement("p");
    title.classList.add("title");
    title.innerText = "Mi carrito";

    if (totalPriceAllProducts > 0) {

        const divOrder = document.createElement("div");
        divOrder.classList.add("order");

        const parrafo = document.createElement("p");
        const spanTotal = document.createElement("span");
        spanTotal.innerText = "Total";
        parrafo.append(spanTotal);

        const parrafoPriceTotal = document.createElement("p");
        parrafoPriceTotal.classList.add("totalPriceAllProducts");
        parrafoPriceTotal.innerText = `$${totalPriceAllProducts}`;

        divOrder.append(parrafo);
        divOrder.append(parrafoPriceTotal);

        const buttonCheckout = document.createElement("button");
        buttonCheckout.classList.add("primary-button");
        buttonCheckout.innerText = "Checkout";

        myOrderContent.append(divOrder);
        myOrderContent.append(buttonCheckout);

    } else {

        title.innerText = "Su carrito está vacío";

    }

    const titleContainer = document.querySelector(".title-container");
    titleContainer.append(imgFlechita);
    titleContainer.append(title);

}

renderProducts();
renderShoppingCart();
countProducts();