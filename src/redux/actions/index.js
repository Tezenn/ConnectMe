export const addNewUser = newUser => ({
  type: "ADD_NEW_USER",
  user: newUser
});

export const updateTopics = topics => ({
  type: "UPDATE_TOPICS",
  topics: topics
});
