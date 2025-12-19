/*
 * @file: /Users/i104/MetaMatch/src/storage/index.ts
 * @author: dongyang
 * @description: 数据存储管理
 */

import * as fs from "fs/promises";
import * as path from "path";
import { StorageError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";
import { FigmaFileMetadata, NodeStyleInfo, StoredStyleData } from "../types.js";

/**
 * 存储管理类
 */
export class StorageManager {
  private readonly outputDir: string;

  constructor(outputDir: string = "./data") {
    this.outputDir = path.resolve(outputDir);
  }

  /**
   * 初始化存储目录
   */
  async initialize(): Promise<void> {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
      logger.success(`存储目录已创建: ${this.outputDir}`);
    } catch (error) {
      throw new StorageError(
        `创建存储目录失败: ${
          error instanceof Error ? error.message : "未知错误"
        }`
      );
    }
  }

  /**
   * 保存文件样式数据
   */
  async saveFileStyles(
    metadata: FigmaFileMetadata,
    styles: NodeStyleInfo,
    figmaComponents?: Record<string, any>,
    figmaStyles?: Record<string, any>
  ): Promise<string> {
    try {
      const data: StoredStyleData = {
        metadata,
        styles,
        figmaComponents,
        figmaStyles,
      };

      // 使用文件 ID 和时间戳作为文件名
      const timestamp = new Date().getTime();
      const filename = `figma-styles-${metadata.fileId}-${timestamp}.json`;
      const filepath = path.join(this.outputDir, filename);

      logger.info("正在保存数据，文件较大可能需要一些时间...");

      // 直接使用 fs.writeFile，但不格式化 JSON 以减少内存占用
      const jsonString = JSON.stringify(data);
      await fs.writeFile(filepath, jsonString, "utf-8");

      logger.success(`数据已保存到: ${filepath}`);

      // 获取文件大小
      const stats = await fs.stat(filepath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      logger.info(`文件大小: ${sizeMB} MB`);

      return filepath;
    } catch (error) {
      // 如果是内存错误，提供更友好的提示
      if (
        error instanceof Error &&
        error.message.includes("Invalid string length")
      ) {
        throw new StorageError(
          "文件数据过大，超出了 Node.js 字符串长度限制。建议使用节点 ID 获取特定节点，而不是整个文件。"
        );
      }
      throw new StorageError(
        `保存文件数据失败: ${
          error instanceof Error ? error.message : "未知错误"
        }`
      );
    }
  }

  /**
   * 保存节点样式数据
   */
  async saveNodeStyles(
    metadata: FigmaFileMetadata,
    styles: NodeStyleInfo
  ): Promise<string> {
    try {
      const data = {
        metadata,
        styles,
      };

      // 使用文件 ID、节点 ID 和时间戳作为文件名
      const timestamp = new Date().getTime();
      const nodeIdSafe = styles.id.replace(/[/:]/g, "-");
      const filename = `figma-node-styles-${metadata.fileId}-${nodeIdSafe}-${timestamp}.json`;
      const filepath = path.join(this.outputDir, filename);

      // 保存 JSON 文件
      await fs.writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");

      logger.success(`节点数据已保存到: ${filepath}`);
      return filepath;
    } catch (error) {
      throw new StorageError(
        `保存节点数据失败: ${
          error instanceof Error ? error.message : "未知错误"
        }`
      );
    }
  }

  /**
   * 读取已保存的样式数据
   */
  async loadData(filepath: string): Promise<StoredStyleData | any> {
    try {
      const content = await fs.readFile(filepath, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      throw new StorageError(
        `读取数据失败: ${error instanceof Error ? error.message : "未知错误"}`
      );
    }
  }

  /**
   * 列出所有已保存的文件
   */
  async listSavedFiles(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.outputDir);
      return files.filter((file) => file.endsWith(".json"));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return [];
      }
      throw new StorageError(
        `列出文件失败: ${error instanceof Error ? error.message : "未知错误"}`
      );
    }
  }

  /**
   * 获取输出目录路径
   */
  getOutputDir(): string {
    return this.outputDir;
  }
}
