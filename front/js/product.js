// utilisation de searchparams pour récupérer l'id du bon produit pour chaque objet 
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const newUrl = "http://localhost:3000/api/products/" + id;

let resultApi;
const image = document.querySelector('.item__img');
const titre = document.querySelector('#title');
const prix = document.querySelector('#price');
const description = document.querySelector('#description');
let colorSelect = document.getElementById("colors");
const itemQty = document.getElementById("quantity");


// appel de l'api 
function fetchNewUrl() {

  fetch(newUrl)
    .then(response => response.json())
    .then((data) => {
      console.log(data);

      resultApi = data;

      // mise en page de l'api avec le DOM
      titre.innerText = resultApi.name;
      prix.innerText = resultApi.price;
      image.innerHTML = `<img src="${resultApi.imageUrl}" alt="Photographie d'un canapé">`
      description.innerText = resultApi.description;


      // boucle pour mettre en place les options de couleurs 
      for (let i = 0; i < resultApi.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = resultApi.colors[i];
        colorSelect.appendChild(option);

      };

    });

};
fetchNewUrl();


function addToCart() {

  // on crée le formulaire d'envoie du bouton 
  const sendToCart = document.getElementById("addToCart");
  sendToCart.addEventListener('click', (event) => {
    event.preventDefault();


    // objet et ses paramètres qui vont être ajoutés au panier 
    let addItem = {

      id: newUrl,
      name: titre.textContent,
      price: prix.textContent,
      quantity: itemQty.value,
      color: colorSelect.value,
    };
    console.log(addItem);

    // création du panier (localstorage)
    let cart = [];

    // si le localstorage contient déjà des éléments on les récupèrent, puis on insert les nouveaux 
    if (localStorage.getItem("item") !== null) {
      cart = JSON.parse(localStorage.getItem("item"));
    }
    // si il n'existe pas on crée un nouveau avec en poussant un nouvelle objet (addItem)
    cart.push(addItem);
    localStorage.setItem("item", JSON.stringify(cart));

    // message de confirmation   
      alert('le produit a été ajouté à votre panier')
   
  });

};
addToCart();