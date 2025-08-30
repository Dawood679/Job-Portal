import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, resizeBy, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ msg: "User not authenticated" });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.json({ msg: "Invalid token" });
    }
    req.id = decode.userId;
    next();
  } catch (error) {}
};
