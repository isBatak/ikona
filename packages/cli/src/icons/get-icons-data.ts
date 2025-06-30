import fs from "fs-extra";
import { iconName } from "./icon-name";
import path from "node:path";

export interface IconData {
  name: string;
  content: string;
}

export interface GetIconsDataOptions {
  files: Array<string>;
  inputDir: string;
}

export function getIconsData({
  files,
  inputDir,
}: GetIconsDataOptions): Array<IconData> {
  return files.map((file) => {
    const name = iconName(file);
    const content = fs.readFileSync(path.join(inputDir, file), "utf8");
    return { name, content };
  });
}
