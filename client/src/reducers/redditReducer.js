const redditReducer = (reddits = { isRedditLoading: false }, action) => {
  switch (action.type) {
    case "REDDIT_LOADING":
      return { ...reddits, isRedditLoading: true };
    case "END_REDDIT_LOADING":
      return { ...reddits, isRedditLoading: false };
    case "FETCH_REDDIT":
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
