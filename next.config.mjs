// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your Next.js config options here
  // output: "export",
};

const createPlugin = async () => {
  const { default: createNextIntlPlugin } = await import("next-intl/plugin");
  const withNextIntl = createNextIntlPlugin();
  return withNextIntl(nextConfig);
};

export default await createPlugin();
