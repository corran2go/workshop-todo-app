// create one global object 'App'
App = (function() {
  // private variables
  var appVersion = "0.0.0";
  // array of todos
  var todoList;
  // DOM refs
  var todoListEl;
  var todoEl;

  // show one todo as div
  var showTodo = function(todo) {
    // create a new div element
    var newTodoEl = document.createElement('div');
    // add CCS class
    newTodoEl.setAttribute('class', 'todoListElement');
    // add todo value
    newTodoEl.innerHTML = todo;
    // append div to list
    todoListEl.appendChild(newTodoEl);
  };

  // show all todos
  var showTodoList = function() {
    // clear list
    todoListEl.innerHTML = '';
    // show all array entries
    for (var i=0; i<todoList.length; i++) {
      showTodo(todoList[i]);
    }
  };

  // public functions
  return {
    // initialize the app
    init: function() {
      console.log('init version ' + appVersion);

      // get DOM references
      todoListEl = document.getElementById('todoList');
      todoEl = document.getElementById('todo');

      // load todo list from store
      todoList = [];
      if (localStorage.todoList) {
        // convert PSV to array
        todoList = localStorage.todoList.split('|');
      }

      // show todo list
      showTodoList();
    },

    // add new todo
    addTodo: function() {
      // add textfield value to array
      todoList.push(todoEl.value);
      // store array as PSV
      localStorage.todoList = todoList.join("|");
      // reset textfield
      todoEl.value = '';
      // show updated todo list
      showTodoList();
    }
  }
})();

// execute init function after DOM has loaded
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', App.init, false);
} else {
  console.log('failed to register init event');
}

// ask the user to refresh an updated version of the cached page
if (window.applicationCache) {
  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      window.applicationCache.swapCache();
      if (confirm('A new version of this app is available. Load it?')) {
        window.location.reload();
      }
    }
  }, false);
} else {
  console.log('failed to initialize app cache');
}
