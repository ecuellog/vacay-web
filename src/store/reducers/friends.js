import {
  SET_FRIENDS
} from '../actions/friends';

var defaultState = {
  friends: []
}

const friends = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FRIENDS:
      return {
        ...state,
        friends: action.friends
      };
    default:
      return state;
  }
}

export default friends; 