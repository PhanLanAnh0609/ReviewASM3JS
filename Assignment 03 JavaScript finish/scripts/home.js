'use strict'

// Khai báo các phần tử giao diện
const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');

// khai báo nút logout
const btnLogout = document.getElementById('btn-logout');

// thay đổi giao diện trang home
if(!currentUser) {
    // ẩn giao diện đăng nhập thành công
    mainContent.style.display = 'none';
} else {
    // ẩn giao diện trước khi đăng nhập
    loginModal.style.display = 'none';
    // hiển thị lời chào sau khi đăng nhập thành công
    welcomeMessage.textContent = `Welcom ${currentUser.firstName}`
}


// Tạo sự kiện diễn ra khi nhấn nút Logout
btnLogout.addEventListener('click', function() {
    // xóa currentUser trong localStorage
    localStorage.removeItem('currentUser');
    // chuyển hướng trang đến trang đăng nhập
    window.location.href = '../pages/login.html';
})
