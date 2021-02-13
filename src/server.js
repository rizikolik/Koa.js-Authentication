const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const numberOfCpus = os.cpus().length;
  console.log(`Forking ${numberOfCpus} CPUS for scaling..`);
  for (let i = 0; i <= numberOfCpus; i++) {
    cluster.fork();
  }
} else {
  const Koa = require("koa");
  const cors = require("@koa/cors");
  const session = require("koa-session");
  const passport = require("koa-passport");
  const bodyParser = require("koa-bodyparser");
  const { dbConnect } = require("./database");
  // eslint-disable-next-line no-unused-vars
  const path = require("path");
  const logger = require("./utils/logger");
  const morgan = require("koa-morgan");
  const swagger = require("swagger2");
  const { ui, validate } = require("swagger2-koa");
  const config = require("../config");
  const swaggerDocument = require("./swagger.json");
  const { spawn } = require("child_process");

  // Modules that will be used by App //

  const UserModule = require("./models/User");
  const VideoModule = require("./models/Video");
  seedDB = require("../seeds");
  // startup
  //Worker processors

  const app = new Koa();
  app.use(cors());
  app.use(session(app));
  // body parser
  app.use(bodyParser());
  const dbURI = config.selectedENV.mongoUrl;
  app
    .use(morgan("combined", { stream: logger.stream })) // Combine morgan's console logs with winston logs

    .use(passport.initialize())

    .use(ui(swaggerDocument, "/documentation"))
    .use(UserModule.router.routes())
    .use(UserModule.router.allowedMethods())
    .use(VideoModule.router.routes())
    .use(VideoModule.router.allowedMethods());

  //seedDB();
  // error logger With Morgan+Winston
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    const locals = {};
    locals.message = err.response.message;
    locals.error = err.app.env === "development" ? err : {};

    // add this line to include winston logging
    logger.error(
      `${err.response.status || 500} - ${err.response.message} - ${
        err.originalUrl
      } - ${err.req.method} `
    );
  });
  const pid = process.pid;
  dbConnect(`${dbURI}`)
    .then(
      app.listen(process.env.PORT || 5000, process.env.IP, function () {
        console.log(
          `SERVER IS RUNNİNG AT PROCESS:${pid}  and PORT: ${
            process.env.PORT || 5000
          }`
        );
      })
    )
    .catch((err) => {
      console.log(err, "connection error of mongoDB");
    });
}
