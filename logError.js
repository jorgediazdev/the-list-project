import fs from "fs";

const logError = (error) => {
  const errorLogFile = process.env.ERROR_LOG_FILE;
  const date = new Date();
  const now = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}@${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  fs.appendFile(errorLogFile, `${now}|${error}\n`, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

export default logError;