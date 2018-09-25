export const addNewUser = newUser => ({
  type: 'ADD_NEW_USER',
  user: newUser
});

export const updateTopics = topics => ({
  type: 'UPDATE_TOPICS',
  topics: topics
});

export const populateUsers = users => ({
  type: 'POPULATE_USERS',
  users: users
});

export const loadMyMessages = messages => ({
  type: 'LOAD_MY_MESSAGES',
  messages
});
