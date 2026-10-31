/** @type {import('next').NextConfig} */

/**
 * `output: "standalone"` is opt-in through NEXT_OUTPUT so one repo can serve two
 * deployment shapes: the Docker image (see /Dockerfile) ships only the traced
 * server, while `next start` — used by the file-based preview host — refuses to
 * run against a config that forces standalone.
 */
const nextConfig = {
  reactStrictMode: true,
  ...(process.env.NEXT_OUTPUT === "standalone" ? { output: "standalone" } : {}),
};

export default nextConfig;
