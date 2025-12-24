# Configuration Management

## Requirements

### Requirement: Environment Variable Loading

The system SHALL load configuration from environment variables and .env files.

#### Scenario: Load from .env file

- **GIVEN** a `.env` file exists in the project root
- **WHEN** the application initializes
- **THEN** the system loads environment variables from the file
- **AND** makes them available to the application

#### Scenario: Environment variable precedence

- **GIVEN** both system environment variables and .env file exist
- **WHEN** loading configuration
- **THEN** system environment variables take precedence over .env values
- **AND** .env provides default values when system vars are not set

### Requirement: Figma Configuration

The system SHALL extract and validate Figma file information from configuration.

#### Scenario: Parse Figma URL

- **GIVEN** a FIGMA_FILE_URL environment variable
- **WHEN** initializing configuration
- **THEN** the system extracts the file ID from the URL
- **AND** extracts the optional node ID from the URL query parameter
- **AND** validates the URL format

#### Scenario: Direct file ID configuration

- **GIVEN** file ID and node ID provided directly
- **WHEN** configuration is requested
- **THEN** the system accepts them without URL parsing
- **AND** validates the ID formats

#### Scenario: Missing required configuration

- **GIVEN** FIGMA_ACCESS_TOKEN is not provided
- **WHEN** initializing configuration
- **THEN** the system throws a configuration error
- **AND** provides clear guidance on required variables

### Requirement: Configuration Validation

The system SHALL validate all configuration values before use.

#### Scenario: Token validation

- **GIVEN** a FIGMA_ACCESS_TOKEN is provided
- **WHEN** validating configuration
- **THEN** the system checks the token is non-empty
- **AND** checks the token format is valid

#### Scenario: File ID validation

- **GIVEN** a file ID from URL or direct input
- **WHEN** validating configuration
- **THEN** the system validates the file ID format
- **AND** ensures it matches Figma's ID pattern

### Requirement: Configuration Access

The system SHALL provide centralized access to configuration throughout the application.

#### Scenario: Singleton configuration manager

- **GIVEN** multiple modules need configuration
- **WHEN** accessing configuration
- **THEN** all modules use the same configuration instance
- **AND** configuration is initialized once at startup
- **AND** values remain consistent throughout execution

## Configuration Schema

### Required Variables

- `FIGMA_ACCESS_TOKEN` - Figma Personal Access Token

### Optional Variables

- `FIGMA_FILE_URL` - Full Figma file URL (alternative to separate ID fields)
- `FIGMA_FILE_ID` - Figma file ID (if not using URL)
- `FIGMA_NODE_ID` - Specific node ID to fetch (optional)

### URL Format

`https://www.figma.com/file/{FILE_ID}/{FILE_NAME}?node-id={NODE_ID}`

Example:
`https://www.figma.com/file/abc123def456/My-Design?node-id=123-456`
