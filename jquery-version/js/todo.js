var todoApp = (function () {
    var todos = [];

    function init() {
        initTodos();
            $('[todo]').on('click', '[todo-delete]', function () {
                var containerId = $(this).closest('[todo]').attr('todo');
                todos[containerId].remove($(this).attr('todo-delete'));
            });

            $('[todo-input]').submit(function (event) {
                event.preventDefault();
                var values = {};
                $.each($(this).serializeArray(), function (i, field) {
                    values[field.name] = field.value;
                });
                if (!values.name) return;
                var containerId = $(this).closest('[todo]').attr('todo');
                todos[containerId].insert(values);
            });
    }

    function initTodos() {
        $('[todo]').each(function () {
            var todoInput = $(this).find('[todo-input]');
            var todoList = $(this).find('[todo-list]');
            if (todoList) {
                todoList = $('<ol />', { 'class': 'list-group' }).attr('todo-list', '');
                todoInput.after(todoList);
            }
            var containerId = $(this).attr('todo');
            todos[containerId] = new TodoContainer(containerId, onAdd, onDelete);
            todos[containerId].init();
        });
    }

    function onAdd(containerId, item) {
        var todoList = $('[todo = "' + containerId + '"]').find('[todo-list]')
        var newTodo = $('<li />', { 'class': 'list-group-item' });
        todoList.append(newTodo);
        if (item.data.color) {
            newTodo.css('color', item.data.color);
        }
        var newTodoName = $('<label />', {
            text: item.data.name
        });
        newTodo.append(newTodoName);

        var newTodoDeleteButton = newTodo.append($('<button />', {
            'class': 'boxclose'
        }).attr('todo-delete', item.id));
    }

    function onDelete(containerId, id) {
        var todoList = $('[todo = "' + containerId + '"]').find('[todo-list]')
        todoList.find('[todo-delete="' + id + '"]').parent().remove();
    }

    return {
        init: init,
    };
})();
