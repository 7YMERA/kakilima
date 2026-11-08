import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Room for an 8 MB photo plus the rest of the report form.
    serverActions: { bodySizeLimit: "10mb" },
  },
};

export default nextConfig;
