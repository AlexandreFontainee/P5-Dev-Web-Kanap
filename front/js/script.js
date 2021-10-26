// appel de l'api 

fetch(`http://localhost:3000/api/products/`)
  .then(response => response.json())
  .then((data) => {
    console.log(data);


    // variable pour l'affichage du html
    let affichage = "";


    // boucle pour avoir les éléments du tableau 
    for (let i = 0; i < data.length; i++) {

      affichage += `

        <a href="./product.html?id=${data[i]._id}">
            <article>
              <img src="${data[i].imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${data[i].name}</h3>
              <p class="productDescription">${data[i].description}</p>
            </article>
          </a> `;

    }

    document.getElementById("items").innerHTML = affichage;

  });



