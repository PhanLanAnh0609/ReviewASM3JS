'use strict'

//khai báo các trường dữ liệu
const firstNameInput = document.getElementById('input-firstname');
const lastNameInput = document.getElementById('input-lastname');
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const passwordConfirmInput = document.getElementById('input-password-confirm');

// khai báo nút register
const btnRegister = document.getElementById('btn-submit');

// hàm kiểm tra dữ liệu nhập vào của người dùng
const validate = function(data, passwordConfirmInput) {
    // kiểm tra việc bỏ trống trường dữ liệu
    if(!data.firstName || !data.lastName || !data.username || !data.password || !passwordConfirmInput.value) {
        alert(`Vui lòng nhập đầy đủ các thông tin cần thiết!`);
        return false;
    };

    // tìm người dùng đã sử dụng tên đăng nhập được nhập
    const user = userArr.find((e) => e.username === data.username);
    // kiểm tra việc trùng username
    if(user) {
        alert(`Tên đăng nhập đã tồn tại. Vui lòng dùng tên đăng nhập khác!`);
        return false;
    }

    // kiểm tra việc password và password confirm phải giống nhau
    if(data.password !== passwordConfirmInput.value) {
        alert(`Mật khẩu xác nhận phải trùng với mật khẩu`);
        return false;
    };

    // trả về việc dữ liệu đã đạt đầy đủ yêu cầu
    return true;
};

// kiểm tra độ dài mật khẩu phải nhiều hơn 8 ký tự
passwordInput.addEventListener('blur', function() {
    if(passwordInput.value.length <= 8) {
        alert(`Mật khẩu phải có nhiều hơn 8 ký tự!`)
    };
});

// Tạo sự kiện diễn ra khi nhấn nút register
btnRegister.addEventListener('click', function() {
    // lấy dữ liệu vừa nhập vào
    const dataInput = new User(
        firstNameInput.value,
        lastNameInput.value,
        usernameInput.value,
        passwordInput.value
    );
    // kiểm tra điều kiện
    if(validate(dataInput, passwordConfirmInput)) {
        //thêm dữ liệu người dùng vào trong danh sách người dùng
        userArr.push(dataInput);
        // lưu danh sách người dùng vào localStorage
        saveToStorage('userArr', userArr);
        alert(`Tạo người dùng thành công`);
        // chuyển hướng đến trang login
        window.location.href = '../pages/login.html';
    }
})