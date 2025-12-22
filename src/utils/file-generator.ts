/**
 * 文件生成工具 - 负责创建目录和写入 CSS 文件
 */

import * as fs from "fs";
import * as path from "path";
import { generateCSSFileContent } from "./css-generator.js";

/**
 * 确保目录存在，如果不存在则创建
 * @param dirPath - 目录路径
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 生成 CSS 文件名
 * @param id - 节点 ID
 * @param name - 节点名称
 * @returns 文件名
 */
export function generateFileName(id: string, name: string): string {
  // 清理名称，移除所有特殊字符（包括冒号、分号等）
  const cleanId = id.replace(/[^a-zA-Z0-9]/g, "_");
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, "_");
  return `${cleanId}_${cleanName}.css`;
}

/**
 * 生成 CSS 文件路径
 * @param rootId - 根节点 ID
 * @param id - 当前节点 ID
 * @param name - 节点名称
 * @param baseDir - 基础目录（默认为 css，与 data 目录同级）
 * @returns 完整的文件路径
 */
export function generateFilePath(
  rootId: string,
  id: string,
  name: string,
  baseDir: string = "css"
): string {
  const cleanRootId = rootId.replace(/:/g, "_");
  const dirPath = path.join(process.cwd(), baseDir, cleanRootId);
  const fileName = generateFileName(id, name);
  return path.join(dirPath, fileName);
}

/**
 * 写入 CSS 文件
 * @param filePath - 文件路径
 * @param content - 文件内容
 */
export function writeCSSFile(filePath: string, content: string): void {
  // 确保目录存在
  const dirPath = path.dirname(filePath);
  ensureDirectoryExists(dirPath);

  // 写入文件
  fs.writeFileSync(filePath, content, "utf-8");
}

/**
 * 为单个样式节点生成并写入 CSS 文件
 * @param rootId - 根节点 ID
 * @param id - 节点 ID
 * @param name - 节点名称
 * @param styles - 样式对象
 * @param baseDir - 基础目录
 * @returns 生成的文件路径
 */
export function createCSSFile(
  rootId: string,
  id: string,
  name: string,
  styles: any,
  baseDir: string = "css"
): string {
  const filePath = generateFilePath(rootId, id, name, baseDir);
  const content = generateCSSFileContent(id, name, styles);
  writeCSSFile(filePath, content);
  return filePath;
}

/**
 * 批量生成 CSS 文件
 * @param styleNodes - 样式节点数组
 * @param baseDir - 基础目录
 * @returns 生成的文件路径数组
 */
export function createCSSFiles(
  styleNodes: Array<{ rootId: string; id: string; name: string; styles: any }>,
  baseDir: string = "css"
): string[] {
  const filePaths: string[] = [];

  for (const node of styleNodes) {
    const filePath = createCSSFile(
      node.rootId,
      node.id,
      node.name,
      node.styles,
      baseDir
    );
    filePaths.push(filePath);
  }

  return filePaths;
}
