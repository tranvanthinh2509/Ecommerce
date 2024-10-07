const UserRouter = require("./UserRouter");
const NavigateRouter = require("./NavigateRouter");
const PostRouter = require("./PostRouter");
const InsertRouter = require("./insert");
const PriceRouter = require("./PriceRouter");
const AreaRouter = require("./AreaRouter");

const initRoutes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/navigate", NavigateRouter);
  app.use("/api/post", PostRouter);
  app.use("/api/price", PriceRouter);
  app.use("/api/area", AreaRouter);
  app.use("/api/insert", InsertRouter);

  return app.use("/", (req, res) => {
    res.send("server on 123");
  });
};

module.exports = initRoutes;
