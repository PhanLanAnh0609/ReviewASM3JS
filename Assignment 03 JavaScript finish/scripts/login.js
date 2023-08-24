'use strict'

// khai báo các trường thông tin
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');

// khai báo nút login
const btnLogin = document.getElementById('btn-submit');

// kiểm tra thông tin nhập vào theo yêu cầu
const validate = function() {
    // kiểm tra đã nhập đầy đủ thông tin
    if(!usernameInput.value || !passwordInput.value) {
        alert(`Vui lòng nhập đầy đủ tên người dùng và mật khẩu`);
        return false;
    };
    return true;
}

// tạo sự kiện diễn ra sau khi nhấn nút đăng nhập
btnLogin.addEventListener('click', function() {
    // kiểm tra thỏa mãn yêu cầu
    if(validate()) {
        // lấy ra người dùng có theo tên đăng nhập
        const user = userArr.find((e) => e.username === usernameInput.value);
        // kiểm tra mật khẩu đã nhập đúng chưa
        if(user?.password === passwordInput.value) {
            // lưu dữ liệu người dùng vào currentUser trong localStorage
            saveToStorage('currentUser',user);
            alert(`Bạn đã đăng nhập thành công!`);
            // chuyển hướng đến trang home
            window.location.href = '../index.html';
        } else {
            alert(`Tên người dùng hoặc mật khẩu không đúng`)
        };
    };
})