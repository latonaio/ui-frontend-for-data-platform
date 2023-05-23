require('json5/lib/register');

const loadEnvironment = () => {
  const appEnv = process.env.APP_ENV || 'local';
  const envJsonPath = `./env/env.${appEnv}.json5`;

  console.log(`Loading environment from ${envJsonPath}`);

  return {
    ...require(envJsonPath)
  }
}

const env = loadEnvironment();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env
}

module.exports = nextConfig
