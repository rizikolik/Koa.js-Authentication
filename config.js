
const ENV = {
  dev: {
    mongoUrl: process.env.mongoUrl,

    jwtSecret: process.env.jwtSecret,
  },
  prod: {
    mongoUrl: process.env.mongoUrl,

    jwtSecret: process.env.jwtSecret,
  },
};

const getEnvVars = (env = process.env.NODE_ENV) => {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;

  if (env.indexOf("prod") !== -1) return ENV.prod;
};
const selectedENV = getEnvVars();

module.exports = {
  selectedENV
}
