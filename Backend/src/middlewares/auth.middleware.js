import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError(401, "Access token missing");
    }

    const [, token] = authHeader.trim().split(/\s+/);

    if (!token) {
      throw new ApiError(401, "Invalid access token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Access token expired"));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid access token"));
    }

    next(error);
  }
};

export default authenticate;