require('json5/lib/register');

const loadEnvironment = () => {
  const appEnv = process.env.APP_ENV;

  const envJsonPath = `./env/env.${appEnv || 'local'}.json5`;

  console.log(`Loading environment from ${envJsonPath}`);

  return {
    ...require(envJsonPath)
  }
}

const env = loadEnvironment();

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env
}

module.exports = nextConfig
