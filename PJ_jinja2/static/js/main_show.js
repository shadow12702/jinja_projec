(function() {
    // Set up sidebar toggle
    function setupSidebar() {
		const sidebar = document.getElementById('sidebar');
		const sidebarToggle = document.getElementById('sidebarToggle');
		const toggleIcon = document.getElementById('toggleIcon');
		
		// Load saved state
		const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
		if (sidebarCollapsed) {
			sidebar.classList.add('collapsed');
			toggleIcon.classList.remove('ri-menu-fold-line');
			toggleIcon.classList.add('ri-menu-unfold-line');
		}
		
		// Toggle sidebar
		if (sidebarToggle) {
			sidebarToggle.addEventListener('click', function() {
				sidebar.classList.toggle('collapsed');
				
				// Toggle icon
				if (sidebar.classList.contains('collapsed')) {
					toggleIcon.classList.remove('ri-menu-fold-line');
					toggleIcon.classList.add('ri-menu-unfold-line');
				} else {
					toggleIcon.classList.remove('ri-menu-unfold-line');
					toggleIcon.classList.add('ri-menu-fold-line');
				}
				
				localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
			});
		}
	}
    
    // Set up dropdown menus
    function setupDropdowns() {
        const dropdownItems = [
            { header: 'userHeader', dropdown: 'userDropdown', chevron: 'userChevron' },
            { header: 'blogHeader', dropdown: 'blogDropdown', chevron: 'blogChevron' },
            { header: 'analyticHeader', dropdown: 'analyticDropdown', chevron: 'analyticChevron' },
            { header: 'sqlHeader', dropdown: 'sqlDropdown', chevron: 'sqlChevron' },
            { header: 'orderHeader', dropdown: 'orderDropdown', chevron: 'orderChevron' }
        ];
        
        dropdownItems.forEach(item => {
            const header = document.getElementById(item.header);
            const dropdown = document.getElementById(item.dropdown);
            const chevron = document.getElementById(item.chevron);
            
            if (header && dropdown && chevron) {
                header.addEventListener('click', function(e) {
                    // Prevent click from propagating to parent links
                    e.preventDefault();
                    
                    // Toggle this dropdown
                    dropdown.classList.toggle('show');
                    chevron.classList.toggle('up');
                    
                    // Close other dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem.dropdown !== item.dropdown) {
                            const otherDropdown = document.getElementById(otherItem.dropdown);
                            const otherChevron = document.getElementById(otherItem.chevron);
                            if (otherDropdown && otherChevron) {
                                otherDropdown.classList.remove('show');
                                otherChevron.classList.remove('up');
                            }
                        }
                    });
                });
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.menu-item')) {
                dropdownItems.forEach(item => {
                    const dropdown = document.getElementById(item.dropdown);
                    const chevron = document.getElementById(item.chevron);
                    if (dropdown && chevron) {
                        dropdown.classList.remove('show');
                        chevron.classList.remove('up');
                    }
                });
            }
        });
    }
    
    // Initialize everything when DOM is ready
    function init() {
        setupSidebar();
        setupDropdowns();
        
        // Close flash messages
        document.querySelectorAll('.flash-message .close-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.parentElement.style.display = 'none';
            });
        });
    }
    
    // Run when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();