 //select everything
        //select todo-form
        const todoForm = document.querySelector('.todo-form');

        //selct the input box
        const todoInput = document.querySelector('.todo-input');

        //select the ul todo-items
        const todoItemsList = document.querySelector('.todo-items');

        //array which store every todos
        let todos = [];

        //add an eventListener on form
        todoForm.addEventListener('submit', function (event) {
            //Prevent the page form reloading when submitting the form
            event.preventDefault();
            addTodo(todoInput.value); //call addtodo function with input box current value
        });

        //function to add todo
        function addTodo(item) {
            //if item is not empty
            if (item !== '') {
                //make a todo obj, which has id, name, and completed properties
                const todo = {
                    id: Date.now(),
                    name: item,
                    completed: false
                };

                //then add it to todos array
                todos.push(todo);
                addToLocalStorage(todos); //then store it in localStorage

                //finally clear the input box value
                todoInput.value = '';

            }
        }

        //function to render given todos to scren
        function renderTodos(todos) {
            //clear everything inside ul with class='todo-items'
            todoItemsList.innerHTML = '';

            //run through each item inside todos
            todos.forEach(function (item) {
                //check if the item is completed
                const checked = item.completed ? 'checked' : null;

                //make a li element fill in it
                //<li> <li>

                const li = document.createElement('li');
                //<li class = 'item> </li>

                li.setAttribute('class', 'item');
                li.setAttribute('data-key', item.id);

                //if item is completed, then add a class to li called 'checked', which will add line-through style
                if (item.completed == true) {
                    li.classList.add('checked');
                }

                li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button"> X </button>`;


                //finally add the li into ul
                todoItemsList.append(li);
            });
        }

        //function to add todos to local storage
        function addToLocalStorage(todos) {
            //convert the array to string then store ot
            localStorage.setItem('todos', JSON.stringify(todos));
            //render them to screen
            renderTodos(todos);
        }

        //function helps to get everything form local storage

        function getFormLocalStorage() {
            const reference = localStorage.getItem('todos');
            //if refernce exists

            if (reference) {
                //converts back to array and store it in todos array
                todos = JSON.parse(reference);
                renderTodos(todos);

            }
        }

        //toggle the value to completed or not complted

        function toggle(id) {
            todos.forEach(function (item) {
                if (item.id == id) {
                    item.completed = !item.completed;
                }
            });

            addToLocalStorage(todos);
        }


        //delets a todo form todos array, then updates localStorage and renders update list to screen
        function deleteTodo(id) {
            //filters out the li with the id and update the todos array
            todos = todos.filter(function (item) {
                return item.id != id;
            });


            //update the localstorage
            addToLocalStorage(todos);
        }

        //initial get everything form localStorage
        getFormLocalStorage();

        //after that addEventListenner ul with class=todoItems.

        todoItemsList.addEventListener('click', function (event) {
            //click if the event is on checkbox
            if (event.target.type === 'checkbox') {
                //toggle the state
                toggle(event.target.parentElement.getAttribute('data-key'));
            }

            //check if that is a delete-button
            if (event.target.classList.contains('delete-button')) {
                deleteTodo(event.target.parentElement.getAttribute('data-key'));
            }
        });