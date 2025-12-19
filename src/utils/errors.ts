/*
 * @file: /Users/i104/MetaMatch/src/utils/errors.ts
 * @author: dongyang
 * @description: 自定义错误类
 */

/**
 * Figma 配置错误
 */
export class FigmaConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FigmaConfigError";
  }
}

/**
 * Figma API 错误
 */
export class FigmaAPIError extends Error {
  public statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "FigmaAPIError";
    this.statusCode = statusCode;
  }
}

/**
 * 存储错误
 */
export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageError";
  }
}

/**
 * 验证错误
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
