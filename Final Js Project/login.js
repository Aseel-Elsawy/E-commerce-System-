document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

   
    const adminEmail = "admin@swissarabian.com";
    const adminPassword = CryptoJS.SHA256("admin123").toString();

    let isValid = true;

  
    clearErrors(["email", "password"]);

    
    if (!email) {
        displayError("email", "Email is required.");
        isValid = false;
    } else if (!validateEmail(email)) {
        displayError("email", "Please enter a valid email address.");
        isValid = false;
    }

    
    if (!password) {
        displayError("password", "Password is required.");
        isValid = false;
    }

    if (isValid) {
        const hashedPassword = CryptoJS.SHA256(password).toString();
    
        if (email === adminEmail && hashedPassword === adminPassword) {
           
            
            const userId = `user${Date.now()}`;
            const hashedPassword = CryptoJS.SHA256(password).toString();
            const registrationDate = new Date().toISOString();
            const userRole="Admin";
            const user = { id: userId, name, email, password: hashedPassword, role:userRole , registrationDate };
            localStorage.removeItem("loggedinUser");
            localStorage.setItem("loggedinUser", JSON.stringify(user));
    
            window.location.href = "admin.html";
        } else {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(user => user.email === email && user.password === hashedPassword);
    
            if (user) {
               
                localStorage.removeItem("loggedinUser");
    
                if (user.role === "Customer") {
                    localStorage.setItem("loggedinUser", JSON.stringify(user));
                    window.location.href = window.location.origin + '/landscape/landscape.html';
                } else if (user.role === "Seller") {
                    if (user.status === "active") {
                        localStorage.setItem("loggedinUser", JSON.stringify(user));
                    
                        window.location.href = window.location.origin +'/SallerDashbord.html';
                    } 
                    else {
                      
                        alert("Your account is not active yet. Please try again later.");
                    }
                }
                else if (user.role === "Admin") {
                    localStorage.setItem("loggedinUser", JSON.stringify(user));
                    window.location.href = "admin.html";
                }
                
            } 
            else {
                displayError("email", "Invalid email or password.");
            }
        }
    }
    
});
function clearErrors(inputIds) {
    inputIds.forEach(id => {
        const errorElement = document.getElementById(id + "Error");
        if (errorElement) errorElement.remove();
    });
}


function displayError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.createElement("span");
    errorElement.id = inputId + "Error";
    errorElement.className = "error";
    errorElement.textContent = message;
    inputElement.insertAdjacentElement("afterend", errorElement);
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}
