// appel de l'api 

fetch(`http://localhost:3000/api/products/`)
  .then(response => response.json())
  .then((data) => {
    console.log(data);


    // variable pour l'affichage du html
    let affichage = "";
    let codeItem = data;

    // boucle pour avoir les éléments du tableau 
    codeItem.forEach((item )=> {
      const { _id, imageUrl, name, description} = item;
   

      affichage += `

        <a href="./product.html?id=${_id}">
            <article>
              <img src="${imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${name}</h3>
              <p class="productDescription">${description}</p>
            </article>
          </a> `;

        });

    document.getElementById("items").innerHTML = affichage;

  });



