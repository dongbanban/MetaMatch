/*
 * @file: /Users/i104/MetaMatch/src/types.ts
 * @author: dongyang
 * @description: MetaMatch 项目类型定义集合
 */

// ==================== Figma API 相关类型 ====================

/**
 * Figma 节点基础类型
 */
export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  visible?: boolean;
  locked?: boolean;
  children?: FigmaNode[];
  [key: string]: any;
}

/**
 * Figma 文件响应
 */
export interface FigmaFileResponse {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: FigmaNode;
  components?: Record<string, any>;
  styles?: Record<string, any>;
  schemaVersion: number;
}

/**
 * Figma API 错误响应
 */
export interface FigmaErrorResponse {
  status: number;
  err: string;
}

/**
 * Figma 节点查询选项
 */
export interface FigmaNodeOptions {
  /** 节点 ID，如果不提供则获取整个文档 */
  nodeId?: string;
  /** 深度限制 */
  depth?: number;
  /** 是否包含几何信息 */
  geometry?: boolean;
}

/**
 * Figma 文件元数据
 */
export interface FigmaFileMetadata {
  fileId: string;
  fileName: string;
  lastModified: string;
  fetchedAt: string;
}

// ==================== 配置相关类型 ====================

/**
 * Figma 配置接口
 */
export interface FigmaConfig {
  token: string;
  fileId: string;
  fileUrl: string;
}

/**
 * 扩展的 Figma 配置接口（包含 nodeId）
 */
export interface ExtendedFigmaConfig extends FigmaConfig {
  nodeId?: string;
}

// ==================== 样式提取相关类型 ====================

/**
 * 节点样式信息
 */
export interface NodeStyleInfo {
  id: string;
  name: string;
  type: string;

  // 尺寸和位置
  size?: {
    width: number;
    height: number;
  };
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  relativeTransform?: number[][];
  rotation?: number;

  // 背景和填充
  backgroundColor?: any;
  fills?: any[];
  fillGeometry?: any[];

  // 描边
  strokes?: any[];
  strokeWeight?: number;
  strokeAlign?: string;
  strokeCap?: string;
  strokeJoin?: string;
  strokeMiterLimit?: number;
  strokeGeometry?: any[];
  dashPattern?: number[];

  // 圆角
  cornerRadius?: number;
  rectangleCornerRadii?: number[];
  cornerSmoothing?: number;

  // 效果（阴影、模糊等）
  effects?: any[];

  // 透明度和混合
  opacity?: number;
  blendMode?: string;
  isMask?: boolean;
  isMaskOutline?: boolean;

  // 文本样式
  characters?: string;
  style?: {
    fontFamily?: string;
    fontPostScriptName?: string;
    fontSize?: number;
    fontWeight?: number;
    letterSpacing?: number;
    lineHeightPx?: number;
    lineHeightPercent?: number;
    lineHeightPercentFontSize?: number;
    lineHeightUnit?: string;
    textAlignHorizontal?: string;
    textAlignVertical?: string;
    textCase?: string;
    textDecoration?: string;
    paragraphIndent?: number;
    paragraphSpacing?: number;
    textAutoResize?: string;
  };
  characterStyleOverrides?: number[];
  styleOverrideTable?: Record<string, any>;

  // 布局（Auto Layout）
  layoutMode?: string;
  layoutAlign?: string;
  layoutGrow?: number;
  layoutPositioning?: string;
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
  primaryAxisSizingMode?: string;
  counterAxisSizingMode?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;
  counterAxisSpacing?: number;
  layoutWrap?: string;

  // 尺寸约束
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;

  // 约束
  constraints?: {
    horizontal?: string;
    vertical?: string;
  };

  // 裁剪和溢出
  clipsContent?: boolean;
  overflowDirection?: string;

  // 网格
  layoutGrids?: any[];

  // 导出设置
  exportSettings?: any[];

  // 可见性和锁定
  visible?: boolean;
  locked?: boolean;

  // 图片和向量
  imageRef?: string;
  preserveRatio?: boolean;

  // 组件和实例
  componentId?: string;
  componentProperties?: Record<string, any>;
  componentPropertyReferences?: Record<string, string>;
  overrides?: any[];

  // 原型交互
  transitionNodeID?: string;
  transitionDuration?: number;
  transitionEasing?: string;
  reactions?: any[];

  // 样式引用
  styles?: {
    fill?: string;
    stroke?: string;
    text?: string;
    effect?: string;
    grid?: string;
  };

  // 向量相关
  vectorNetwork?: any;
  handleMirroring?: string;

  // 布尔运算
  booleanOperation?: string;

  // 子节点样式（递归）
  children?: NodeStyleInfo[];
}

// ==================== 存储相关类型 ====================

/**
 * 存储的样式数据结构
 */
export interface StoredStyleData {
  metadata: FigmaFileMetadata;
  styles: NodeStyleInfo;
  figmaComponents?: Record<string, any>;
  figmaStyles?: Record<string, any>;
}
