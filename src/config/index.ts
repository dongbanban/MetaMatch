/*
 * @file: /Users/i104/MetaMatch/src/config/index.ts
 * @author: dongyang
 * @description: 配置管理
 */

import * as dotenv from "dotenv";
import { FigmaConfigError } from "../utils/errors.js";
import { validateToken, validateAndExtractFileId } from "../utils/validator.js";
import { logger } from "../utils/logger.js";
import { FigmaConfig } from "../types.js";

// 加载环境变量
dotenv.config();

/**
 * 配置管理类
 */
class ConfigManager {
  private config: FigmaConfig | null = null;

  /**
   * 初始化配置
   */
  initialize(): void {
    try {
      const token = process.env.FIGMA_ACCESS_TOKEN;
      const fileUrl = process.env.FIGMA_FILE_URL;

      // 验证配置
      validateToken(token);
      const fileId = validateAndExtractFileId(fileUrl);

      this.config = {
        token: token!,
        fileId,
        fileUrl: fileUrl!,
      };

      logger.success("配置验证成功");
      logger.info(`File ID: ${fileId}`);
    } catch (error) {
      if (error instanceof Error) {
        throw new FigmaConfigError(`配置初始化失败: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * 获取配置
   */
  getConfig(): FigmaConfig {
    if (!this.config) {
      throw new FigmaConfigError("配置未初始化，请先调用 initialize() 方法");
    }
    return this.config;
  }
}

export const configManager = new ConfigManager();
