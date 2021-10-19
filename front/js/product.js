let resultApi;
const image = document.querySelector('.item__img');
const titre = document.querySelector('#title');
const prix = document.querySelector('#price');
const description = document.querySelector('#description');
let colorSelect = document.getElementById("colors");


// appel de l'api 
fetch(`http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926`)
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

  })
  // message d'erreur
  .catch(e => {
    errorMessage("Veuillez passer sur le localhost:3000");
    console.log(e);
  });

  



