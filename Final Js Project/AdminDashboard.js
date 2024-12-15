$(function () {
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});
const currentUser =JSON.parse(localStorage.getItem("loggedinUser"));
if(currentUser)
  {
    if(currentUser.role!=="Admin")
    {
      alert("you don't have access here");
      window.location.href =window.location.origin + '/role.html';
      return;
   
    }
  }
  else
  {
      alert("please login");
      window.location.href =window.location.origin + '/login.html';
      return;
      
  }
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

const logoutLink = document.getElementById("logout");

    logoutLink.addEventListener('click', (event) => {
        event.preventDefault(); 
        localStorage.removeItem('loggedinUser'); 
        window.location.href = '../login.html'; 
    });
});
