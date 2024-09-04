const UserRouter = require("./UserRouter");

const initRoutes = (app) => {
  app.use("/api/user", UserRouter);

  return app.use("/", (req, res) => {
    res.send("server on 123");
  });
};

export default initRoutes;
