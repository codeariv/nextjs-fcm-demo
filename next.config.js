/** @type {import('next').NextConfig} */
const withOffline = require("next-offline");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withOffline(nextConfig);
