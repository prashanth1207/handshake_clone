module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: 'handshake_dev',
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
      maxConnections: process.env.DB_POOL_MAX || 5,
      minConnections: process.env.DB_POOL_MIN || 1,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'mysql',
    pool: {
      maxConnections: process.env.DB_POOL_MAX || 5,
      minConnections: process.env.DB_POOL_MIN || 1,
      acquire: 30000,
      idle: 10000
    }
  }
};