/*
 * @file: /Users/i104/MetaMatch/src/utils/logger.ts
 * @author: dongyang
 * @description: 日志工具
 */

import chalk from "chalk";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: LogLevel, message: string): string {
    return `[${this.getTimestamp()}] [${level}] ${message}`;
  }

  debug(message: string): void {
    console.log(chalk.gray(this.formatMessage(LogLevel.DEBUG, message)));
  }

  info(message: string): void {
    console.log(chalk.blue(this.formatMessage(LogLevel.INFO, message)));
  }

  warn(message: string): void {
    console.log(chalk.yellow(this.formatMessage(LogLevel.WARN, message)));
  }

  error(message: string, error?: Error): void {
    console.log(chalk.red(this.formatMessage(LogLevel.ERROR, message)));
    if (error) {
      console.log(chalk.red(`错误详情: ${error.message}`));
      if (error.stack) {
        console.log(chalk.gray(error.stack));
      }
    }
  }

  success(message: string): void {
    console.log(chalk.green(this.formatMessage(LogLevel.SUCCESS, message)));
  }
}

export const logger = new Logger();
