function Todo(todoAdd, todoDelete, todoUpdate, todoId) {
    this._todoList = [];
    this._counter = 0;

    this.todoId = todoId;
    this.todoAdd = todoAdd || function () { };
    this.todoDelete = todoDelete || function () { };
    this.todoUpdate = todoUpdate || function () { };
}

Todo.prototype.insertUpdateTodo = function (data) {
    var object = {};
    this._counter++;
    object.id = this._counter;
    object.data = data;
    this._todoList.push(object);
    this.todoAdd(object);
    this.todoListChange(this._todoList);
}

Todo.prototype.removeTodo = function (id) {
    var index = getIndexById.call(this, id);
    if (index > -1) {
        this._todoList.splice(index, 1);
    }

    this.todoDelete(id);
    this.todoListChange(this._todoList);
}

var getIndexById = function (id) {
    var ids = this._todoList.map(function (item) {
        return item.id;
    });

    return ids.indexOf(+id);
}