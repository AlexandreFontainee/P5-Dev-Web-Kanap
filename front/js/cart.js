
let cart = JSON.parse(localStorage.getItem('cart'));
console.log('les canapés', cart);
const cartContainer = document.getElementById('cart__items');

// si le panier est vide :
if (cart === null || cart == 0) {
  const empty = `<p>Votre panier est vide</p>`;
  cartContainer.innerHTML = empty;
}
// si pas vide 
else {


  let affichage = "";

  // boucle forEach pour attribuer les différente values 
  cart.forEach((item) => {
    const { id, color, alt, name, quantity, image } = item;

    affichage += `
    
    <article class="cart__item" data-id="${id}" data-color="${color}">
    <div class="cart__item__img">
      <img src="${image}" alt="${alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${name}</h2>
        <p>${color}</p>
        <p> €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `

    document.getElementById('cart__items').innerHTML = affichage;



    fetch("http://localhost:3000/api/products/")
      .then(response => response.json())
      .then((response) => {
        

        cart.forEach((product) => {
          
          const data = response;
          let newId = product.id;
          let newColor = product.color;
          const searchTheSame = data.filter(obj => newId === obj._id && newColor === obj.colors );
          
          console.log(searchTheSame)
        })



      });


     
    console.table(cart);

    // fonction pour afficher les prix dans le html || servira pour raffraichir les prix ensuite 
    function updateQuantityPrice() {

      // je récupère les quantités
      let itemQtt = document.getElementsByClassName('itemQuantity');
      let pdtLength = itemQtt.length;

      // j'initialise ma variable pour le total des quantités
      let totalQtt = 0;

      // je boucle pour savoir le total 
      for (var q = 0; q < pdtLength; q++) {
        totalQtt += itemQtt[q].valueAsNumber;
      };

      // je transmet le résultat à mon html 
      let qttDisplay = document.getElementById('totalQuantity');
      qttDisplay.innerHTML = totalQtt;
      console.log(totalQtt);

      // j'initialise ma variable pour le total des prix
      let totalPrice = 0;

      // je boucle pour avoir le prix des articles en fonction des quantités 
      for (let q = 0; q < pdtLength; q++) {
        totalPrice += (itemQtt[q].valueAsNumber * cart[q].price);
      };

      // je transmet le résultat à mon html 
      let priceDisplay = document.getElementById('totalPrice');
      let fix = Math.round(totalPrice);
      priceDisplay.innerHTML = fix;

      // pour finir je set mon cart (sera surtout utile quand je delete un canapé)
      localStorage.setItem("cart", JSON.stringify(cart));

    };
    updateQuantityPrice();


    // fonction pour supprimer un produit choisi
    function deleteProduct() {
      let deleteItem = document.querySelectorAll(".deleteItem");

      for (let s = 0; s < deleteItem.length; s++) {
        deleteItem[s].addEventListener("click", (event) => {
          event.preventDefault();

          let idDelete = cart[s].id;
          let colorDelete = cart[s].color;

          // méthode filter pour trouver le bonne élément de la boucle 
          cart = cart.filter(el => el.id !== idDelete || el.color !== colorDelete);

          // removeChild pour enlever dynamiquement le html de l'article
          let target = document.getElementById('cart__items');
          target.childNodes[s];
          target.removeChild(target.children[s]);

          // update des prix et quantités de façon dynamique 
          updateQuantityPrice();
        })

      }
    }
    deleteProduct();


    // fonction pour que l'utilisateur puisse changer la quantité d'un canapé 
    function qttChange() {

      let itemqtt = document.querySelectorAll(".itemQuantity");

      // je boucle la longueur pour chaque quantité 
      for (let k = 0; k < itemqtt.length; k++) {
        itemqtt[k].addEventListener("change", (e) => {
          e.preventDefault();

          //je sélectionner l'élément à modifier 
          const qttSelect = cart[k].quantity;
          const qttValue = itemqtt[k].valueAsNumber;

          // je cherche l'élement que je veux avec la méthode find 
          const qttSearch = cart.find((el) => el.qttValue !== qttSelect);

          qttSearch.quantity = qttValue;
          cart[k].quantity = qttSearch.quantity;

          // je remplace le panier avec les bonnes valeurs 
          updateQuantityPrice();

        });
      };

    };
    qttChange();


  });// fin du for each 


}; // fin de else 


// partie formulaire 


let form = document.querySelector(".cart__order__form");

// Ajout des Regex
let emailCheck = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
let nameCheck = new RegExp("^[a-zA-Z ,.'-]+$");
let cityCheck = new RegExp("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$");
let addressCheck = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");


// Ecoute de la modification du nom
form.firstName.addEventListener('change', function () {
  validFirstName(this);
});

// Ecoute de la modification du prénom
form.lastName.addEventListener('change', function () {
  validLastName(this);
});

// Ecoute de la modification du prénom
form.address.addEventListener('change', function () {
  validAddress(this);
});

// Ecoute de la modification du prénom
form.city.addEventListener('change', function () {
  validCity(this);
});

// Ecoute de la modification du prénom
form.email.addEventListener('change', function () {
  validEmail(this);
});

//validation du prénom
const validFirstName = function (inputFirstName) {
  let firstNameErrorMsg = inputFirstName.nextElementSibling;

  if (nameCheck.test(inputFirstName.value)) {
    firstNameErrorMsg.innerHTML = '';
    return true;
  } else {
    firstNameErrorMsg.innerHTML = 'Le champ n est pas valide !';
    return false;
  }
};

//validation du nom
const validLastName = function (inputLastName) {
  let lastNameErrorMsg = inputLastName.nextElementSibling;

  if (nameCheck.test(inputLastName.value)) {
    lastNameErrorMsg.innerHTML = '';
    return true;
  } else {
    lastNameErrorMsg.innerHTML = 'Le champ n est pas valide !';
    return false;
  }
};

//validation de l'adresse
const validAddress = function (inputAddress) {
  let addressErrorMsg = inputAddress.nextElementSibling;

  if (addressCheck.test(inputAddress.value)) {
    addressErrorMsg.innerHTML = '';
    return true;
  } else {
    addressErrorMsg.innerHTML = 'Le champ n est pas valide !';
    return false;
  }
};

//validation de la ville
const validCity = function (inputCity) {
  let cityErrorMsg = inputCity.nextElementSibling;

  if (cityCheck.test(inputCity.value)) {
    cityErrorMsg.innerHTML = '';
    return true;

  } else {
    cityErrorMsg.innerHTML = 'Le champ n est pas valide !';
    return false;
  }
};

//validation de l'email
const validEmail = function (inputEmail) {
  let emailErrorMsg = inputEmail.nextElementSibling;

  if (emailCheck.test(inputEmail.value)) {
    emailErrorMsg.innerHTML = '';
    return true;
  } else {
    emailErrorMsg.innerHTML = 'Le champ n est pas valide !';
    return false;
  }
};



const btn_commander = document.getElementById("order");

btn_commander.addEventListener('click', (e) => {
  e.preventDefault();


  // le tableau pour les id 
  let itemId = [];
  for (let z = 0; z < cart.length; z++) {
    itemId.push(cart[z].id);
  }
  console.log(itemId);


  let inputName = document.getElementById("firstName");
  let inputLastName = document.getElementById("lastName");
  let inputAdress = document.getElementById("address");
  let inputCity = document.getElementById("city");
  let inputMail = document.getElementById("email");

  const order = {

    contact: {
      firstName: inputName.value,
      lastName: inputLastName.value,
      address: inputAdress.value,
      city: inputCity.value,
      email: inputMail.value,
    },
    products: itemId,
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
  };

  fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.clear();
      localStorage.setItem("orderId", data.orderId);

      document.location.href = "confirmation.html?orderId";
    });

}); // fin du addEvent orderBtn


