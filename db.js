import mongoose from "mongoose";
import logError from "./logError";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "theListProject"
    });

    fs.appendFile(process.env.ERROR_LOG_FILE, (error) => {
      if (error) {
        console.log(error);
      }
    });

    return true;
  } catch (error) {
    logError(error);
    return false;
  }
}