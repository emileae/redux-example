var redux = require('redux');

console.log('Starting redux example');

var reducer = (state = {name: 'Anonymous'}, action) => {
  console.log('New action', action);
  switch (action.type){
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    default:
      return state
  };
};

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

//subscribe to changes
var unsubscribe = store.subscribe( () => {
  var state = store.getState();
  console.log('name is: ', state.name);
});

var currentState = store.getState();
console.log('currentState', currentState);


store.dispatch({
  type: "CHANGE_NAME",
  name: 'Emile'
});

unsubscribe();

store.dispatch({
  type: "CHANGE_NAME",
  name: "Emilio"
});
