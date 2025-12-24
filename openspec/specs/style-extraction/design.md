# Style Extraction Design

## Architecture

### Module Structure

- `utils/style-extractor.ts` - Main extraction logic
- `utils/style-parser.ts` - Parse JSON into StyleNodes
- `types.ts` - Type definitions for style structures

### Key Classes

```typescript
class StyleExtractor {
  extractNodeStyles(node: FigmaNode): StyleNode[];
  private extractLayout(node: FigmaNode): LayoutStyles;
  private extractTypography(node: FigmaNode): TypographyStyles;
  private extractColors(node: FigmaNode): ColorStyles;
  private extractEffects(node: FigmaNode): EffectStyles;
}
```

## Implementation Patterns

### Recursive Node Traversal

- Depth-first traversal of node tree
- Each node processed for style properties
- Root ID propagated to all descendants

### Color Conversion

- Figma uses 0-1 range for RGB values
- Conversion formula: `Math.round(value * 255)`
- Alpha channel preserved for rgba values
- Hex format for opaque colors

### Effect Processing

- Box shadows: offset-x, offset-y, blur-radius, spread-radius, color
- Drop shadows and inner shadows handled separately
- Blur effects converted to CSS filter syntax

### Type Safety

- Strict TypeScript types for all style properties
- Optional chaining for potentially missing properties
- Type guards for node type checking

## Dependencies

- Figma node structures from API response
- CSS value normalization utilities
- Custom type definitions from `types.ts`
