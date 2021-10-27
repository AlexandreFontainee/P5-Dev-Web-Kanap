const cardContainer = document.getElementById('cartAndFormContainer');
console.log(cardContainer);

function displayCart() {
    // récupération du localStorage 
    let takeItem = JSON.parse(localStorage.getItem("item"));

    // on vérifie l'état du panier 
    if (takeItem === null) {
        alert("votre panier est vide !");
    }

    else {
        // boucle pour afficher les articles que le client a dans le panier 
        for (let i = 0; i < takeItem.length; i++);
        console.log(takeItem);

        // affichage du panier 
       

        let affichageCart = "";

        affichageCart =  affichageCart + `
        <article class="cart__item" data-id="${takeItem[i].id}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${takeItem[i].name}</h2>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `
    }
};
displayCart();