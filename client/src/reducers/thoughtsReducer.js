import * as type from "./constantActionTypes/actionTypes";
const reducer = (
  thoughts = { isLoading: true, currentThoughts: [] },
  action
) => {
  switch (action.type) {
    case type.LOADING:
      return { ...thoughts, isLoading: true };
    case type.END_LOADING:
      return { ...thoughts, isLoading: false };
    case type.FETCH_ALL:
      return {
        ...thoughts,
        currentThoughts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case type.FETCH_BY_SEARCH:
      return {
        ...thoughts,
        currentThoughts: action.payload,
      };

    case type.CREATE_THOUGHT:
      return {
        ...thoughts,
        currentThoughts: [...thoughts.currentThoughts, action.payload],
      };

    case type.DELETE_THOUGHT:
      return {
        ...thoughts,
        currentThoughts: thoughts.currentThoughts.filter(
          (thought) => thought._id !== action.payload
        ),
      };
    case type.UPDATE_THOUGHT:
      return {
        ...thoughts,
        currentThoughts: thoughts.currentThoughts.map((thought) =>
          thought._id === action.payload._id ? action.payload : thought
        ),
      };
    case type.HEART_THOUGHTS:
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
