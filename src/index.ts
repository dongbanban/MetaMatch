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
   * 获取节点样式信息
   */
  async fetchNodeStyles(cmdNodeId?: string): Promise<void> {
    if (!this.client) {
      throw new Error("MetaMatch 未初始化，请先调用 initialize()");
    }

    try {
      const config = configManager.getConfig();

      // 优先使用命令行参数，其次使用配置中的 nodeId
      const nodeId = cmdNodeId || config.nodeId;

      if (!nodeId) {
        throw new Error(
          "未指定节点 ID。请在 URL 中添加 node-id 参数，或通过命令行参数指定。"
        );
      }

      logger.info("开始获取 Figma 节点样式");
      const validatedNodeId = validateNodeId(nodeId);
      if (!validatedNodeId) {
        throw new Error("节点 ID 无效");
      }

      const node = await this.client.getNode(config.fileId, validatedNodeId);

      // 提取样式信息
      logger.info("正在提取节点样式信息...");
      const nodeStyles = styleExtractor.extractNodeStyles(node);

      const metadata = {
        fileId: config.fileId,
        fileName: node.name,
        lastModified: new Date().toISOString(),
        fetchedAt: new Date().toISOString(),
      };

      await this.storage.saveNodeStyles(metadata, nodeStyles);

      logger.success("\n=== 节点样式信息获取完成 ===");
    } catch (error) {
      logger.error(
        "获取节点信息失败",
        error instanceof Error ? error : undefined
      );
      throw error;
    }
  }

  /**
   * 运行主流程
   */
  async run(nodeId?: string): Promise<void> {
    try {
      await this.initialize();
      await this.fetchNodeStyles(nodeId);
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
