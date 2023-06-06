export const env = {
  nest: {
    host: process.env.NESTJS_DATA_CONNECTION_REQUEST_CONTROL_MANAGER_HOST,
    port: process.env.NESTJS_DATA_CONNECTION_REQUEST_CONTROL_MANAGER_PORT,
  },
  cacheDatabaseVersion: process.env.CACHE_DATABASE_VERSION,
}
