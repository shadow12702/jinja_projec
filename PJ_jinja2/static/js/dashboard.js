(function() {
    // Constants and mock data
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
        {
            id: 2,
            name: "User2",
            email: "user2@gmail.com",
            phone: "234-567-8901",
            status: "active",
            storageUsed: 5.2,
            storageLimit: 10,
            lastActive: "2025-03-15",
        },
        {
            id: 3,
            name: "User3",
            email: "user3@gmail.com",
            phone: "345-678-9012",
            status: "inactive",
            storageUsed: 2.5,
            storageLimit: 5,
            lastActive: "2025-03-01",
        },
        {
            id: 4,
            name: "User4",
            email: "user4@gmail.com",
            phone: "456-789-0123",
            status: "active",
            storageUsed: 4.7,
            storageLimit: 10,
            lastActive: "2025-03-12",
        },
        {
            id: 5,
            name: "User5",
            email: "user5@gmail.com",
            phone: "567-890-1234",
            status: "active",
            storageUsed: 9.1,
            storageLimit: 10,
            lastActive: "2025-03-15",
        },
    ];

    // Functions
    function calculateStorageStats() {
        const totalUsers = USERS.length;
        const activeUsers = USERS.filter(user => user.status === "active").length;
        const totalStorage = USERS.reduce((sum, user) => sum + user.storageUsed, 0).toFixed(1);
        const averageUsage = (USERS.reduce(
            (sum, user) => sum + (user.storageUsed / user.storageLimit) * 100, 0
        ) / USERS.length).toFixed(1);

        return { totalUsers, activeUsers, totalStorage, averageUsage };
    }

    function updateDashboard() {
        const stats = calculateStorageStats();
        
        // Update stats display
        document.getElementById("total-users").textContent = stats.totalUsers;
        document.getElementById("active-users").textContent = stats.activeUsers;
        document.getElementById("total-storage").textContent = `${stats.totalStorage} GB`;
        document.getElementById("average-usage").textContent = `${stats.averageUsage}%`;

        // Populate user table
        const tableBody = document.getElementById("user-table-body");
        if (!tableBody) return;
        
        tableBody.innerHTML = "";
        
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
            
            tableBody.appendChild(row);
        });
        
        // Add event listeners to view buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = parseInt(btn.dataset.userId);
                viewUserDetails(userId);
            });
        });

        // Set initial user details
        viewUserDetails(1);
    }

    function viewUserDetails(userId) {
        const user = USERS.find(u => u.id === userId);
        if (!user) return;

        // Elements
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

        // Update user details
        if (elements.userName) elements.userName.textContent = user.name;
        if (elements.userEmail) elements.userEmail.textContent = user.email;
        if (elements.storageUsed) elements.storageUsed.textContent = `${user.storageUsed} GB`;
        if (elements.storageLimit) elements.storageLimit.textContent = `${user.storageLimit} GB`;
        if (elements.usagePercent) elements.usagePercent.textContent = 
            `${((user.storageUsed / user.storageLimit) * 100).toFixed(1)}%`;
        if (elements.lastActive) elements.lastActive.textContent = user.lastActive;

        // Update circular progress if elements exist
        if (elements.circleProgress && elements.percentageText) {
            const percentage = (user.storageUsed / user.storageLimit) * 100;
            const radius = elements.circleProgress.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;

            elements.circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
            elements.circleProgress.style.strokeDashoffset = 
                circumference - (percentage / 100) * circumference;
            elements.percentageText.textContent = `${percentage.toFixed(0)}%`;
        }

        // Update row highlighting
        document.querySelectorAll("#user-table-body tr").forEach(row => {
            row.classList.remove("selected");
        });

        document.querySelectorAll("#user-table-body tr").forEach(row => {
            if (parseInt(row.dataset.userId) === userId) {
                row.classList.add("selected");
            }
        });
    }

    // Handle flash message close buttons
    function setupFlashMessages() {
        document.querySelectorAll('.flash-message .close-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.parentElement.style.display = 'none';
            });
        });
    }

    // Initialize
    function init() {
        updateDashboard();
        setupFlashMessages();
    }

    // Run when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();