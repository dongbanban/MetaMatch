/*
 * @file: /Users/i104/MetaMatch/src/utils/validator.ts
 * @author: dongyang
 * @description: 验证工具
 */

import { ValidationError } from "./errors.js";

/**
 * 验证 Figma Personal Access Token
 * @param token - Figma token
 * @throws {ValidationError} 如果 token 无效
 */
export function validateToken(token: string | undefined): void {
  if (!token || token.trim() === "") {
    throw new ValidationError("Figma Personal Access Token 未配置或为空");
  }

  // Figma token 通常以 "figd_" 开头
  if (!token.startsWith("figd_")) {
    throw new ValidationError(
      'Figma Personal Access Token 格式不正确，应以 "figd_" 开头'
    );
  }

  if (token.length < 20) {
    throw new ValidationError("Figma Personal Access Token 长度不足");
  }
}

/**
 * 验证 Figma File URL
 * @param url - Figma 文件 URL
 * @returns 提取的 file ID
 * @throws {ValidationError} 如果 URL 无效
 */
export function validateAndExtractFileId(url: string | undefined): string {
  if (!url || url.trim() === "") {
    throw new ValidationError("Figma File URL 未配置或为空");
  }

  // Figma URL 格式: https://www.figma.com/file/{fileId}/{fileName}
  // 或者: https://www.figma.com/design/{fileId}/{fileName}
  const figmaUrlPattern =
    /https:\/\/(?:www\.)?figma\.com\/(file|design)\/([a-zA-Z0-9]+)/;
  const match = url.match(figmaUrlPattern);

  if (!match || !match[2]) {
    throw new ValidationError(
      "Figma File URL 格式不正确。正确格式: https://www.figma.com/file/{fileId}/{fileName}"
    );
  }

  return match[2];
}

/**
 * 验证节点 ID（可选）
 * @param nodeId - 节点 ID
 * @returns 格式化后的节点 ID
 */
export function validateNodeId(nodeId?: string): string | undefined {
  if (!nodeId) {
    return undefined;
  }

  // 节点 ID 通常格式为 "123:456" 或 "123-456"
  const nodeIdPattern = /^[\d-:]+$/;
  if (!nodeIdPattern.test(nodeId)) {
    throw new ValidationError(`节点 ID 格式不正确: ${nodeId}`);
  }

  // 统一将 "-" 转换为 ":"
  return nodeId.replace(/-/g, ":");
}

/**
 * 从 Figma URL 中提取 node ID
 * @param url - Figma 文件 URL
 * @returns 节点 ID，如果没有则返回 undefined
 */
export function extractNodeIdFromUrl(
  url: string | undefined
): string | undefined {
  if (!url) {
    return undefined;
  }

  // 匹配 node-id 参数：node-id=123-456 或 node-id=123:456
  const nodeIdPattern = /[?&]node-id=([0-9-:]+)/;
  const match = url.match(nodeIdPattern);

  if (match && match[1]) {
    // 将 - 转换为 :
    return match[1].replace(/-/g, ":");
  }

  return undefined;
}
