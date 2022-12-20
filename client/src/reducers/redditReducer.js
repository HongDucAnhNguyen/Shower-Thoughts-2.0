import * as type from './constantActionTypes/actionTypes'
const redditReducer = (reddits = { isRedditLoading: false }, action) => {
  switch (action.type) {
    case type.REDDIT_LOADING:
      return { ...reddits, isRedditLoading: true };
    case type.END_REDDIT_LOADING:
      return { ...reddits, isRedditLoading: false };
    case type.FETCH_REDDIT:
      console.log(action.payload);

      return {
        ...reddits,
        title: "Reddit Post",
        url: action.payload.url,
        message: action.payload.title,
      };
    default:
      return reddits;
  }
};
export default redditReducer;
