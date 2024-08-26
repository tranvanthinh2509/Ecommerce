const initState = {
  isLoggedIn: true,
  token: "123456",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
