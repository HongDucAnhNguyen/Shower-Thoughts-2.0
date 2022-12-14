const redditReducer = (reddits = [], action) => {
  switch (action.type) {
    case "FETCH_REDDIT":
      console.log(action.payload);
      let reddit = {};

      reddit.title = "Reddit Post";
      reddit.message = action.payload;
      reddit._id = 111;
      return [...reddits, reddit];
    default:
      return reddits;
  }
};
export default redditReducer;
