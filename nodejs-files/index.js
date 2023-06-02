const fs = require("fs").promises;
const path = require("path");

async function readFile() {
  const items = await fs.readdir("stores");
  console.log(items);
  console.log(__dirname); //same as pwd
}

// readFile();

async function findFiles(folderName) {
  const items = await fs.readdir(folderName, { withFileTypes: true });
  items.forEach((item) => {
    if (path.extname(item.name) === ".json") {
      console.log(`Found file: ${item.name} in folder: ${folderName}`);
    } else {
      // this is a folder, so call this method again and pass in
      // the path to the folder
      findFiles(path.join(folderName, item.name));
    }
  });
}

// findFiles("stores");

async function createDir() {
  const pathToCreate = path.join(__dirname, "stores", "201", "newDirectory");

  // create the salesTotal directory if it doesn't exist
  try {
    await fs.mkdir(pathToCreate);
  } catch {
    console.log(`${pathToCreate} already exists.`);
  }
}

// createDir();

async function readFileAsString() {
  const buffer = await fs.readFile("stores/201/sales.json"); //retorna em binário
  console.log(String(buffer));
}

async function readFileAsJson() {
  const data = JSON.parse(await fs.readFile("stores/201/sales.json"));
  console.log(data);
}

async function writeInFile() {
  const data = JSON.parse(await fs.readFile("stores/201/sales.json"));
  await fs.writeFile("salesTotals/totals.txt", data.total);

  console.log(data);
}

readFileAsString();
readFileAsJson();

writeInFile();
