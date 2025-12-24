# CSS Generation Design

## Architecture

### Module Structure

- `utils/file-generator.ts` - CSS file creation logic
- `process-styles.ts` - Orchestrates parsing and generation

### Key Functions

```typescript
function createCSSFiles(styleNodes: StyleNode[], outputDir: string): string[];

function generateCSSClass(node: StyleNode): string;

function mapStylesToCSS(styles: NodeStyles): Record<string, string>;
```

## Implementation Details

### Property Mapping Table

| Figma Property   | CSS Property     | Notes             |
| ---------------- | ---------------- | ----------------- |
| x, y             | left, top        | Position values   |
| width, height    | width, height    | Size values       |
| fills            | background-color | First solid fill  |
| strokes          | border           | Border properties |
| effects (shadow) | box-shadow       | Combined shadows  |
| effects (blur)   | filter           | Blur filters      |
| fontFamily       | font-family      | Typography        |
| fontSize         | font-size        | Typography        |
| fontWeight       | font-weight      | Typography        |
| lineHeight       | line-height      | Typography        |
| letterSpacing    | letter-spacing   | Typography        |

### File Generation Process

1. **Group by root node** - StyleNodes already grouped
2. **Generate CSS for each group** - Create class rules
3. **Format CSS** - Apply indentation and structure
4. **Write files** - Write to output directory with naming convention
5. **Return paths** - Return list of created file paths

### CSS Formatting

```css
/* Generated from Figma node: [Node Name] */
/* File ID: [fileId] | Node ID: [nodeId] */
/* Generated at: [timestamp] */

.[class-name] {
  property: value;
  property: value;
}
```

### Filename Sanitization

- Replace spaces with underscores
- Remove special characters except underscore and hyphen
- Convert to lowercase for consistency
- Pattern: `{fileId}_{nodeId}_{sanitizedName}.css`

## Dependencies

- Node.js `fs` module for file operations
- Node.js `path` module for path handling
- StyleNode types from `types.ts`
