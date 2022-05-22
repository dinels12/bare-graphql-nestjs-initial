export default {
  ENV: process.env.NODE_ENV || 'development',
  DB: process.env.DB || 'mongodb://localhost/exampleDB',
  JWT_SECRET: process.env.JWT_SECRET || 'development',
  PORT: process.env.PORT || 4000,
};
