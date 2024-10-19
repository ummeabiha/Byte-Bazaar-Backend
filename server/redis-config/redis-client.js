const Redis = require("ioredis");

async function initRedis() {
  try {
    const client = new Redis();
    console.log(`Redis connection established at port: ${client.options.port}`);
  } catch (error) {
    console.log(
      "An error occurred while establishing a connection with Redis."
    );
  }
}

module.exports = { initRedis };
