# Style Extraction

## Requirements

### Requirement: Node Style Parsing

The system SHALL extract style properties from Figma nodes into structured data.

#### Scenario: Layout properties extraction

- **GIVEN** a Figma node with layout properties
- **WHEN** extracting styles
- **THEN** the system captures position (x, y)
- **AND** captures size (width, height)
- **AND** captures padding, spacing, and alignment if present
- **AND** captures constraints and positioning rules

#### Scenario: Typography properties extraction

- **GIVEN** a Text node with typography styles
- **WHEN** extracting styles
- **THEN** the system captures font family, size, and weight
- **AND** captures line height and letter spacing
- **AND** captures text alignment and decoration
- **AND** normalizes values to CSS-compatible formats

#### Scenario: Color properties extraction

- **GIVEN** a node with fill and stroke colors
- **WHEN** extracting styles
- **THEN** the system captures fill colors in hex or rgba format
- **AND** captures stroke colors and widths
- **AND** handles multiple fills and strokes
- **AND** converts Figma color format (0-1) to CSS format (0-255)

#### Scenario: Effects extraction

- **GIVEN** a node with shadow or blur effects
- **WHEN** extracting styles
- **THEN** the system captures shadow properties (x, y, blur, spread, color)
- **AND** captures blur filter values
- **AND** converts to CSS box-shadow and filter syntax

### Requirement: Style Grouping by Root Node

The system SHALL organize extracted styles by their root-level parent nodes.

#### Scenario: Root node identification

- **GIVEN** a node tree with multiple levels
- **WHEN** processing nodes
- **THEN** the system identifies top-level nodes as root nodes
- **AND** groups all descendant styles under their root node
- **AND** uses root node ID for organization

#### Scenario: Nested node traversal

- **GIVEN** a root node with nested children
- **WHEN** extracting styles
- **THEN** the system recursively processes all child nodes
- **AND** maintains parent-child relationships
- **AND** associates each style with its root ancestor

### Requirement: Design Token Extraction

The system SHALL identify and extract design tokens from style properties.

#### Scenario: Color token extraction

- **GIVEN** nodes with consistent color usage
- **WHEN** extracting styles
- **THEN** the system identifies reusable color values
- **AND** formats them for use as CSS custom properties

#### Scenario: Spacing token extraction

- **GIVEN** nodes with consistent spacing patterns
- **WHEN** extracting styles
- **THEN** the system identifies reusable spacing values (padding, margins)
- **AND** maintains spacing consistency across nodes

## Data Structures

### StyleNode Format

```typescript
interface StyleNode {
  id: string;
  name: string;
  type: string;
  rootId: string;
  styles: {
    layout?: LayoutStyles;
    typography?: TypographyStyles;
    colors?: ColorStyles;
    effects?: EffectStyles;
  };
}
```

### Storage Format

- JSON output with metadata header
- Array of style nodes grouped by root ID
- Timestamp and version information included
