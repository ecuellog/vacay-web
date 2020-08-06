import FriendsService from '../../services/friends';

export const SET_FRIENDS = 'SET_FRIENDS';

// Basic
function setFriends(friends) {
  return {
    type: SET_FRIENDS,
    friends
  }
}

// With middleware
export function fetchFriends() {
  return function(dispatch) {
    return FriendsService.getFriendsOf()
      .then((res) => {
        dispatch(setFriends(res.data.friends));
      })
      .catch((error) => {
        console.error(error);
      })
  }
}
