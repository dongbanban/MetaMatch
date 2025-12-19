/*
 * @file: /Users/i104/MetaMatch/src/index.ts
 * @author: dongyang
 * @description: MetaMatch 主入口文件
 */

import { configManager } from "./config/index.js";
import { FigmaClient } from "./figma/client.js";
import { StorageManager } from "./storage/index.js";
import { logger } from "./utils/logger.js";
import { validateNodeId } from "./utils/validator.js";
import { styleExtractor } from "./utils/style-extractor.js";

/**
 * MetaMatch 主类
 */
export class MetaMatch {
  private client: FigmaClient | null = null;
  private storage: StorageManager;

  constructor() {
    this.storage = new StorageManager("./data");
  }

  /**
   * 初始化 MetaMatch
   */
  async initialize(): Promise<void> {
    try {
      logger.info("=== MetaMatch 初始化开始 ===");

      // 1. 初始化配置
      logger.info("步骤 1/3: 加载配置...");
      configManager.initialize();

      const config = configManager.getConfig();

      // 2. 创建 Figma 客户端
      logger.info("步骤 2/3: 创建 Figma API 客户端...");
      this.client = new FigmaClient(config.token);

      // 3. 验证 Token
      logger.info("步骤 3/3: 验证 Access Token...");
      const isValid = await this.client.validateToken();
      if (!isValid) {
        throw new Error("Figma Access Token 验证失败");
      }

      // 4. 初始化存储
      await this.storage.initialize();

      logger.success("=== MetaMatch 初始化完成 ===\n");
    } catch (error) {
      logger.error("初始化失败", error instanceof Error ? error : undefined);
      throw error;
    }
  }

  /**
   * 获取文件节点信息
   */
  async fetchFileNodes(nodeId?: string): Promise<void> {
    if (!this.client) {
      throw new Error("MetaMatch 未初始化，请先调用 initialize()");
    }

    try {
      const config = configManager.getConfig();
      logger.info("=== 开始获取 Figma 节点信息 ===");
      logger.info(`文件 URL: ${config.fileUrl}`);
      logger.info(`文件 ID: ${config.fileId}`);

      if (nodeId) {
        // 获取特定节点
        const validatedNodeId = validateNodeId(nodeId);
        if (!validatedNodeId) {
          throw new Error("节点 ID 无效");
        }

        logger.info(`节点 ID: ${validatedNodeId}\n`);

        const node = await this.client.getNode(config.fileId, validatedNodeId);

        // 提取样式信息
        logger.info("正在提取节点样式信息...");
        const nodeStyles = styleExtractor.extractNodeStyles(node);

        const metadata = {
          fileId: config.fileId,
          fileName: node.name,
          lastModified: new Date().toISOString(),
          version: "unknown",
          thumbnailUrl: "",
          fetchedAt: new Date().toISOString(),
        };

        const savedPath = await this.storage.saveNodeStyles(
          metadata,
          nodeStyles
        );

        logger.success("\n=== 节点样式信息获取完成 ===");
        logger.info(`节点名称: ${node.name}`);
        logger.info(`节点类型: ${node.type}`);
        logger.info(`保存位置: ${savedPath}`);
      } else {
        // 获取整个文件
        logger.info("获取整个文件的样式信息\n");

        const fileResponse = await this.client.getFile(config.fileId);

        // 提取样式信息
        logger.info("正在提取文件样式信息...");
        const fileStyles = styleExtractor.extractNodeStyles(
          fileResponse.document
        );

        const metadata = this.client.extractMetadata(
          config.fileId,
          fileResponse
        );
        const savedPath = await this.storage.saveFileStyles(
          metadata,
          fileStyles,
          fileResponse.components,
          fileResponse.styles
        );

        logger.success("\n=== 文件样式信息获取完成 ===");
        logger.info(`文件名称: ${fileResponse.name}`);
        logger.info(`最后修改: ${fileResponse.lastModified}`);
        logger.info(`版本: ${fileResponse.version}`);
        logger.info(`保存位置: ${savedPath}`);
      }

      // 显示统计信息
      this.displayNodeStatistics(
        nodeId ? undefined : await this.countNodes(config.fileId)
      );
    } catch (error) {
      logger.error(
        "获取节点信息失败",
        error instanceof Error ? error : undefined
      );
      throw error;
    }
  }

  /**
   * 统计节点数量
   */
  private async countNodes(fileId: string): Promise<number> {
    if (!this.client) return 0;

    try {
      const fileResponse = await this.client.getFile(fileId);
      return this.countNodesRecursive(fileResponse.document);
    } catch {
      return 0;
    }
  }

  /**
   * 递归统计节点数量
   */
  private countNodesRecursive(node: any): number {
    let count = 1;
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        count += this.countNodesRecursive(child);
      }
    }
    return count;
  }

  /**
   * 显示统计信息
   */
  private displayNodeStatistics(totalNodes?: number): void {
    if (totalNodes !== undefined) {
      logger.info(`总节点数: ${totalNodes}`);
    }
    logger.info(`数据目录: ${this.storage.getOutputDir()}`);
  }

  /**
   * 运行主流程
   */
  async run(nodeId?: string): Promise<void> {
    try {
      await this.initialize();
      await this.fetchFileNodes(nodeId);
    } catch (error) {
      logger.error("执行失败", error instanceof Error ? error : undefined);
      process.exit(1);
    }
  }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  const nodeId = process.argv[2]; // 可选的节点 ID
  const app = new MetaMatch();
  app.run(nodeId);
}
