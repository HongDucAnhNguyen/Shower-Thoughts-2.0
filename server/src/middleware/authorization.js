import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
  try {
    //get jwt and verify
    //extract token part from Bearer String
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;
    //if token for client exists
    if (token) {
      decodedData = jwt.verify(token, "secret");
      req.userId = decodedData?.id;
    } else {
      console.log("token for client not found");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default authorize;
