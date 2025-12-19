/*
 * @file: /Users/i104/MetaMatch/src/utils/style-extractor.ts
 * @author: dongyang
 * @description: 样式信息提取器
 */

import { FigmaNode, NodeStyleInfo } from "../types.js";

/**
 * 样式提取器类
 */
export class StyleExtractor {
  /**
   * 提取节点样式信息
   */
  extractNodeStyles(node: FigmaNode): NodeStyleInfo {
    const styleInfo: NodeStyleInfo = {
      id: node.id,
      name: node.name,
      type: node.type,
    };

    // 提取尺寸
    if ("size" in node && node.size) {
      styleInfo.size = {
        width: (node as any).size.width,
        height: (node as any).size.height,
      };
    }

    // 提取绝对边界框
    if ("absoluteBoundingBox" in node && node.absoluteBoundingBox) {
      styleInfo.absoluteBoundingBox = node.absoluteBoundingBox;
    }

    // 提取变换矩阵和旋转
    if ("relativeTransform" in node && node.relativeTransform) {
      styleInfo.relativeTransform = (node as any).relativeTransform;
    }
    if ("rotation" in node && node.rotation !== undefined) {
      styleInfo.rotation = (node as any).rotation;
    }

    // 提取背景色
    if ("backgroundColor" in node && node.backgroundColor) {
      styleInfo.backgroundColor = node.backgroundColor;
    }

    // 提取填充
    if ("fills" in node && node.fills) {
      styleInfo.fills = node.fills;
    }
    if ("fillGeometry" in node && node.fillGeometry) {
      styleInfo.fillGeometry = (node as any).fillGeometry;
    }

    // 提取描边
    if ("strokes" in node && node.strokes) {
      styleInfo.strokes = node.strokes;
    }
    if ("strokeWeight" in node && node.strokeWeight !== undefined) {
      styleInfo.strokeWeight = node.strokeWeight;
    }
    if ("strokeAlign" in node && node.strokeAlign) {
      styleInfo.strokeAlign = node.strokeAlign;
    }
    if ("strokeCap" in node && node.strokeCap) {
      styleInfo.strokeCap = (node as any).strokeCap;
    }
    if ("strokeJoin" in node && node.strokeJoin) {
      styleInfo.strokeJoin = (node as any).strokeJoin;
    }
    if ("strokeMiterLimit" in node && node.strokeMiterLimit !== undefined) {
      styleInfo.strokeMiterLimit = (node as any).strokeMiterLimit;
    }
    if ("strokeGeometry" in node && node.strokeGeometry) {
      styleInfo.strokeGeometry = (node as any).strokeGeometry;
    }
    if ("dashPattern" in node && node.dashPattern) {
      styleInfo.dashPattern = (node as any).dashPattern;
    }

    // 提取圆角
    if ("cornerRadius" in node && node.cornerRadius !== undefined) {
      styleInfo.cornerRadius = node.cornerRadius;
    }
    if ("rectangleCornerRadii" in node && node.rectangleCornerRadii) {
      styleInfo.rectangleCornerRadii = node.rectangleCornerRadii;
    }
    if ("cornerSmoothing" in node && node.cornerSmoothing !== undefined) {
      styleInfo.cornerSmoothing = (node as any).cornerSmoothing;
    }

    // 提取效果
    if ("effects" in node && node.effects) {
      styleInfo.effects = node.effects;
    }

    // 提取透明度和混合模式
    if ("opacity" in node && node.opacity !== undefined) {
      styleInfo.opacity = node.opacity;
    }
    if ("blendMode" in node && node.blendMode) {
      styleInfo.blendMode = node.blendMode;
    }
    if ("isMask" in node && node.isMask !== undefined) {
      styleInfo.isMask = (node as any).isMask;
    }
    if ("isMaskOutline" in node && node.isMaskOutline !== undefined) {
      styleInfo.isMaskOutline = (node as any).isMaskOutline;
    }

    // 提取文本内容
    if ("characters" in node && node.characters) {
      styleInfo.characters = (node as any).characters;
    }

    // 提取文本样式
    if ("style" in node && node.style) {
      const nodeStyle = (node as any).style;
      styleInfo.style = {
        fontFamily: nodeStyle.fontFamily,
        fontPostScriptName: nodeStyle.fontPostScriptName,
        fontSize: nodeStyle.fontSize,
        fontWeight: nodeStyle.fontWeight,
        letterSpacing: nodeStyle.letterSpacing,
        lineHeightPx: nodeStyle.lineHeightPx,
        lineHeightPercent: nodeStyle.lineHeightPercent,
        lineHeightPercentFontSize: nodeStyle.lineHeightPercentFontSize,
        lineHeightUnit: nodeStyle.lineHeightUnit,
        textAlignHorizontal: nodeStyle.textAlignHorizontal,
        textAlignVertical: nodeStyle.textAlignVertical,
        textCase: nodeStyle.textCase,
        textDecoration: nodeStyle.textDecoration,
        paragraphIndent: nodeStyle.paragraphIndent,
        paragraphSpacing: nodeStyle.paragraphSpacing,
        textAutoResize: nodeStyle.textAutoResize,
      };
    }

    // 提取文本样式覆盖
    if ("characterStyleOverrides" in node && node.characterStyleOverrides) {
      styleInfo.characterStyleOverrides = (node as any).characterStyleOverrides;
    }
    if ("styleOverrideTable" in node && node.styleOverrideTable) {
      styleInfo.styleOverrideTable = (node as any).styleOverrideTable;
    }

    // 提取布局信息
    if ("layoutMode" in node && node.layoutMode) {
      styleInfo.layoutMode = node.layoutMode;
    }
    if ("layoutAlign" in node) {
      styleInfo.layoutAlign = (node as any).layoutAlign;
    }
    if ("layoutGrow" in node && node.layoutGrow !== undefined) {
      styleInfo.layoutGrow = (node as any).layoutGrow;
    }
    if ("layoutPositioning" in node) {
      styleInfo.layoutPositioning = (node as any).layoutPositioning;
    }
    if ("primaryAxisAlignItems" in node) {
      styleInfo.primaryAxisAlignItems = (node as any).primaryAxisAlignItems;
    }
    if ("counterAxisAlignItems" in node) {
      styleInfo.counterAxisAlignItems = (node as any).counterAxisAlignItems;
    }
    if ("primaryAxisSizingMode" in node) {
      styleInfo.primaryAxisSizingMode = (node as any).primaryAxisSizingMode;
    }
    if ("counterAxisSizingMode" in node) {
      styleInfo.counterAxisSizingMode = (node as any).counterAxisSizingMode;
    }
    if ("paddingLeft" in node && node.paddingLeft !== undefined) {
      styleInfo.paddingLeft = node.paddingLeft;
    }
    if ("paddingRight" in node && node.paddingRight !== undefined) {
      styleInfo.paddingRight = node.paddingRight;
    }
    if ("paddingTop" in node && node.paddingTop !== undefined) {
      styleInfo.paddingTop = node.paddingTop;
    }
    if ("paddingBottom" in node && node.paddingBottom !== undefined) {
      styleInfo.paddingBottom = node.paddingBottom;
    }
    if ("itemSpacing" in node && node.itemSpacing !== undefined) {
      styleInfo.itemSpacing = node.itemSpacing;
    }
    if ("counterAxisSpacing" in node && node.counterAxisSpacing !== undefined) {
      styleInfo.counterAxisSpacing = (node as any).counterAxisSpacing;
    }
    if ("layoutWrap" in node) {
      styleInfo.layoutWrap = (node as any).layoutWrap;
    }

    // 提取尺寸约束
    if ("minWidth" in node && node.minWidth !== undefined) {
      styleInfo.minWidth = (node as any).minWidth;
    }
    if ("maxWidth" in node && node.maxWidth !== undefined) {
      styleInfo.maxWidth = (node as any).maxWidth;
    }
    if ("minHeight" in node && node.minHeight !== undefined) {
      styleInfo.minHeight = (node as any).minHeight;
    }
    if ("maxHeight" in node && node.maxHeight !== undefined) {
      styleInfo.maxHeight = (node as any).maxHeight;
    }

    // 提取约束
    if ("constraints" in node && node.constraints) {
      styleInfo.constraints = {
        horizontal: (node.constraints as any).horizontal,
        vertical: (node.constraints as any).vertical,
      };
    }

    // 提取裁剪和溢出
    if ("clipsContent" in node && node.clipsContent !== undefined) {
      styleInfo.clipsContent = (node as any).clipsContent;
    }
    if ("overflowDirection" in node) {
      styleInfo.overflowDirection = (node as any).overflowDirection;
    }

    // 提取网格
    if ("layoutGrids" in node && node.layoutGrids) {
      styleInfo.layoutGrids = (node as any).layoutGrids;
    }

    // 提取导出设置
    if ("exportSettings" in node && node.exportSettings) {
      styleInfo.exportSettings = (node as any).exportSettings;
    }

    // 提取可见性和锁定
    if ("visible" in node && node.visible !== undefined) {
      styleInfo.visible = node.visible;
    }
    if ("locked" in node && node.locked !== undefined) {
      styleInfo.locked = (node as any).locked;
    }

    // 提取图片引用
    if ("imageRef" in node) {
      styleInfo.imageRef = (node as any).imageRef;
    }
    if ("preserveRatio" in node && node.preserveRatio !== undefined) {
      styleInfo.preserveRatio = (node as any).preserveRatio;
    }

    // 提取组件相关
    if ("componentId" in node) {
      styleInfo.componentId = (node as any).componentId;
    }
    if ("componentProperties" in node) {
      styleInfo.componentProperties = (node as any).componentProperties;
    }
    if ("componentPropertyReferences" in node) {
      styleInfo.componentPropertyReferences = (
        node as any
      ).componentPropertyReferences;
    }
    if ("overrides" in node) {
      styleInfo.overrides = (node as any).overrides;
    }

    // 提取原型交互
    if ("transitionNodeID" in node) {
      styleInfo.transitionNodeID = (node as any).transitionNodeID;
    }
    if ("transitionDuration" in node) {
      styleInfo.transitionDuration = (node as any).transitionDuration;
    }
    if ("transitionEasing" in node) {
      styleInfo.transitionEasing = (node as any).transitionEasing;
    }
    if ("reactions" in node) {
      styleInfo.reactions = (node as any).reactions;
    }

    // 提取样式引用
    if ("styles" in node && node.styles) {
      styleInfo.styles = (node as any).styles;
    }

    // 提取向量相关
    if ("vectorNetwork" in node) {
      styleInfo.vectorNetwork = (node as any).vectorNetwork;
    }
    if ("handleMirroring" in node) {
      styleInfo.handleMirroring = (node as any).handleMirroring;
    }

    // 提取布尔运算
    if ("booleanOperation" in node) {
      styleInfo.booleanOperation = (node as any).booleanOperation;
    }

    // 递归提取子节点样式
    if (node.children && Array.isArray(node.children)) {
      styleInfo.children = node.children.map((child) =>
        this.extractNodeStyles(child)
      );
    }

    return styleInfo;
  }

  /**
   * 提取文件所有样式
   */
  extractFileStyles(
    document: FigmaNode,
    components?: Record<string, any>,
    styles?: Record<string, any>
  ) {
    return {
      documentStyles: this.extractNodeStyles(document),
      components: components || {},
      styles: styles || {},
    };
  }
}

export const styleExtractor = new StyleExtractor();
