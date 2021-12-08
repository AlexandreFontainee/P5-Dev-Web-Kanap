const itemInLocal = JSON.parse(localStorage.getItem('item'));
console.log('les canapés', itemInLocal);

// si le panier est vide :
if (itemInLocal === null) {
  document.querySelector("#cart__items").innerHTML = `
 <div class="cart__empty">
   <p>Le panier est vide ! </p>
 </div>`;

}

// si pas vide 
else {

  const cartContainer = document.getElementById('cart__items');
  let affichage = "";

  itemInLocal.forEach((item) => {
    const { id, price, color, alt, name, quantity, image } = item;
    console.log("testo", itemInLocal);

    affichage += `
    
    <article class="cart__item" data-id="${id}" data-color="${color}">
    <div class="cart__item__img">
      <img src="${image}" alt="${alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${name}</h2>
        <p>${color}</p>
        <p>${price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <button id ="moins"> - </button> 
          <button id ="plus"> + </button>
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

  }); // fin de la boucle avec mes items 

  function total() {

    // je récupère les quantités
    let itemQtt = document.getElementsByClassName('itemQuantity');
    //variable pour la longueur des qtt 
    let pdtLength = itemQtt.length;
    let totalQtt = 0;

    // je boucle pour savoir le total 
    for (var q = 0; q < pdtLength; q++) {
      totalQtt += itemQtt[q].valueAsNumber;
    };

    // je transmet le résultat à mon html 
    let qttDisplay = document.getElementById('totalQuantity');
    qttDisplay.innerHTML = totalQtt;
    console.log(totalQtt);


    // je récupère le prix

    let totalPrice = 0;

    // je boucle la quantité des deux éléments pour les multiplier ensuite 
    for (let q = 0; q < pdtLength; q++) {
      totalPrice += (itemQtt[q].valueAsNumber * itemInLocal[q].price);
    };

    // je transmet le résultat à mon html 
    let priceDisplay = document.getElementById('totalPrice');
    let fix = Math.round(totalPrice * 100) / 100; // pour arrondire le résultat à deux décimal 
    priceDisplay.innerHTML = fix;

    console.log(fix);

  };
  total();


  // function pour changer la valeur d'un canapé 
  function qttChange() {

    let itemqtt = document.querySelectorAll(".itemQuantity");

    // je boucle la longueur pour chaque quantité 
    for (let k = 0; k < itemqtt.length; k++) {
      itemqtt[k].addEventListener("change", (e) => {
        e.preventDefault();

        //je sélectionner l'élément à modifier 
        const qttSelect = itemInLocal[k].quantity;
        const qttValue = itemqtt[k].valueAsNumber;

        // je cherche l'élement que je veux avec la méthode find 
        const qttSearch = itemInLocal.find((el) => el.qttValue !== qttSelect);

        qttSearch.quantity = qttValue;
        itemInLocal[k].quantity = qttSearch.quantity;

        // je remplace le panier avec les bonnes valeurs 
        localStorage.setItem("item", JSON.stringify(itemInLocal));

        // je reload la page avec l'alert comme quoi la quantité a changé 
        location.reload();
        alert('Attention vous avez changé la quantité !')
      });
    };


  };
  qttChange();

 // supprimer un des canapés 

 const deleteItem = document.querySelectorAll('.deleteItem');

  deleteItem.forEach((btn,) => {
    btn.addEventListener('click', e => {
      deleteItemSelect(e, itemInLocal);
      location.reload();
    });

    // je crée une function avec la méthode splice pour rechercher dans l'index quel capané supprimé 
    function deleteItemSelect(index) {
      itemInLocal.splice(index, 1);
      localStorage.setItem('item', JSON.stringify(itemInLocal));

      if (itemInLocal.length === 0) {
        localStorage.removeItem('item');
        // quand mon panier est vide je remove mon localstorage et j'envoie un message un pop up comme quoi le panier est vide 
        alert('Vous avez vidé votre panier');
      };

    };

  });


}; // fin de else 


// partie formulaire 


function formulaireCheck() {
  
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
    } else {
      firstNameErrorMsg.innerHTML = 'Le champ n est pas valide !';
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (nameCheck.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = '';
    } else {
      lastNameErrorMsg.innerHTML = 'Le champ n est pas valide !';
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressCheck.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = '';
    } else {
      addressErrorMsg.innerHTML = 'Le champ n est pas valide !';
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (cityCheck.test(inputCity.value)) {
      cityErrorMsg.innerHTML = '';
    } else {
      cityErrorMsg.innerHTML = 'Le champ n est pas valide !';
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailCheck.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = '';
    } else {
      emailErrorMsg.innerHTML = 'Le champ n est pas valide !';
    }
  };
};
formulaireCheck();

// checker si formulaire = true 
// faire un objet 
// l'envoyer a l'api pour la commande avec l'id 
 