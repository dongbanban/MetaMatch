/**
 * CSS 生成工具 - 负责将 Figma 样式属性转换为 CSS 样式
 */

/**
 * 将 RGB 颜色对象转换为 CSS rgba 字符串
 */
function rgbToCSS(color: {
  r: number;
  g: number;
  b: number;
  a: number;
}): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * 转换背景颜色
 */
function convertBackgroundColor(styles: any): string[] {
  const cssRules: string[] = [];

  if (styles.backgroundColor) {
    cssRules.push(`  background-color: ${rgbToCSS(styles.backgroundColor)};`);
  }

  return cssRules;
}

/**
 * 转换填充样式
 */
function convertFills(styles: any): string[] {
  const cssRules: string[] = [];

  if (styles.fills && Array.isArray(styles.fills) && styles.fills.length > 0) {
    for (const fill of styles.fills) {
      if (fill.type === "SOLID" && fill.color) {
        cssRules.push(`  background: ${rgbToCSS(fill.color)};`);
      }
    }
  }

  return cssRules;
}

/**
 * 转换边框样式
 */
function convertStrokes(styles: any): string[] {
  const cssRules: string[] = [];

  if (
    styles.strokes &&
    Array.isArray(styles.strokes) &&
    styles.strokes.length > 0
  ) {
    for (const stroke of styles.strokes) {
      if (stroke.type === "SOLID" && stroke.color) {
        const width = styles.strokeWeight || 1;
        cssRules.push(`  border: ${width}px solid ${rgbToCSS(stroke.color)};`);
      }
    }
  }

  return cssRules;
}

/**
 * 转换圆角样式
 */
function convertBorderRadius(styles: any): string[] {
  const cssRules: string[] = [];

  if (styles.cornerRadius !== undefined) {
    cssRules.push(`  border-radius: ${styles.cornerRadius}px;`);
  }

  return cssRules;
}

/**
 * 转换布局相关样式
 */
function convertLayout(styles: any): string[] {
  const cssRules: string[] = [];

  // 尺寸
  if (styles.absoluteBoundingBox) {
    if (styles.absoluteBoundingBox.width !== undefined) {
      cssRules.push(`  width: ${styles.absoluteBoundingBox.width}px;`);
    }
    if (styles.absoluteBoundingBox.height !== undefined) {
      cssRules.push(`  height: ${styles.absoluteBoundingBox.height}px;`);
    }
  }

  // Flexbox 布局
  if (styles.layoutMode) {
    cssRules.push(`  display: flex;`);

    if (styles.layoutMode === "HORIZONTAL") {
      cssRules.push(`  flex-direction: row;`);
    } else if (styles.layoutMode === "VERTICAL") {
      cssRules.push(`  flex-direction: column;`);
    }
  }

  // 内边距
  if (styles.paddingLeft !== undefined) {
    cssRules.push(`  padding-left: ${styles.paddingLeft}px;`);
  }
  if (styles.paddingRight !== undefined) {
    cssRules.push(`  padding-right: ${styles.paddingRight}px;`);
  }
  if (styles.paddingTop !== undefined) {
    cssRules.push(`  padding-top: ${styles.paddingTop}px;`);
  }
  if (styles.paddingBottom !== undefined) {
    cssRules.push(`  padding-bottom: ${styles.paddingBottom}px;`);
  }

  // 间距
  if (styles.itemSpacing !== undefined) {
    cssRules.push(`  gap: ${styles.itemSpacing}px;`);
  }

  // 对齐
  if (styles.counterAxisAlignItems) {
    const alignMap: Record<string, string> = {
      CENTER: "center",
      MIN: "flex-start",
      MAX: "flex-end",
      BASELINE: "baseline",
    };
    const alignValue = alignMap[styles.counterAxisAlignItems];
    if (alignValue) {
      cssRules.push(`  align-items: ${alignValue};`);
    }
  }

  if (styles.primaryAxisAlignItems) {
    const justifyMap: Record<string, string> = {
      MIN: "flex-start",
      CENTER: "center",
      MAX: "flex-end",
      SPACE_BETWEEN: "space-between",
    };
    const justifyValue = justifyMap[styles.primaryAxisAlignItems];
    if (justifyValue) {
      cssRules.push(`  justify-content: ${justifyValue};`);
    }
  }

  return cssRules;
}

/**
 * 转换文本样式
 */
function convertTextStyle(styles: any): string[] {
  const cssRules: string[] = [];

  if (styles.style) {
    const textStyle = styles.style;

    if (textStyle.fontFamily) {
      cssRules.push(`  font-family: '${textStyle.fontFamily}', sans-serif;`);
    }

    if (textStyle.fontSize) {
      cssRules.push(`  font-size: ${textStyle.fontSize}px;`);
    }

    if (textStyle.fontWeight) {
      cssRules.push(`  font-weight: ${textStyle.fontWeight};`);
    }

    if (textStyle.lineHeightPx) {
      cssRules.push(`  line-height: ${textStyle.lineHeightPx}px;`);
    }

    if (textStyle.letterSpacing) {
      cssRules.push(`  letter-spacing: ${textStyle.letterSpacing}px;`);
    }

    if (textStyle.textAlignHorizontal) {
      const alignMap: Record<string, string> = {
        LEFT: "left",
        CENTER: "center",
        RIGHT: "right",
        JUSTIFIED: "justify",
      };
      const align = alignMap[textStyle.textAlignHorizontal];
      if (align) {
        cssRules.push(`  text-align: ${align};`);
      }
    }
  }

  return cssRules;
}

/**
 * 转换透明度
 */
function convertOpacity(styles: any): string[] {
  const cssRules: string[] = [];

  if (styles.opacity !== undefined && styles.opacity !== 1) {
    cssRules.push(`  opacity: ${styles.opacity};`);
  }

  return cssRules;
}

/**
 * 将 Figma 样式对象转换为 CSS 字符串
 * @param id - 节点 ID
 * @param name - 节点名称
 * @param styles - 样式对象
 * @returns CSS 字符串
 */
export function generateCSS(id: string, name: string, styles: any): string {
  // CSS 类名不能以数字开头，所以添加前缀 'figma-'
  // 将所有非字母数字字符替换为下划线
  const cleanId = id.replace(/[^a-zA-Z0-9]/g, "_");
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, "_");
  const className = `figma-${cleanId}_${cleanName}_class`;

  const cssRules: string[] = [`.${className} {`];

  // 按顺序转换各类样式
  cssRules.push(...convertBackgroundColor(styles));
  cssRules.push(...convertFills(styles));
  cssRules.push(...convertStrokes(styles));
  cssRules.push(...convertBorderRadius(styles));
  cssRules.push(...convertLayout(styles));
  cssRules.push(...convertTextStyle(styles));
  cssRules.push(...convertOpacity(styles));

  cssRules.push(`}`);

  return cssRules.join("\n");
}

/**
 * 生成 CSS 文件内容（带注释）
 * @param id - 节点 ID
 * @param name - 节点名称
 * @param styles - 样式对象
 * @returns 完整的 CSS 文件内容
 */
export function generateCSSFileContent(
  id: string,
  name: string,
  styles: any
): string {
  const header = `/**
 * CSS for Figma Node: ${name}
 * Node ID: ${id}
 * Generated at: ${new Date().toISOString()}
 */

`;

  const cssContent = generateCSS(id, name, styles);

  return header + cssContent + "\n";
}
