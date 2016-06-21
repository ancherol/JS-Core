function TodoContainer(todoContainerId, onAdd, onDelete, onUpdate) {
    this._elements = [];
    this._counter = 0;

    this.todoContainerId = todoContainerId;
    this.onAdd = onAdd || function () { };
    this.onDelete = onDelete || function () { };
    this.onUpdate = onUpdate || function () { };
}

TodoContainer.prototype.init = function () {
    var me = this;
    this._elements = JSON.parse(localStorage.getItem(generateLocalStorageKey(this.todoContainerId))) || [];
    this._elements.forEach(function (element) {
        me.onAdd(me.todoContainerId, element);
    });
}

TodoContainer.prototype.insert = function (data, id) {
    var object = {};
    object.id = id || generateItemId.call(this);
    object.data = data;
    this._elements.push(object);
    localStorage.setItem(generateLocalStorageKey(this.todoContainerId), JSON.stringify(this._elements));
    this.onAdd(this.todoContainerId, object);
}

TodoContainer.prototype.update = function (data, id) {
    var index = getIndexById.call(this, id);
    this._elements[index].data = data;
    this.onUpdate(_elements[index]);
}

TodoContainer.prototype.remove = function (id) {
    var index = getIndexById.call(this, id);
    if (index > -1) {
        this._elements.splice(index, 1);
    }

    localStorage.setItem(generateLocalStorageKey(this.todoContainerId), JSON.stringify(this._elements));
    this.onDelete(this.todoContainerId, id);
}

var getIndexById = function (id) {
    var ids = this._elements.map(function (item) {
        return item.id;
    });

    return ids.indexOf(+id);
}

var generateItemId = function () {
    var ids = this._elements.map(function (item) {
        return item.id;
    });
    maxId=Math.max.apply(null, ids);
    if (maxId >= 1) return maxId + 1
    else return 1;
}

var generateLocalStorageKey = function (todoContainerId) {
    return 'todoLocalStarage_' + todoContainerId;
}
