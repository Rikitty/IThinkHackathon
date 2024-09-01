/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    optimizeDeps: {
        exclude: ["@mapbox"],}
};

export default nextConfig;
