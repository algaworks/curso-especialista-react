const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const execSync = require("child_process").execSync;

async function generateNewDir(directoryName) {
  const dirPath = path.resolve(
    __dirname,
    "..",
    "curso-especialista-react",
    directoryName
  );
  const exists = fs.existsSync(dirPath);

  if (exists) {
    throw new Error("Diretório já existe.");
  }

  fs.mkdirSync(dirPath);
  console.log(`Diretório ${directoryName} criado com sucesso.`);

  return dirPath;
}

async function copyProjectToExistingDirectory(dirPath) {
  fse.copySync(__dirname, dirPath, {
    filter(fileName) {
      if (/(node_modules|.git)/gi.test(fileName)) return false;

      if (fileName === __dirname + "\\next.js") return false;

      console.log("Copiando arquivo " + fileName);
      return true;
    },
  });

  return true;
}

async function main() {
  const [, , chapter, number, title] = process.argv;

  if (!chapter) throw new Error("Está faltando o módulo");

  if (!number) throw new Error("Está faltando a aula");

  if (!title) throw new Error("Está faltando o título da aula");

  const formattedChapter = String(chapter).padStart(2, "0");
  const formattedNumber = String(number).padStart(2, "0");

  const directory = `${formattedChapter}.${formattedNumber} - ${title}`;

  try {
    const newDirectoryFullPath = await generateNewDir(directory);
    const projectHasBeenCopied = await copyProjectToExistingDirectory(
      newDirectoryFullPath
    );

    if (projectHasBeenCopied) {
      execSync(`git add .`);
      execSync(`git commit -m "${directory}"`);
    }
  } catch (err) {
    console.log(`Erro: ${err.message}`);
  }
}

main();
