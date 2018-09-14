const users = (state = [], action) => {
  switch (action.type) {
    case "ADD_NEW_USER":
      return [
        ...state,
        {
          users: [
            ...users,
            {
              ...action.user
            }
          ]
        }
      ];
    default:
      return state;
  }
};

export default users;
