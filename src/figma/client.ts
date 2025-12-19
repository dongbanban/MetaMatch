/*
 * @file: /Users/i104/MetaMatch/src/figma/client.ts
 * @author: dongyang
 * @description: Figma API 客户端
 */

import axios, { AxiosInstance, AxiosError } from "axios";
import { FigmaAPIError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";
import {
  FigmaFileResponse,
  FigmaNode,
  FigmaNodeOptions,
  FigmaErrorResponse,
} from "../types.js";

/**
 * Figma API 客户端类
 */
export class FigmaClient {
  private client: AxiosInstance;
  private readonly baseURL = "https://api.figma.com/v1";

  constructor(private accessToken: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        "X-Figma-Token": this.accessToken,
      },
      timeout: 30000, // 30秒超时
    });

    // 请求拦截器
    this.client.interceptors.request.use(
      (config) => {
        logger.debug(`发送请求: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        logger.error("请求拦截器错误", error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.client.interceptors.response.use(
      (response) => {
        logger.debug(
          `收到响应: ${response.config.url} - 状态码 ${response.status}`
        );
        return response;
      },
      (error: AxiosError<FigmaErrorResponse>) => {
        return this.handleError(error);
      }
    );
  }

  /**
   * 处理 API 错误
   */
  private handleError(error: AxiosError<FigmaErrorResponse>): never {
    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = `Figma API 错误 (${status})`;

      switch (status) {
        case 400:
          errorMessage = "请求参数错误";
          break;
        case 401:
          errorMessage = "Personal Access Token 无效或已过期，请检查配置";
          break;
        case 403:
          errorMessage = "没有权限访问此文件，请检查文件共享设置";
          break;
        case 404:
          errorMessage = "文件不存在或已被删除";
          break;
        case 429:
          errorMessage = "API 请求频率超限，请稍后重试";
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = "Figma 服务器错误，请稍后重试";
          break;
        default:
          if (data?.err) {
            errorMessage = `${errorMessage}: ${data.err}`;
          }
      }

      throw new FigmaAPIError(errorMessage, status);
    } else if (error.request) {
      throw new FigmaAPIError("网络请求失败，请检查网络连接");
    } else {
      throw new FigmaAPIError(`请求配置错误: ${error.message}`);
    }
  }

  /**
   * 获取文件信息
   */
  async getFile(
    fileId: string,
    options?: FigmaNodeOptions
  ): Promise<FigmaFileResponse> {
    try {
      logger.info(`正在获取 Figma 文件: ${fileId}`);

      const params: Record<string, any> = {};
      if (options?.depth) {
        params.depth = options.depth;
      }
      if (options?.geometry !== undefined) {
        params.geometry = options.geometry ? "paths" : "none";
      }

      const response = await this.client.get<FigmaFileResponse>(
        `/files/${fileId}`,
        {
          params,
        }
      );

      logger.success(`成功获取文件信息: ${response.data.name}`);
      return response.data;
    } catch (error) {
      if (error instanceof FigmaAPIError) {
        throw error;
      }
      throw new FigmaAPIError(
        `获取文件信息失败: ${
          error instanceof Error ? error.message : "未知错误"
        }`
      );
    }
  }

  /**
   * 获取特定节点信息
   */
  async getNode(fileId: string, nodeId: string): Promise<FigmaNode> {
    try {
      logger.info(`正在获取节点: ${nodeId}`);

      const response = await this.client.get<{
        nodes: Record<string, { document: FigmaNode }>;
      }>(`/files/${fileId}/nodes`, {
        params: {
          ids: nodeId,
        },
      });

      const nodeData = response.data.nodes[nodeId];
      if (!nodeData) {
        throw new FigmaAPIError(`节点 ${nodeId} 不存在`);
      }

      logger.success(`成功获取节点信息: ${nodeData.document.name}`);
      return nodeData.document;
    } catch (error) {
      if (error instanceof FigmaAPIError) {
        throw error;
      }
      throw new FigmaAPIError(
        `获取节点信息失败: ${
          error instanceof Error ? error.message : "未知错误"
        }`
      );
    }
  }

  /**
   * 验证 Token 是否有效
   */
  async validateToken(): Promise<boolean> {
    try {
      logger.info("正在验证 Figma Access Token...");

      // 通过获取用户信息来验证 token
      await this.client.get("/me");

      logger.success("Token 验证成功");
      return true;
    } catch (error) {
      if (error instanceof FigmaAPIError) {
        logger.error("Token 验证失败", error);
        return false;
      }
      return false;
    }
  }
}
