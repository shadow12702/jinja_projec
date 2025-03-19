// import { setupMenuHighlighting,updateDashboard } from "./test.js";

// window.onload = function () {
// 	// Add active class handler for menu items
// 	setupMenuHighlighting();
// 	console.log("JavaScript đang chạy!");

// 	// Initialize dashboard data
// 	updateDashboard();

// };
function createDropdownToggle(headerId, dropdownId, chevronId, itemId) {
	const header = document.getElementById(headerId);
	const dropdown = document.getElementById(dropdownId);
	const chevron = document.getElementById(chevronId);
	const item = document.getElementById(itemId);

	header.addEventListener("click", function () {
		dropdown.classList.toggle("show");
		chevron.classList.toggle("up");
		chevron.classList.toggle("right");
		item.classList.toggle("active");
	});
}

createDropdownToggle(
	"analyticHeader",
	"analyticDropdown",
	"analyticChevron",
	"analyticItem"
);
createDropdownToggle("sqlHeader", "sqlDropdown", "sqlChevron", "sqlItem");

createDropdownToggle(
	"orderHeader",
	"orderDropdown",
	"orderChevron",
	"orderItem"
);
createDropdownToggle("userHeader", "userDropdown", "userChevron", "userItem");

createDropdownToggle("blogHeader", "blogDropdown", "blogChevron", "blogItem");

// Xử lý sự kiện cho các mục dropdown
const dropdownItems = document.querySelectorAll(".dropdown-item");
dropdownItems.forEach((item) => {
	item.addEventListener("click", function (e) {
		e.stopPropagation(); // Ngăn sự kiện lan lên phần tử cha

		// Bỏ highlight các mục cũ (nếu cần)
		dropdownItems.forEach((i) => i.classList.remove("selected"));

		// Highlight mục được chọn
		this.classList.add("selected");

		// Hiển thị nội dung tương ứng hoặc điều hướng
		// const menuTitle =
		// 	this.closest(".menu-item").querySelector(".menu-title").innerText;
		// const itemText = this.innerText;
		// console.log(`${menuTitle} > ${itemText} selected`);

		// Có thể thêm code để hiển thị nội dung tương ứng ở đây
		// 			document.querySelector(".content-area").innerHTML = `
		// <h2>${menuTitle} > ${itemText}</h2>
		// <p>Nội dung cho ${itemText} sẽ hiển thị ở đây.</p>
		// `;
	});
});

///////////////////////////////////////////////////////////////////////////////////////
        // Lấy các phần tử cần thiết
        const firstDropdown = document.getElementById('firstDropdown');
        const secondDropdown = document.getElementById('secondDropdown');
        const secondSelect = document.getElementById('secondSelect');
        const clearButton = document.getElementById('clearButton');
        const okButton = document.getElementById('okButton');
        const selectionResult = document.getElementById('selectionResult');
        const errorMessage = document.getElementById('errorMessage');
        
        // Thêm sự kiện change cho dropdown đầu tiên
        firstDropdown.addEventListener('change', function() {
            // Kiểm tra xem đã chọn một giá trị chưa
            if (this.value) {
                // Hiển thị dropdown thứ hai nếu đã chọn
                secondDropdown.style.display = 'block';
                // Hiển thị giá trị đã chọn
                updateSelectionDisplay();
                // Kiểm tra và cập nhật hiển thị nút OK
                checkRequiredSelections();
            } else {
                // Ẩn dropdown thứ hai nếu chưa chọn
                secondDropdown.style.display = 'none';
                selectionResult.textContent = '';
                okButton.style.display = 'none';
            }
        });
        
        // Thêm sự kiện change cho dropdown thứ hai
        secondSelect.addEventListener('change', function() {
            updateSelectionDisplay();
            // Kiểm tra và cập nhật hiển thị nút OK
            checkRequiredSelections();
        });
        
        // Thêm sự kiện click cho nút Clear
        clearButton.addEventListener('click', function() {
            // Reset cả hai dropdown
            firstDropdown.selectedIndex = 0;
            secondSelect.selectedIndex = 0;
            
            // Ẩn dropdown thứ hai và nút OK
            secondDropdown.style.display = 'none';
            okButton.style.display = 'none';
            
            // Ẩn thông báo lỗi
            errorMessage.style.display = 'none';
            
            // Xóa hiển thị kết quả
            selectionResult.textContent = '';
        });
        
        // Thêm sự kiện click cho nút OK
        okButton.addEventListener('click', function() {
            // Kiểm tra xem đã chọn đúng tùy chọn chưa
            if (firstDropdown.value === 'option1' && secondSelect.value === 'suboption1') {
                // Chuyển hướng đến trang khác
                window.location.href = 'success-page.html';
            } else {
                // Hiển thị thông báo lỗi
                errorMessage.style.display = 'block';
            }
        });
        
        // Hàm cập nhật hiển thị kết quả lựa chọn
        function updateSelectionDisplay() {
            let result = `Đã chọn: ${firstDropdown.options[firstDropdown.selectedIndex].text}`;
            
            if (secondSelect.selectedIndex > 0) {
                result += ` > ${secondSelect.options[secondSelect.selectedIndex].text}`;
            }
            
            selectionResult.textContent = result;
        }
        
        // Hàm kiểm tra xem đã chọn đủ tùy chọn chưa để hiển thị nút OK
        function checkRequiredSelections() {
            // Hiển thị nút OK nếu đã chọn cả hai dropdown
            if (firstDropdown.value && secondSelect.value) {
                okButton.style.display = 'block';
                
                // Kiểm tra và hiển thị thông báo lỗi nếu cần
                // if (okButton.clicked && !(firstDropdown.value === 'option1' && secondSelect.value === 'suboption1')) {
                //     errorMessage.style.display = 'block';
                // } else {
                //     errorMessage.style.display = 'none';
                // }
            } else {
                okButton.style.display = 'none';
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