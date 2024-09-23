const UserRouter = require("./UserRouter");
const NavigateRouter = require("./NavigateRouter");
const PostController = require("./PostRouter");
const InsertRouter = require("./insert");

const initRoutes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/navigate", NavigateRouter);
  app.use("/api/post", PostController);
  app.use("/api/insert", InsertRouter);

  return app.use("/", (req, res) => {
    res.send("server on 123");
  });
};

module.exports = initRoutes;
