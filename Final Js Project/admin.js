
const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});





function getLocalStorageData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}


function updateDashboardMetrics() {
    const users = getLocalStorageData('users');
    const orders = getLocalStorageData('Orders');

 
    const totalUsers = users.length;
    document.getElementById('total-users').textContent = totalUsers;

    
    const pendingSellers = users.filter(user => user.role === 'Seller' && user.status === 'not active').length;
    document.getElementById('pending-sellers').textContent = pendingSellers;

    const completedOrders = orders.filter(order => order.status === 1).length;
    document.getElementById('completed-orders').textContent = completedOrders;

  
    const today = new Date().toISOString().split('T')[0];
    const dailySignups = users.filter(user => user.registrationDate && user.registrationDate.startsWith(today)).length;
    document.getElementById('daily-signups').textContent = dailySignups;


  
    updateRegistrationsChart(users);
}


function updateRegistrationsChart(users) {
    const chartData = {
        labels: ['Customers', 'Sellers'],
        datasets: [{
            label: 'New Registrations',
            data: [
                users.filter(user => user.role === 'Customer').length,
                users.filter(user => user.role === 'Seller').length
            ],
            backgroundColor: ['#f39c12', '#3498db']
        }]
    };

    const ctx = document.getElementById('registrations-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: chartData,
    });
}


document.addEventListener("DOMContentLoaded", () => {
     
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
  
    updateDashboardMetrics();

  
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
