# Figma API Client

## Requirements

### Requirement: Figma API Authentication

The system SHALL authenticate with the Figma REST API using a Personal Access Token.

#### Scenario: Valid token authentication

- **GIVEN** a valid Figma Personal Access Token is provided
- **WHEN** the client initializes
- **THEN** API requests include the token in the Authorization Bearer header
- **AND** the system validates the token by making a test API call

#### Scenario: Invalid token rejection

- **GIVEN** an invalid or expired token is provided
- **WHEN** token validation occurs
- **THEN** the system throws an authentication error
- **AND** initialization fails with a clear error message

### Requirement: Figma File Access

The system SHALL retrieve Figma file information and node data via the Figma REST API.

#### Scenario: Fetch entire file

- **GIVEN** a valid file ID
- **WHEN** requesting file data without a node ID
- **THEN** the system retrieves the complete document structure
- **AND** returns metadata including name, lastModified, version, and document tree

#### Scenario: Fetch specific node

- **GIVEN** a valid file ID and node ID
- **WHEN** requesting node data
- **THEN** the system retrieves only the specified node and its children
- **AND** returns the node structure with all properties

### Requirement: Node ID Validation

The system SHALL validate and normalize Figma node ID formats.

#### Scenario: Colon-separated format

- **GIVEN** a node ID in format "123:456"
- **WHEN** validating the node ID
- **THEN** the system accepts it as valid
- **AND** uses it in API requests

#### Scenario: Dash-separated format

- **GIVEN** a node ID in format "123-456"
- **WHEN** validating the node ID
- **THEN** the system normalizes it to colon format "123:456"
- **AND** uses the normalized version in API requests

#### Scenario: Invalid format rejection

- **GIVEN** a node ID in an invalid format
- **WHEN** validating the node ID
- **THEN** the system throws a validation error
- **AND** provides guidance on correct formats

### Requirement: API Rate Limit Handling

The system SHALL respect Figma API rate limits to prevent request failures.

#### Scenario: Batch operation delays

- **GIVEN** multiple API requests need to be made
- **WHEN** performing batch operations
- **THEN** the system implements appropriate delays between requests
- **AND** prevents rate limit violations

## External References

- Figma REST API Documentation: https://www.figma.com/developers/api
- Base API URL: `https://api.figma.com/v1`
- Key Endpoints:
  - `GET /files/:file_key` - Get file document
  - `GET /files/:file_key/nodes?ids=:node_id` - Get specific nodes
