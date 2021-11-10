const itemInLocal = JSON.parse(localStorage.getItem('item'));
console.log('les canapés', itemInLocal);

// je sélectionne le html 
const cartContainer = document.getElementById('cartAndFormContainer');
console.log(cartAndFormContainer);

// si le panier est vide :
if (itemInLocal === null || itemInLocal == 0) {
  document.querySelector("#cart__items").innerHTML = `
 <div class="cart__empty">
   <p>Le panier est vide ! </p>
 </div>`;
}
// si le panier n'est pas vide : 
else {
  let CardItem = [];
  //expression initiale; condition; incrémentation
  for (i = 0; i < itemInLocal.length; i++) {
    console.log(itemInLocal.length);
    
    CardItem = CardItem + `
   
   <article class="cart__item" data-id="${itemInLocal[i].id}" data-color="${itemInLocal.color}">
   <div class="cart__item__img">
     <img src="${itemInLocal[i].image}" alt="${itemInLocal[i].alt}">
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__titlePrice">
       <h2>${itemInLocal[i].name}</h2>
       <p>${itemInLocal[i].color}</p>
       <p>${itemInLocal[i].price} €</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemInLocal[i].quantity}">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>
 </article>
   `;
    console.log(CardItem);
  }
  if (i == itemInLocal.length) {
    const CardItem = document.getElementById('cart__items');
    CardItem.innerHTML += CardItem;
  }
}