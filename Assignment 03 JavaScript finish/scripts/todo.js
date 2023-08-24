'use strict'
const inputTask = document.getElementById('input-task');
const btnAdd = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

// hàm hiển thị danh sách công việc
const renderTask = function() {
    //kiểm tra đăng nhập
    if(!currentUser) {
        alert('Bạn chưa đăng nhập. Vui lòng đăng nhập!');
        // chuyển hướng đến trang đăng nhập
        window.location.href = '../pages/login.html'
    } else {
        // lọc ra danh sách task của người dùng
        const taskArr = todoArr.filter((e) => e.owner === currentUser.username);
        // hiển thị danh sách task lên màn hình
        for(let i=0; i<taskArr.length; i++) {
            const html = `<li class="${taskArr[i].isDone === true ? 'checked' : ''}">${taskArr[i].task}<span class="close">×</span></li>`;
            todoList.innerHTML += html;
        };
    };
};

renderTask();

// tạo sự kiện sẽ diễn ra khi nhấn nút add
btnAdd.addEventListener('click', function() {
    // kiểm tra thông tin nhập vào
    if(!inputTask.value.trim()) {
        alert(`Hãy điền tên công việc trước khi thêm!`);
    }else {
        // tạo task mới của người dùng
        const task = new Task(inputTask.value, currentUser.username);
        // lưu task vào danh sách todo
        todoArr.push(task);
        // lưu vào localStorage
        saveToStorage('todoArr', todoArr);
        // xóa phần nhập task
        inputTask.value = '';
        // xóa danh sách task trước đó
        todoList.innerHTML = '';
        // hiển thị ra danh sách task mới được cập nhật
        renderTask();
    };
});

// tạo sự kiện khi thao tác với danh sách task của người dùng
todoList.addEventListener('click', function(item) {
    // kiểm tra nhấn vào task
    if(item.target.localName === 'li') {
    // thay đổi giao diện task khi nhấp vào task
    item.target.classList.toggle('checked');
    // lấy ra dữ liệu của công việc đang xử lý từ danh sách task trong localStorage
    const taskClicked = todoArr.find(e => e.task === item.target.firstChild.data);
    // thay đổi thuộc tính thể hiện việc hoàn thành công việc
    if(taskClicked.isDone) {
        taskClicked.isDone = false;
    } else {
        taskClicked.isDone = true;
    };
    // lưu lại dữ liệu sau thay đổi vào localStorage
    saveToStorage('todoArr', todoArr);
    // nhấn vào dấu x
    } else if(item.target.localName === 'span') {
        // kiểm tra mong muốn xóa
        if(confirm('Bạn chắc chắn muốn xóa công việc này')) {
            // tìm vị trí của task muốn xóa trong danh sách task
            const indexTaskDeleted = todoArr.findIndex(e => e.task === item.target.parentElement.firstChild.data);
            // loại bỏ task muốn xóa ra khỏi danh sách
            todoArr.splice(indexTaskDeleted,1);
            // lưu danh sách sau khi thay đổi vào localStorage
            saveToStorage('todoArr', todoArr);
            // xóa hiển thị của danh sách cũ và hiển thị danh sách sau thay đổi
            todoList.innerHTML = '';
            renderTask();
        };
    };
});
