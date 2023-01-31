/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl: "mongodb://127.0.0.1:27017/nextjs",
    CLIENT_URL: `http://localhost:3000`,
    jwtSecret:
      "07c2b3531601d356a8c4bfade06be915a36ce6c1c68e8f9cb95aeee197ce26c1e8209f1a01416c89483115568eb30ad1cc",
  },
};

module.exports = nextConfig;
