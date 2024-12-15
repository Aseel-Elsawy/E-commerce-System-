
$(function () {
    const currentUser = JSON.parse(localStorage.getItem("loggedinUser"));
    if (currentUser) {
        if (currentUser.role !== "Admin") {
            alert("you don't have access here");
            window.location.href = window.location.origin + '/login.html';
            return;

        }
    }
    else {
        alert("please login");
        window.location.href = window.location.origin + '/login.html';
        return;

    }
    const toggleBtn = document.getElementById("toggle-btn");
    const sidebar = document.getElementById("sidebar");

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });
    
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });


    const sellerName = currentUser.name || 'Seller';
    document.querySelector('.navbar-custom h5').textContent = `Welcome, ${sellerName}`;
    document.addEventListener("DOMContentLoaded", () => {
        const links = document.querySelectorAll(".nav-link");

        links.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add("active");
            }
        });
    });
    function displayProducts() {

        let admin = currentUser.id;

        let products = JSON.parse(localStorage.getItem("Products")) || [];
        if (!products) {
            console.log("No products found in local storage.");
            return;
        }

        let TableBody = $("#ProductsTable tbody");
        TableBody.empty();

        products.forEach(function (product) {
            let row = $("<tr>");

          
            let productIdCol = $("<td>").text(product.ProductId);

         
            let productNameCol = $("<td>").text(product.name);

           
            let categoryCol = $("<td>").text(product.category);

           
            let imageCol = $("<td>").addClass("align-middle");
            let img = $("<img>")
                .attr("src", product.image)
                .attr("alt", product.name)
                .addClass("img-fluid rounded  img")

            imageCol.append(img);

          
            let priceCol = $("<td>").text(product.price + " EGP");

          
            let quantityCol = $("<td>").text(product.quantity)

           
            let actionsCol = $("<td>").addClass("align-middle ");
            let deleteimg = $("<i>").addClass("fa-solid fa-trash-can");

            deleteimg.click(function () {
                products = products.filter(function (p) {
                    return !(p.ProductId === product.ProductId);
                });
                let orders = JSON.parse(localStorage.getItem("Orders"));
                orders = orders.filter(function (order) {

                    if (order.status === 0) {
                        order.items = order.items.filter(function (item) {
                            if (item.ProductId === product.ProductId && item.status === 0) {
                                order.total -= (item.price * item.quantity);
                                return false;
                            }
                            return true;

                        });
                        return order.items.length > 0;
                    }

                    return true;
                });



               
                localStorage.setItem("Products", JSON.stringify(products));
                localStorage.setItem("Orders", JSON.stringify(orders));

         
                displayProducts();
            });



            actionsCol.append(deleteimg);

           
            row.append(productIdCol, productNameCol, categoryCol, imageCol, priceCol, quantityCol, actionsCol);

            TableBody.append(row);

        });
    }

 
    const logoutLink = document.getElementById("logout");

    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('loggedinUser');
        window.location.href = '../login.html';
    });
    displayProducts();
});