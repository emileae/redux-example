var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
  name: "Anonymous",
  hobbies: [],
  movies: []
}

var nextHobbyId = 1;
var nextMovieId = 1;
// var oldReducer = (state = stateDefault, action) => {
//   console.log('New action', action);
//   switch (action.type){
//     case 'CHANGE_NAME':
//       return {
//         ...state,
//         name: action.name
//       };
//     case 'ADD_HOBBY':
//       return {
//         ...state,
//         hobbies: [
//           ...state.hobbies,
//           {
//             id: nextHobbyId++,
//             hobby: action.hobby
//           }
//         ]
//       };
//     case "REMOVE_HOBBY":
//       return {
//         ...state,
//         hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)//is kept in array if true}),
//       }
//     case 'ADD_MOVIE':
//       return {
//         ...state,
//         movies: [
//           ...state.movies,
//           {
//             id: nextMovieId++,
//             title: action.title,
//             genre: action.genre
//           }
//         ]
//       }
//     case "REMOVE_MOVIE":
//     return {
//       ...state,
//       movies: state.movies.filter((movie) => movie.id !== action.id)
//     }
//     default:
//       return state
//   };
// };

var nameReducer = ( state = "Anonymous", action ) => {
  switch (action.type){
    case "CHANGE_NAME":
      return action.name
    default:
      return state;
  }
};

var hobbiesReducer = (state = [], action) => {
  switch(action.type){
    case "ADD_HOBBY":
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ]
    case "REMOVE_HOBBY":
      return state.filter((hobby) => hobby.id !== action.id)
    default:
      return state;
  }
};

var moviesReducer = (state = [], action) => {
  switch(action.type){
    case "ADD_MOVIE":
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ]
    case "REMOVE_MOVIE":
      return  state.filter((movie) => movie.id !== action.id)
    default:
      return state
  }
};

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

//subscribe to changes
var unsubscribe = store.subscribe( () => {
  var state = store.getState();
  //console.log('name is: ', state.name);
  console.log("new state", state)
});

var currentState = store.getState();
console.log('currentState', currentState);


store.dispatch({
  type: "CHANGE_NAME",
  name: 'Emile'
});

store.dispatch({
  type: "ADD_HOBBY",
  hobby: "Running"
});
store.dispatch({
  type: "ADD_HOBBY",
  hobby: "Walking"
});

store.dispatch({
  type: "REMOVE_HOBBY",
  id: 2
});

store.dispatch({
  type: "ADD_MOVIE",
  title: "Movie A",
  genre: "Genre A"
});
store.dispatch({
  type: "ADD_MOVIE",
  title: "Movie B",
  genre: "Genre B"
});

store.dispatch({
  type: "REMOVE_MOVIE",
  id: 2
});

store.dispatch({
  type: "CHANGE_NAME",
  name: "Emilio"
});
