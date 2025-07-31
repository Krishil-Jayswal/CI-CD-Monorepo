import fs from "fs";
import path from "path";

const BASE_FOLDER = "builds";

const finalfiles = fs
  .readdirSync(BASE_FOLDER, { recursive: true })
  .filter((file) => !fs.statSync(path.join(BASE_FOLDER, file)).isDirectory());

const build = [];

finalfiles.forEach((file) => {
  const filepath = path.join(BASE_FOLDER, file);
  const content = fs.readFileSync(filepath).toString();
  build.push(JSON.parse(content));
});

fs.writeFileSync("build.json", JSON.stringify(build));
