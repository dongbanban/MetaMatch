/*
 * @file: /Users/i104/MetaMatch/src/process-styles.ts
 * @author: dongyang
 */
/**
 * 主处理脚本 - 协调样式解析、CSS 生成和文件写入
 */

import * as fs from "fs";
import * as path from "path";
import { parseStyleNodes, groupByRootId } from "./utils/style-parser.js";
import { createCSSFiles } from "./utils/file-generator.js";

/**
 * 从文件读取 JSON 数据
 * @param filePath - JSON 文件路径
 * @returns JSON 对象
 */
function readJSONFile(filePath: string): any {
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

/**
 * 处理样式并生成 CSS 文件
 * @param jsonFilePath - JSON 文件路径
 * @param outputBaseDir - 输出目录（默认为 css，与 data 目录同级）
 */
export function processStyles(
  jsonFilePath: string,
  outputBaseDir: string = "css"
): void {
  console.log("开始处理样式文件...");
  console.log("");

  // 1. 读取 JSON 文件
  console.log("步骤 1: 读取 JSON 文件...");
  const jsonData = readJSONFile(jsonFilePath);
  console.log(`✓ JSON 文件读取成功`);
  console.log("");

  // 2. 解析样式节点
  console.log("步骤 2: 解析样式节点...");
  const styleNodes = parseStyleNodes(jsonData);
  console.log(`✓ 共识别出 ${styleNodes.length} 个样式节点`);
  console.log("");

  // 3. 按根节点分组
  console.log("步骤 3: 按根节点分组...");
  const grouped = groupByRootId(styleNodes);
  console.log(`✓ 按 ${grouped.size} 个根节点分组`);
  console.log("");

  // 4. 生成 CSS 文件
  console.log("步骤 4: 生成 CSS 文件...");
  const filePaths = createCSSFiles(styleNodes, outputBaseDir);
  console.log(`✓ 成功生成 ${filePaths.length} 个 CSS 文件`);
}

/**
 * 主函数 - 执行入口
 */
function main(): void {
  // 获取 data 目录中的 JSON 文件
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);
  const jsonFiles = files.filter(
    (f) => f.startsWith("figma-node-styles-") && f.endsWith(".json")
  );

  if (jsonFiles.length === 0) {
    console.error("错误: 在 data 目录中未找到 figma-node-styles-*.json 文件");
    process.exit(1);
  }

  // 处理第一个找到的 JSON 文件
  const jsonFilePath = path.join(dataDir, jsonFiles[0]);
  processStyles(jsonFilePath);
}

// 仅在直接运行时执行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
