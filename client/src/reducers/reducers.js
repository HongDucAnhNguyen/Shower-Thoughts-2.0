const reducer = (thoughts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return {
        ...thoughts,
        currentThoughts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case "FETCH_BY_SEARCH":
      return {
        ...thoughts,
        currentThoughts: action.payload,
      };

    case "CREATE_THOUGHT":
      return {
        ...thoughts,
        currentThoughts: [...thoughts.currentThoughts, action.payload],
      };

    case "DELETE_THOUGHT":
      return {
        ...thoughts,
        currentThoughts: thoughts.currentThoughts.filter(
          (thought) => thought._id !== action.payload
        ),
      };
    case "UPDATE_THOUGHT":
      return {
        ...thoughts,
        currentThoughts: thoughts.currentThoughts.map((thought) =>
          thought._id === action.payload._id ? action.payload : thought
        ),
      };
    case "HEART_THOUGHTS":
      return {
        ...thoughts,
        currentThoughts: thoughts.currentThoughts.map((thought) =>
          thought._id === action.payload._id ? action.payload : thought
        ),
      };
    default:
      return thoughts;
  }
};
export default reducer;
