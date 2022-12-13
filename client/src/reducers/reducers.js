const reducer = (thoughts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "FETCH_BY_SEARCH":
      
      return action.payload;

    case "CREATE_THOUGHT":
      return [...thoughts, action.payload];

    case "DELETE_THOUGHT":
      return thoughts.filter((thought) => thought._id !== action.payload);
    case "UPDATE_THOUGHT":
      return thoughts.map((thought) =>
        thought._id === action.payload._id ? action.payload : thought
      );
    case "HEART_THOUGHTS":
      return thoughts.map((thought) =>
        thought._id === action.payload._id ? action.payload : thought
      );
    default:
      return thoughts;
  }
};
export default reducer;
