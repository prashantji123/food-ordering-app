import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized, Login Again" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized, Login Again" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = token_decode.id; // Attach userId to request body
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
