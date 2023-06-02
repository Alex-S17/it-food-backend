require("dotenv").config();

const app = require("./app");

const { connectToItFoodDb } = require("./models/connections");

const { PORT = 3002 } = process.env;

module.exports = app.listen(PORT, async () => {
  try {
    await connectToItFoodDb();
    console.log("Database connection successful");
    console.log(`Server running. Use our API on port: ${PORT}`);
  } catch (error) {
    console.log(`Database connection error:${error.message}`);
    process.exit(1);
  }
});
