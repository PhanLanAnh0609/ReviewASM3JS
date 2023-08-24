'use strict';
// khai báo trường thông tin
const pageSizeInput = document.getElementById('input-page-size');
const categoryInput = document.getElementById('input-category');

// khai báo nút Save Setting
const btnSubmit = document.getElementById('btn-submit');

// Kiểm tra đăng nhập người dùng
if(!currentUser) {
    alert(`Vui lòng đăng nhập`);
    // chuyển hướng đến trang đăng nhập
    window.location.href = '../pages/login.html';
};

// hiển thị thông tin của người dùng trước khi thay đổi
pageSizeInput.value = currentUser.pageSize;
categoryInput.value = currentUser.category;

// tạo sự kiện khi nhấn nút Save Setting
btnSubmit.addEventListener('click', function() {
    // Kiểm tra số lượng bài viết trong 1 trang
    if(pageSizeInput.value === '' || Number(pageSizeInput.value) === 0) {
        alert(`Số bài viết trong trang phải lớn hơn 0`);
    } else {
        // thay đổi giá trị của người dùng
        currentUser.pageSize = Number(pageSizeInput.value);
        currentUser.category = categoryInput.value;
        // lưu thay đổi của người dùng
        saveToStorage('currentUser', currentUser);
        // chuyển hướng đến trang tin tức
        window.location.href = '../pages/news.html';
    }
})
