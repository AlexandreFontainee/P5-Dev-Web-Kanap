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

  const cartContainer = document.getElementById('cartAndFormContainer');
  let affichage = "";

  itemInLocal.forEach((item) => {
    const { id, price, color, alt, name, quantity, image } = item;

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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `

  });
  document.getElementById('cartAndFormContainer').innerHTML = affichage;



  // création du bouton supprimer 

  const suppSelection = document.querySelector(".deleteItem");
  suppSelection.addEventListener('click', (event) => {
    event.preventDefault();


    localStorage.removeItem('item');
    window.location.reload();
  });


  // pour l'instant marche mais que pour supprimer tout les items 


  // changement des quantités et ou de la couleur du produit 
  function changeQuantity() {

    const itemquantt = document.querySelector('.itemQuantity');
    for (let i = 0; itemquantt.length; i++) {

      itemquantt[i].addEventListener('change', (event) => {
        event.preventDefault();

        let newQtt = itemquantt[i].value;
        // je crée le cart pour insérer les données avec les nouvelles quantités 

        const newCart = {
          id: itemInLocal[i].id,
          image: itemInLocal[i].image,
          alt: itemInLocal[i].alt,
          name: itemInLocal[i].name,
          color: itemInLocal[i].color,
          price: itemInLocal[i].price,
          quantity: newQtt,
        };

        itemInLocal[i] = newCart;
        localStorage.setItem('item', JSON.stringify(itemInLocal));
        alert('vous avez changé la quantité ')
      })

    };
  };
  changeQuantity();


};

// partie formulaire 

function sendFormulaire() {
  const envoie = document.getElementById('order'); // bouton envoyer en bas du formulaire 
  envoie.addEventListener('click', (e) => {
    e.preventDefault();

    // je récupère les données sous la forme d'un objet que je pourrai envoyer plus tard au serveur 
    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value
    }



    // Je crée ensuite les vérification pour chaque input 

    // contrôle du prénom :
    const checkFirstName = contact.firstName;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,20}$/.test(checkFirstName)) {
      return true;
      // si tout les paramètres sont respecté je retourne vrai
    } else {
      let errorFN = document.getElementById('firstNameErrorMsg');
      errorFN.innerText = " Veuillez rentrer un prénom valide !";
    };
    // sinon je retourne faux 


    // contrôle du nom :
    const checkName = contact.lastName;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(checkName)) {
      return true;
      // si tout les paramètres sont respecté je retourne vrai
    } else {
      let errorLN = document.getElementById('lastNameErrorMsg');
      errorLN.innerText = "Veuillez rentrer un nom valide !";
    };
    // sinon je retourne faux 


    // contrôle de l'adresse : 
    const checkAddress = contact.address;
    if (/\d{2}[ ]?\d{3}$/.test(checkAddress)) {
      return true;
      // si tout les paramètres sont respecté je retourne vrai
    } else {
      let errorAdress = document.getElementById('addressErrorMsg');
      errorAdress.innerText = "Votre adresse n'est pas écrite correctement !";
    };
    // sinon je retourne faux 


    // contrôle de la ville :
    const checkCity = contact.city;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(checkCity)) {
      return true;
      // si tout les paramètres sont respecté je retourne vrai

    } else {
      let errorCity = document.getElementById('cityErrorMsg');
      errorCity.innerText = "Votre ville ne correspond pas !";
    };
    // sinon je retourne faux 


    // contrôle de l'email :
    const checkEmail = contact.email;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkEmail)) {
      return true;
      // si tout les paramètres sont respecté je retourne vrai
    } else {
      let errorEmail = document.getElementById('emailErrorMsg');
      errorEmail.innerText = "Votre email n'est pas valide !";
    };
    // sinon je retourne faux 


  }); // addEvenlistener de l'objet contact

};
