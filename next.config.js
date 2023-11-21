/** @type {import('next').NextConfig} */
const nextConfig = {}

const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    ROOT: process.env.NODE_ENV === 'production' ? `https://www.stephend.io` : `http://localhost:2221`,
  },
}
