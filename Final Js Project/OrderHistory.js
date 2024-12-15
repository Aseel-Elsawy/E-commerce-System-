$(function () {
    const user = JSON.parse(localStorage.getItem("loggedinUser"));
    if (user) {
        if (user.role !== "Customer") {
            alert("You don't have access here");
            window.location.href = window.location.origin + "/role.html";
            return;
        }
    } else {
        alert("Please login");
        window.location.href = window.location.origin + "/login.html";
        return;
    }
    const ClientId = user.id;
    $("#ForHerNav, #ForHimNav").click(function () {
        const category = this.dataset.category;   
        localStorage.setItem('SelectedCategory', category); 
        window.location.href =window.location.origin+ "/products.html";
    });
 
  let contact=document.getElementById("Contact");
  contact.addEventListener("click",function(){
    const contactdiv=document.createElement("div");
    contactdiv.innerHTML=`
  <div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Contact Us</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
      <h5 class="text-center"> We Will Recieve Your Meesage</h5>
      <div class="text-center">
       <textarea id="textArea" class="mt-3"></textarea>
       </div>
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
       <button type="button"  id="submit" class="btn btn-dark">Submit</button>
        <button  type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>`;
var Complaints=JSON.parse(localStorage.getItem("Complaints")) || [];
  document.body.appendChild(contactdiv); 
  let modal = new bootstrap.Modal(document.getElementById("myModal")); 
  modal.show();
  let submmitbtn=document.getElementById("submit");
  let textarea=document.getElementById("textArea");
  submmitbtn.addEventListener("click",function(){
    if(textarea.value)
      {
      const complaints = {
        ClientId: ClientId,
        ClientName:user.name,
        Message:textarea.value
       
      };
    
      Complaints.push(complaints);
      localStorage.setItem("Complaints",JSON.stringify(Complaints));
      modal.hide();
    }
  });
  
  });

   
    let products = JSON.parse(localStorage.getItem("Products")) || [];
    let orders = JSON.parse(localStorage.getItem("Orders")) || [];
    let filteredOrder = orders.filter(function (order) {
        return order.ClientId === ClientId;
    });

    let wrapper = $("#wrapper");

    filteredOrder.forEach(function (order) {
        let orderDiv = $("<div>").addClass("order-section mb-4");
        let status;
        if( order.status===0)
        {
         status="Pending";
        }
        else if(order.status===1)
        {
         status="Shipped";
        }
         let orderstatus = $("<h4>").text("Your Order is:"+status);
        let orderHeader = $("<h6>")
        .text("Order Number: " + order.id)
        .append($("<br>"))
        .append("Date: " + order.date);
        let productList = $("<ul>").addClass("list-group mb-3");
      
        let total = 0;

        order.items.forEach(function (item) {
            let productId = item.ProductId;
            let GetProduct = products.find(function (product) {
                return product.ProductId === productId;
            });

            if (!GetProduct) {
                console.log("Product not found in product list for ProductId:", productId);
                return;
            }

            let productLi = $("<li>").addClass("list-group-item d-flex justify-content-between lh-sm");
            let divs = $("<div>");
            let productName = $("<h6>").addClass("my-0 mb-3").text(GetProduct.name);

            let img = $("<img>")
                .attr("src", GetProduct.image)
                .attr("alt", GetProduct.name)
                .addClass("Checkoutimages");
            let price = $("<span>").text(GetProduct.price + " EGP");
            let quantity = $("<h6>").text("Quantity: " + item.quantity);

            total += Number(GetProduct.price * item.quantity);

            divs.append(productName, img, quantity);
            productLi.append(divs, price);
            productList.append(productLi);
        });

        let totalLi = $("<li>").addClass("list-group-item d-flex justify-content-between");
        let totalSpan = $("<span>").text("Total (EGP)");
        let totalStrong = $("<strong>").text(order.total + " EGP");
        totalLi.append(totalSpan, totalStrong);
        productList.append(totalLi);

        orderDiv.append(orderstatus,orderHeader, productList);
        wrapper.append(orderDiv);
    });
});
