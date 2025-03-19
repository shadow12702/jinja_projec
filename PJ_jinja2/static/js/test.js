// User data - would be replaced by API calls in production
const USERS = [
    {
        id: 1,
        name: "User1",
        email: "user1@gmail.com",
        phone: "123-456-7890",
        status: "active",
        storageUsed: 7.8,
        storageLimit: 10,
        lastActive: "2025-03-14",
    },
    // Other user objects
];

/**
 * Highlights the current active menu item based on URL path
 */
export function setupMenuHighlighting() {
    const currentPath = window.location.pathname;
    
    // First remove active class from all items
    document.querySelectorAll(".menu-item").forEach(item => {
        item.classList.remove("active");
    });
    
    // Then add active class to matching items
    document.querySelectorAll(".menu-item").forEach(item => {
        const href = item.getAttribute("href");
        if (href && currentPath.includes(href)) {
            item.classList.add("active");
        }
    });
    
    // Special case for dashboard
    if (currentPath.includes("dashboard.html") || currentPath.endsWith("/dashboard/")) {
        const dashboardLink = document.querySelector('a[href="dashboard.html"]');
        if (dashboardLink) dashboardLink.classList.add("active");
    }
}

/**
 * Updates the dashboard with current user data and statistics
 */
export function updateDashboard() {
    // Calculate statistics
    const totalUsers = USERS.length;
    const activeUsers = USERS.filter(user => user.status === "active").length;
    const totalStorage = USERS.reduce((sum, user) => sum + user.storageUsed, 0).toFixed(1);
    const averageUsage = (USERS.reduce(
        (sum, user) => sum + (user.storageUsed / user.storageLimit) * 100, 0
    ) / USERS.length).toFixed(1);
    
    // Update DOM elements with calculated stats
    const elements = {
        totalUsers: document.getElementById("total-users"),
        activeUsers: document.getElementById("active-users"),
        totalStorage: document.getElementById("total-storage"),
        averageUsage: document.getElementById("average-usage"),
        tableBody: document.getElementById("user-table-body")
    };
    
    if (elements.totalUsers) elements.totalUsers.textContent = totalUsers;
    if (elements.activeUsers) elements.activeUsers.textContent = activeUsers;
    if (elements.totalStorage) elements.totalStorage.textContent = `${totalStorage} GB`;
    if (elements.averageUsage) elements.averageUsage.textContent = `${averageUsage}%`;
    
    // Populate user table if it exists
    if (elements.tableBody) {
        elements.tableBody.innerHTML = "";
        
        USERS.forEach(user => {
            const row = document.createElement("tr");
            row.dataset.userId = user.id;
            
            row.innerHTML = `
                <td>
                    <div class="user-name">
                        <span class="avatar">${user.name.charAt(0)}</span>
                        <span>${user.name}</span>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td><span class="status ${user.status}">${user.status}</span></td>
                <td>
                    <div class="storage-info">
                        <div class="storage-bar">
                            <div class="storage-fill" style="width: ${(user.storageUsed / user.storageLimit) * 100}%"></div>
                        </div>
                        <span>${user.storageUsed} / ${user.storageLimit} GB</span>
                    </div>
                </td>
                <td>
                    <button class="action-btn view-details" data-user-id="${user.id}">
                        <i class="ri-eye-line"></i>
                    </button>
                </td>
            `;
            
            elements.tableBody.appendChild(row);
        });
        
        // Add event listeners to view buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = parseInt(btn.dataset.userId);
                viewUserDetails(userId);
            });
        });
    }
    
    // Initialize detail view with first user
    viewUserDetails(1);
}

/**
 * Updates the user detail view based on selected user ID
 * @param {number} userId - The ID of the user to display
 */
export function viewUserDetails(userId) {
    const user = USERS.find(u => u.id === userId);
    if (!user) return;
    
    // Update user details display
    const elements = {
        userName: document.getElementById("detail-user-name"),
        userEmail: document.getElementById("detail-user-email"),
        storageUsed: document.getElementById("detail-storage-used"),
        storageLimit: document.getElementById("detail-storage-limit"),
        usagePercent: document.getElementById("detail-usage-percent"),
        lastActive: document.getElementById("detail-last-active"),
        circleProgress: document.querySelector(".circular-progress .progress"),
        percentageText: document.querySelector(".circular-progress .percentage")
    };
    
    if (elements.userName) elements.userName.textContent = user.name;
    if (elements.userEmail) elements.userEmail.textContent = user.email;
    if (elements.storageUsed) elements.storageUsed.textContent = `${user.storageUsed} GB`;
    if (elements.storageLimit) elements.storageLimit.textContent = `${user.storageLimit} GB`;
    if (elements.usagePercent) elements.usagePercent.textContent = `${((user.storageUsed / user.storageLimit) * 100).toFixed(1)}%`;
    if (elements.lastActive) elements.lastActive.textContent = user.lastActive;
    
    // Update circular progress if it exists
    if (elements.circleProgress && elements.percentageText) {
        const percentage = (user.storageUsed / user.storageLimit) * 100;
        const radius = elements.circleProgress.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        
        elements.circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
        elements.circleProgress.style.strokeDashoffset = circumference - (percentage / 100) * circumference;
        elements.percentageText.textContent = `${percentage.toFixed(0)}%`;
    }
    
    // Update row highlighting
    document.querySelectorAll("#user-table-body tr").forEach(row => {
        row.classList.remove("selected");
    });
    
    document.querySelectorAll(`#user-table-body tr`).forEach(row => {
        if (parseInt(row.dataset.userId) === userId) {
            row.classList.add("selected");
        }
    });
}

// Export additional utility functions if needed