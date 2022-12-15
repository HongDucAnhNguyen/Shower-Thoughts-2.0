const redditReducer = (reddits = {}, action) => {
  switch (action.type) {
    case "FETCH_REDDIT":
      console.log(action.payload);
      let reddit = {};

      reddit.title = "Reddit Post";
      reddit.message = action.payload.title;
      reddit.url = action.payload.url;
      reddit._id = 111;
      return reddit;
    default:
      return reddits;
  }
};
export default redditReducer;
