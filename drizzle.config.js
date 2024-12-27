/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://AI-Interview-mocker_owner:SR1kjMhq0XOi@ep-withered-feather-a5kl4fzf.us-east-2.aws.neon.tech/AI-Interview-mocker?sslmode=require',
    }
  };