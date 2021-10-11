function fetchBaseProduit(){

    fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((data)=> {
        console.log(data);
    })
}
fetchBaseProduit();



document.getElementById('items')