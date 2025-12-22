/**
 * 样式解析工具 - 负责从 Figma JSON 中递归识别所有样式节点
 */

import type { StyleNode } from "../types.js";

/**
 * 递归遍历节点树，提取所有包含 styles 属性的节点
 * @param node - 当前节点
 * @param rootId - 第一层级的根节点 id
 * @param results - 收集结果的数组
 */
function traverseNode(node: any, rootId: string, results: StyleNode[]): void {
  // 如果当前节点有 id 和 name，将其添加到结果中（包含根节点本身）
  if (node.id && node.name) {
    results.push({
      id: node.id,
      name: node.name,
      rootId,
      styles: node, // 保存完整的节点信息
    });
  }

  // 递归处理子节点
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      traverseNode(child, rootId, results);
    }
  }
}

/**
 * 从 JSON 数据中解析所有样式节点
 * @param jsonData - Figma JSON 数据
 * @returns 样式节点数组
 */
export function parseStyleNodes(jsonData: any): StyleNode[] {
  const results: StyleNode[] = [];

  // 检查是否有 styles 根节点
  if (!jsonData.styles) {
    throw new Error("JSON data does not contain styles property");
  }

  const rootNode = jsonData.styles;
  const rootId = rootNode.id;

  // 从根节点开始遍历
  traverseNode(rootNode, rootId, results);

  return results;
}

/**
 * 按根节点 ID 分组样式节点
 * @param styleNodes - 样式节点数组
 * @returns 按根节点 ID 分组的 Map
 */
export function groupByRootId(
  styleNodes: StyleNode[]
): Map<string, StyleNode[]> {
  const grouped = new Map<string, StyleNode[]>();

  for (const node of styleNodes) {
    const existing = grouped.get(node.rootId) || [];
    existing.push(node);
    grouped.set(node.rootId, existing);
  }

  return grouped;
}
