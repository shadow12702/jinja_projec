(function () {
	// Set up sidebar toggle
	function setupSidebar() {
		const sidebar = document.getElementById("sidebar");
		const sidebarToggle = document.getElementById("sidebarToggle");
		const toggleIcon = document.getElementById("toggleIcon");

		// Load saved state
		const sidebarCollapsed =
			localStorage.getItem("sidebarCollapsed") === "true";
		if (sidebarCollapsed) {
			sidebar.classList.add("collapsed");
			toggleIcon.classList.remove("ri-menu-fold-line");
			toggleIcon.classList.add("ri-menu-unfold-line");
		}

		// Toggle sidebar
		if (sidebarToggle) {
			sidebarToggle.addEventListener("click", function () {
				sidebar.classList.toggle("collapsed");

				// Toggle icon
				if (sidebar.classList.contains("collapsed")) {
					toggleIcon.classList.remove("ri-menu-fold-line");
					toggleIcon.classList.add("ri-menu-unfold-line");
				} else {
					toggleIcon.classList.remove("ri-menu-unfold-line");
					toggleIcon.classList.add("ri-menu-fold-line");
				}

				localStorage.setItem(
					"sidebarCollapsed",
					sidebar.classList.contains("collapsed")
				);
			});
		}
	}

	// Set up dropdown menus
	function setupDropdowns() {
		const dropdownItems = [
			{
				header: "userHeader",
				dropdown: "userDropdown",
				chevron: "userChevron",
			},
			{
				header: "blogHeader",
				dropdown: "blogDropdown",
				chevron: "blogChevron",
			},
			{
				header: "analyticHeader",
				dropdown: "analyticDropdown",
				chevron: "analyticChevron",
			},
			{ header: "sqlHeader", dropdown: "sqlDropdown", chevron: "sqlChevron" },
			{
				header: "orderHeader",
				dropdown: "orderDropdown",
				chevron: "orderChevron",
			},
		];

		dropdownItems.forEach((item) => {
			const header = document.getElementById(item.header);
			const dropdown = document.getElementById(item.dropdown);
			const chevron = document.getElementById(item.chevron);

			if (header && dropdown && chevron) {
				header.addEventListener("click", function (e) {
					// Prevent click from propagating to parent links
					e.preventDefault();

					// Toggle this dropdown
					dropdown.classList.toggle("show");
					chevron.classList.toggle("up");

					// Close other dropdowns
					dropdownItems.forEach((otherItem) => {
						if (otherItem.dropdown !== item.dropdown) {
							const otherDropdown = document.getElementById(otherItem.dropdown);
							const otherChevron = document.getElementById(otherItem.chevron);
							if (otherDropdown && otherChevron) {
								otherDropdown.classList.remove("show");
								otherChevron.classList.remove("up");
							}
						}
					});
				});
			}
		});

		// Close dropdowns when clicking outside
		document.addEventListener("click", function (e) {
			if (!e.target.closest(".menu-item")) {
				dropdownItems.forEach((item) => {
					const dropdown = document.getElementById(item.dropdown);
					const chevron = document.getElementById(item.chevron);
					if (dropdown && chevron) {
						dropdown.classList.remove("show");
						chevron.classList.remove("up");
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
		document.querySelectorAll(".flash-message .close-btn").forEach((btn) => {
			btn.addEventListener("click", function () {
				this.parentElement.style.display = "none";
			});
		});
	}

	// Run when DOM is loaded
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();

///////////////////////////////////////////////////////////////////////////////////////
// Lấy các phần tử cần thiết
const firstDropdown = document.getElementById("firstDropdown");
const secondDropdown = document.getElementById("secondDropdown");
const secondSelect = document.getElementById("secondSelect");
const clearButton = document.getElementById("clearButton");
const okButton = document.getElementById("okButton");
const selectionResult = document.getElementById("selectionResult");
const errorMessage = document.getElementById("errorMessage");

// Thêm sự kiện change cho dropdown đầu tiên
firstDropdown.addEventListener("change", function () {
	// Kiểm tra xem đã chọn một giá trị chưa
	if (this.value) {
		// Hiển thị dropdown thứ hai nếu đã chọn
		secondDropdown.style.display = "block";
		// Hiển thị giá trị đã chọn
		updateSelectionDisplay();
		// Kiểm tra và cập nhật hiển thị nút OK
		checkRequiredSelections();
	} else {
		// Ẩn dropdown thứ hai nếu chưa chọn
		secondDropdown.style.display = "none";
		selectionResult.textContent = "";
		okButton.style.display = "none";
	}
});

// Thêm sự kiện change cho dropdown thứ hai
secondSelect.addEventListener("change", function () {
	updateSelectionDisplay();
	// Kiểm tra và cập nhật hiển thị nút OK
	checkRequiredSelections();
});

// Thêm sự kiện click cho nút Clear
clearButton.addEventListener("click", function () {
	// Reset cả hai dropdown
	firstDropdown.selectedIndex = 0;
	secondSelect.selectedIndex = 0;

	// Ẩn dropdown thứ hai và nút OK
	secondDropdown.style.display = "none";
	okButton.style.display = "none";

	// Ẩn thông báo lỗi
	errorMessage.style.display = "none";

	// Xóa hiển thị kết quả
	selectionResult.textContent = "";
});

// Thêm sự kiện click cho nút OK
okButton.addEventListener("click", function () {
	// Kiểm tra xem đã chọn đúng tùy chọn chưa
	if (
		firstDropdown.value === "option1" &&
		secondSelect.value === "suboption1"
	) {
		// Chuyển hướng đến trang khác
		window.location.href = "/dashboard";
	} else {
		// Hiển thị thông báo lỗi
		errorMessage.style.display = "block";
	}
});

// Hàm cập nhật hiển thị kết quả lựa chọn
function updateSelectionDisplay() {
	let result = `Đã chọn: ${
		firstDropdown.options[firstDropdown.selectedIndex].text
	}`;

	if (secondSelect.selectedIndex > 0) {
		result += ` > ${secondSelect.options[secondSelect.selectedIndex].text}`;
	}

	selectionResult.textContent = result;
}

// Hàm kiểm tra xem đã chọn đủ tùy chọn chưa để hiển thị nút OK
function checkRequiredSelections() {
	// Hiển thị nút OK nếu đã chọn cả hai dropdown
	if (firstDropdown.value && secondSelect.value) {
		okButton.style.display = "block";

		// Kiểm tra và hiển thị thông báo lỗi nếu cần
		// if (okButton.clicked && !(firstDropdown.value === 'option1' && secondSelect.value === 'suboption1')) {
		//     errorMessage.style.display = 'block';
		// } else {
		//     errorMessage.style.display = 'none';
		// }
	} else {
		okButton.style.display = "none";
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// Lấy phần tử
const showBox = document.getElementById("showBox");
const overlay = document.getElementById("overlay");
const closeBox = document.getElementById("closeBox");
// Khi nhấn nút, hiển thị hộp

showBox.addEventListener("click", () => {
	overlay.style.display = "flex";
});

// Khi nhấn nút đóng, ẩn hộp
closeBox.addEventListener("click", () => {
	overlay.style.display = "none";
});

// Khi nhấn ra ngoài hộp cũng ẩn
overlay.addEventListener("click", (e) => {
	if (e.target === overlay) {
		overlay.style.display = "none";
	}
});
