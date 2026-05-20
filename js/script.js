// Toggle class active untuk hamburger menu start
const navbarNav = document.querySelector('.navbar-nav');
const hamburgerMenu = document.querySelector('#hamburger-menu');

document.querySelector('#hamburger-menu').onclick = (e) => {
    navbarNav.classList.toggle('active');
    e.preventDefault();
};

// Klik di luar sidebar untuk menghilangkan nav
document.addEventListener('click', function(e) {
    if(!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});


// Toggle class active untuk search form start
const searchForm = document.querySelector('.search-form');
const searchButton = document.querySelector('#search');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
}

// Klik di luar form untuk menghilangkan
document.addEventListener('click', function(e) {
    if(!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
});


// toggle class active untuk item cart Start
// Ketika shopping cart di klik
const shoppingCart = document.querySelector('.shopping-cart');
const shoppingButton = document.querySelector('#shopping-button');

document.querySelector('#shopping-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
}

// klik di luar shopping cart untuk menghilangkan
document.addEventListener('click', function(e) {
    if(!shoppingButton.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});


// toggle class active untuk detail product Start
const detailProduct = document.querySelector('.modal');
const detailButton = document.querySelector('#button-detail');
const closeButton = document.querySelector('#close-button');

detailButton.onclick = (e) => {
    detailProduct.classList.add('active');
    e.preventDefault()
}

closeButton.onclick = (e) => {
    detailProduct.classList.remove('active');
    e.preventDefault()
};



// CRUD product cart start
const addCartButtons = document.querySelectorAll('.add-cart');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

addCartButtons.forEach(button => {

    button.addEventListener('click', (e) => {
        e.preventDefault();

        const productCard = button.closest('.product-card');

        const id = productCard.dataset.id;
        const name = productCard.dataset.name;
        const price = productCard.dataset.price;
        const image = productCard.dataset.image;

        const existingItems = cart.find(item => item.id === id);

        if(existingItems) {
            existingItems.qty += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                qty: 1
            });
        }
        simpanCart();
        tampilCart();
    });
});

function tampilCart() {
    if(cart.length === 0) {
        shoppingCart.innerHTML = `
            <div class="empty-cart-container" style="text-align: center; padding: 30px 10px;">
                <p class="empty-cart" style="margin-bottom: 15px; color: #666;">Keranjang belanja Anda kosong</p>
                <button onclick="document.querySelector('.shopping-cart').classList.remove('active')" style="padding: 8px 15px; background: #3085d6; color: white; border: none; border-radius: 4px; cursor: pointer;">Mulai Belanja</button>
            </div>
        `;
        return;
    }

    let html = '';
    cart.forEach((item, index) => {
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-detail">
                    <h3>${item.name}</h3>
                    <p class="item-price">
                        Rp. ${item.price}
                        x ${item.qty}
                    </p>
                    <i class="fa-solid fa-trash icon remove-item" onClick="removeItem(${index})"></i>
                </div>
            </div>
        `;
    });
    shoppingCart.innerHTML = html;
}

function removeItem(index) {
    const namaItems = cart[index].name;
    Swal.fire({
        title: 'Apakah Anda yakin?',
        text: `Anda akan menghapus ${cart[index].name} dari keranjang!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            const item = cart[index];
            cart.splice(index, 1);

            Swal.fire(
                'Dihapus!',
                `${item.name} telah dihapus dari keranjang.`,
                'success'
            );
            simpanCart();
            tampilCart();
        } else {
                console.log('Penghapusan dibatalkan');
            }
    });
}


function simpanCart() {
    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );
}

tampilCart();