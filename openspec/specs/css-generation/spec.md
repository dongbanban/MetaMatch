# CSS Generation

## Requirements

### Requirement: CSS File Generation

The system SHALL generate CSS files from extracted Figma node styles.

#### Scenario: One file per root node

- **GIVEN** styles grouped by root node
- **WHEN** generating CSS files
- **THEN** the system creates one CSS file per root node
- **AND** names the file using the pattern `[fileId]_[rootNodeId]_[nodeName].css`
- **AND** places files in the `css/` output directory

#### Scenario: CSS class generation

- **GIVEN** a StyleNode with extracted properties
- **WHEN** generating CSS
- **THEN** the system creates a CSS class using the node name
- **AND** includes all applicable style properties
- **AND** uses valid CSS property names and values
- **AND** maintains proper CSS syntax

### Requirement: CSS Property Mapping

The system SHALL convert Figma style properties to valid CSS properties.

#### Scenario: Layout to CSS

- **GIVEN** layout properties (position, size, padding)
- **WHEN** generating CSS
- **THEN** the system maps to CSS properties (left, top, width, height, padding)
- **AND** includes appropriate units (px)

#### Scenario: Typography to CSS

- **GIVEN** typography properties
- **WHEN** generating CSS
- **THEN** the system maps to font-family, font-size, font-weight, line-height, letter-spacing
- **AND** uses proper CSS units and values

#### Scenario: Colors to CSS

- **GIVEN** fill and stroke colors
- **WHEN** generating CSS
- **THEN** the system maps to background-color, color, border-color
- **AND** uses hex or rgba format as appropriate

#### Scenario: Effects to CSS

- **GIVEN** shadow and blur effects
- **WHEN** generating CSS
- **THEN** the system maps to box-shadow and filter properties
- **AND** combines multiple shadows correctly
- **AND** uses proper CSS shadow syntax

### Requirement: File Organization

The system SHALL organize generated CSS files in a structured output directory.

#### Scenario: Output directory creation

- **GIVEN** CSS files need to be written
- **WHEN** generation starts
- **THEN** the system creates the `css/` directory if it doesn't exist
- **AND** creates subdirectories by file ID if needed

#### Scenario: File naming convention

- **GIVEN** a root node with styles
- **WHEN** creating the CSS file
- **THEN** the filename includes file ID, root node ID, and sanitized node name
- **AND** special characters in names are replaced with underscores or removed
- **AND** the `.css` extension is added

### Requirement: CSS File Structure

The system SHALL generate well-formatted, readable CSS files.

#### Scenario: File header comments

- **GIVEN** a CSS file being generated
- **WHEN** writing the file
- **THEN** the system includes a header comment with metadata
- **AND** metadata includes generation timestamp and source node information

#### Scenario: CSS formatting

- **GIVEN** CSS class rules
- **WHEN** writing to file
- **THEN** the system uses proper indentation
- **AND** each property on a separate line
- **AND** consistent spacing around colons and semicolons
- **AND** proper opening/closing brace placement
