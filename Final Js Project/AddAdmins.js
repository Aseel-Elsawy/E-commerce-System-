document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  const toggleBtn = document.querySelector('.toggle-btn');
  const sidebar = document.querySelector('.sidebar');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  
  const users = JSON.parse(localStorage.getItem("users")) || [];


  const emailInput = document.getElementById("admin-email");
  const passwordInput = document.getElementById("admin-password");
  const addAdminBtn = document.getElementById("add-admin-btn");

  
  function addAdmin() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

 
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      alert("This email is already registered!");
      return;
    }

   
    const newAdmin = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1, 
      email: email,
      password: CryptoJS.SHA256(password).toString(),
      role: "Admin"
    };

    
    users.push(newAdmin);
    localStorage.setItem("users", JSON.stringify(users));

  
    emailInput.value = "";
    passwordInput.value = "";

    alert("Admin added successfully!");
  }

 
  addAdminBtn.addEventListener("click", addAdmin);

 
  const loggedInUser = JSON.parse(localStorage.getItem("loggedinUser"))||[];
  if (!loggedInUser || loggedInUser.role !== "Admin") {
      alert("You are not authorized to access this page. Redirecting to login...");
      window.location.href = "login.html";
      return;
  }

  const logoutLink = document.getElementById("logout");

  logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.removeItem('loggedinUser');
      window.location.href = '../login.html';
  });
});
