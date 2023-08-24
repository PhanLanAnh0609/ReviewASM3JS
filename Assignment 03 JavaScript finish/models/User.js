'use strict'
// class người dùng
class User {
    constructor(firstName, lastName, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.pageSize = 10;
        this.category = 'business';
    };
    
};

// class công việc trong todo list
class Task {
    constructor(task, owner) {
        this.task = task;
        this.owner = owner;
        this.isDone = false;
    };
};