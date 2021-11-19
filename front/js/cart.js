const itemInLocal = JSON.parse(localStorage.getItem('item'));
console.log('les canapés', itemInLocal);

// je sélectionne le html 
const cartContainer = document.getElementById('cartAndFormContainer');

// si le panier est vide :
if (itemInLocal === null) {
  document.querySelector("#cart__items").innerHTML = `
 <div class="cart__empty">
   <p>Le panier est vide ! </p>
 </div>`;

}

// si pas vide 
else {
  function test() {
    let affichage = "";

    itemInLocal.foreach((item) => {
      const { id, description, price, color, alt, name, quantity, image } = item;

      affichage = + `
    
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
    document.getElementById('cartAndFormContainer').innerHTML = item;
  }
  
};