function ready() {
    document.querySelectorAll('[todo]').forEach(function (child) {
        var todoInput = child.querySelectorAll('[todo-input]')[0];

        var todoList = child.querySelectorAll('[todo-list]')[0];
        if (!todoList) {
            var newTodoList = document.createElement('ol');
            newTodoList.classList.add('list');
            newTodoList.setAttribute('todo-list', null)
            insertAfter(newTodoList, todoInput);
            todoList = child.querySelectorAll('[todo-list]')[0];
        }

        var onAdd = function (item) {
            var todoList = child.querySelectorAll('[todo-list]')[0];
            var newTodo = document.createElement('li');
            if (item.data.color) {
                newTodo.style.color = item.data.color;
            }
            var newTodoName = document.createElement('label');
            newTodoName.innerHTML = item.data.name;
            newTodo.appendChild(newTodoName);
            var newTodoDeleteButton = document.createElement('button');
            newTodoDeleteButton.setAttribute('todo-delete', item.id);
            newTodoDeleteButton.classList.add('boxclose');
            newTodo.appendChild(newTodoDeleteButton);
            todoList.appendChild(newTodo);
        }

        var onDelete = function (id) {
            child.querySelectorAll('[todo-delete="' + id + '"]')[0].parentElement.remove();
        }

        var todo = new Todo(onAdd, onDelete);

        function createTodo(event) {
            event.preventDefault();
            var form = this;
            var name = form.elements['name'].value;
            var color = form.elements['color'].value;
            if (!name) return;
            todo.insertUpdateTodo({
                name: name,
                color: color
            });
        }

        function deleteTodo(event) {
            if (event.target.getAttribute('todo-delete')) {
                todo.removeTodo(event.target.getAttribute('todo-delete'))
            }
        }

        todoInput.addEventListener('submit', createTodo, false);
        todoList.addEventListener("click", deleteTodo, false);
    });
}

function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

document.addEventListener('DOMContentLoaded', ready);