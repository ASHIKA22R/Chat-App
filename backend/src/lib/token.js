import jwt from "jsonwebtoken";

const tokenGeneration = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.secretkey,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

export default tokenGeneration;