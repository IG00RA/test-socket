const fs = require("fs");
const path = require("path");

const createOrUpdateJsonFile = (userId, userData) => {
  const directoryPath = path.join(__dirname, "../usersData");
  const fileName = `user_${userId}.json`;

  try {
    let existingData = {};
    const filePath = path.join(directoryPath, fileName);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      existingData = JSON.parse(fileContent);
    }
    const updatedData = { ...existingData, ...userData };
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf8");

    console.log(
      `JSON file ${fileName} created/updated successfully in ${directoryPath}`
    );
  } catch (error) {
    console.error(`Error creating/updating JSON file: ${error.message}`);
  }
};

const removeJsonFile = (userId) => {
  const directoryPath = path.join(__dirname, "../usersData");
  const fileName = `user_${userId}.json`;
  const filePath = path.join(directoryPath, fileName);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(
        `JSON file ${fileName} deleted successfully in ${directoryPath}`
      );
    }
  } catch (error) {
    console.error(`Error deleting JSON file: ${error.message}`);
  }
};

module.exports = {
  createOrUpdateJsonFile,
  removeJsonFile,
};
