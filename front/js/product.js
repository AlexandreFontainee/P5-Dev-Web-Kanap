// utilisation de searchparams pour récupérer l'id du bon produit pour chaque objet 
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const newUrl = "http://localhost:3000/api/products/" + id;


const colors = document.getElementById("colors");
const itemQty = document.getElementById("quantity");


// appel de l'api 

fetch(newUrl)
  .then(response => response.json())
  .then((data) => {
    console.log(data);

    resultApi = data;

    // const pour afficher les produits 
    const image = document.querySelector('.item__img');
    const titre = document.querySelector('#title');
    const prix = document.querySelector('#price');
    const description = document.querySelector('#description');
    const imageURL = resultApi.imageUrl;

    // mise en page de l'api avec le DOM
    titre.innerText = resultApi.name;
    prix.innerText = resultApi.price;
    image.innerHTML = `<img src="${resultApi.imageUrl}" alt="Photographie d'un canapé">`
    description.innerText = resultApi.description;


    // boucle pour mettre en place les options de couleurs 
    for (options in resultApi.colors) {
      colors.options[colors.options.length] = new Option(
        resultApi.colors[options],
      );
    }


    // je crée le tableau d'information que je vais retourner au localStorage
    const arrayItem = {

      id: id,
      image: imageURL,
      name: titre.innerHTML,
      price: prix.innerHTML,
      color: colors.value,
      quantity: itemQty.value,
    };
    console.log(arrayItem);


    // on crée le formulaire d'envoie du bouton 
    const sendToCart = document.getElementById("addToCart");
    sendToCart.addEventListener('click', (event) => {
      event.preventDefault();


      let itemInLocal = JSON.parse(localStorage.getItem('item'));
      console.log(itemInLocal);

      const addItemInLocal = () => {
        itemInLocal.push(arrayItem);
        localStorage.setItem('item', JSON.stringify(itemInLocal));
        console.log(addItemInLocal);
      }

      let addConfirm = () => {
        alert('Le produit a été ajouté au panier');
      }

      let update = false;

      // s'il y a des produits enregistrés dans le localStorage
      if (itemInLocal) {
        itemInLocal.forEach(function (itemTrue, key) {
          if (itemTrue.id == id && itemTrue.color == colors.value) {
            itemInLocal[key].quantity = parseInt(itemTrue.quantity) + parseInt(itemQty.value);
            localStorage.setItem('item', JSON.stringify(itemInLocal));
            update = true;
          }
        });

        //
        if (!update) {
          addItemInLocal();
          addConfirm();
          console.log(itemInLocal);
        }
      }

      // s'il n'y a aucun produit enregistré dans le localStorage 
      else {
        itemInLocal = [];
        addItemInLocal();
        addConfirm();
        console.log(itemInLocal);
      }

    });


  });