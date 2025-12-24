# Data Storage

## Requirements

### Requirement: JSON Data Persistence

The system SHALL save extracted style data to JSON files for later processing.

#### Scenario: Save node styles

- **GIVEN** extracted style nodes and metadata
- **WHEN** saving to storage
- **THEN** the system creates a JSON file in the `data/` directory
- **AND** includes metadata (file ID, file name, timestamps)
- **AND** includes all extracted style nodes
- **AND** uses a consistent filename pattern

#### Scenario: File naming convention

- **GIVEN** file ID, node ID, and timestamp
- **WHEN** creating the JSON filename
- **THEN** the system uses the pattern `figma-node-styles-{fileId}-{nodeId}-{timestamp}.json`
- **AND** ensures filenames are unique per extraction

#### Scenario: Data directory creation

- **GIVEN** the `data/` directory doesn't exist
- **WHEN** saving data
- **THEN** the system creates the directory automatically
- **AND** creates any necessary parent directories

### Requirement: JSON File Structure

The system SHALL organize JSON files with a consistent structure including metadata and data sections.

#### Scenario: Metadata section

- **GIVEN** extracted styles being saved
- **WHEN** creating JSON structure
- **THEN** the file includes a metadata object with:
  - `fileId` - Figma file identifier
  - `fileName` - Human-readable file name
  - `lastModified` - Figma file's last modified timestamp
  - `fetchedAt` - ISO 8601 timestamp of extraction

#### Scenario: Styles section

- **GIVEN** extracted style nodes
- **WHEN** creating JSON structure
- **THEN** the file includes a `styles` array
- **AND** each entry contains complete node style information
- **AND** maintains root node grouping information

### Requirement: File Read Operations

The system SHALL read and parse stored JSON files for processing.

#### Scenario: Load JSON file

- **GIVEN** a JSON file path
- **WHEN** reading the file
- **THEN** the system loads and parses the JSON content
- **AND** validates the structure
- **AND** returns typed objects

#### Scenario: Find latest file

- **GIVEN** multiple JSON files in the data directory
- **WHEN** searching for files to process
- **THEN** the system identifies the most recent file by timestamp
- **AND** returns its path for processing

### Requirement: Storage Initialization

The system SHALL initialize the storage system before use.

#### Scenario: Initialize storage manager

- **GIVEN** the application starts
- **WHEN** initializing storage
- **THEN** the system verifies the data directory exists or creates it
- **AND** sets up any necessary directory structure
- **AND** confirms write permissions
