function orderId() {

    const displayOrder = document.getElementById("orderId");
    getOrder = localStorage.getItem("orderId");
    displayOrder.innerHTML = getOrder;
    localStorage.clear();

};
orderId();