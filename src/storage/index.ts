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
}
