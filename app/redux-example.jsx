var redux = require('redux');

console.log('Starting redux example');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

//subscribe to changes
var unsubscribe = store.subscribe( () => {
  var state = store.getState();
  console.log("new state", state);

  if (state.map.isFetching){
    document.getElementById('app').innerHTML = "...Loading";
  }else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a target="_blank" href="'+state.map.url+'">View your location</a>';
  };
});

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch(actions.fetchLocation());


store.dispatch(actions.changeName('Emile'));

store.dispatch(actions.addHobby("Running"));
store.dispatch(actions.addHobby("Walking"));

store.dispatch(actions.removeHobby(2));

store.dispatch(actions.addMovie("Movie A", "Genre A"));
store.dispatch(actions.addMovie("Movie B", "Genre B"));

store.dispatch(actions.removeMovie(1));

store.dispatch(actions.changeName('Emilio'));
