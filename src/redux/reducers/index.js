const users = (
  state = {
    users: [],
    currentUser: {}
  },
  action
) => {
  switch (action.type) {
    case 'ADD_NEW_USER':
      return {
        ...state,

        currentUser: action.user
      };

    case 'UPDATE_TOPICS':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          topics: action.topics
        }
      };

    case 'POPULATE_USERS':
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
};

export default users;
