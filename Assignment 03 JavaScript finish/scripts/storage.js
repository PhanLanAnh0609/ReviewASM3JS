'use strict'

// hàm lưu dữ liệu vào localStorage
const saveToStorage = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

// hàm lấy ra dữ liệu trong localStorage
const getFromStorage = function(key) {
    return localStorage.getItem(key);
};

// tạo danh sách người dùng mẫu
const user1 = new User('Đào', 'An', 'daoan', 'daoan1234');
const user2 = new User('Phan', 'Long', 'phanlong', 'phanlong1234');
const user3 = new User('Nguyễn', 'Dương', 'nguyenduong', 'nguyenduong1234');


// tạo danh sách các task trong todo List
const task1 = new Task('Học bài', 'daoan');
const task2 = new Task('Mua đồ', 'daoan');
const task3 = new Task('Giặt đồ', 'phanlong');

// lưu dữ liệu vào LocalStorage
!getFromStorage("userArr") && saveToStorage("userArr", [user1, user2, user3]);
!getFromStorage("todoArr") && saveToStorage("todoArr", [task1, task2, task3]);

// khai báo các mảng trong localStorage
const userArr = JSON.parse(getFromStorage('userArr'));
const currentUser = JSON.parse(getFromStorage('currentUser'));
const todoArr = JSON.parse(getFromStorage('todoArr'));