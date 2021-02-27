require('dotenv').config()

const config = {
  AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET.replace(/\\n/gm, '\n'),
  AUTH_JWT_PUBLIC: process.env.AUTH_JWT_PUBLIC.replace(/\\n/gm, '\n')
}

module.exports = { config: config }