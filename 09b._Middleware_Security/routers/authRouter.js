import { Router } from "express";

const authRouter = Router();

// -- middleware

/* 
 * This is a middleware function that checks if the user is an admin.
 * requires: 
 * - req.user: the user object from the request
 * - req.user.role: the role of the user
 *
function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
}
*/

function isAdmin(req, res, next) {
  const userIsAdmin = true;
  if (userIsAdmin) {
    // these isAdmin and username would be queried from Database
    req.isAdmin = userIsAdmin;
    res.username = "Johnnie";
    return next();
  }

  res.status(403).json({ message: "Sorry, you don't have permissions" });
}

authRouter.get("/auth/admin", isAdmin, (req, res) => {
  console.log(req.isAsdmin, req.username);
  res.send({ message: "hey Johnnie, our fav Admin" });
});

// -- routes

authRouter.get("/auth/user", (req, res) => {
  res.send({ message: "hey User, you are just a User tho" });
  req;
});

// -- export
export default authRouter;
