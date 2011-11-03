// create one global object 'App'
App = (function() {
  // private variables
  var appVersion = "0.0.0";

  // public functions
  return {
    // initialize the app
    init: function() {
      console.log('init version ' + appVersion);
    }
  }
})();

// execute init function after DOM has loaded
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', App.init, false);
} else {
  console.log('failed to register init event');
}
