# CLI Interface

## Requirements

### Requirement: Command-Line Execution

The system SHALL provide a command-line interface for executing style extraction operations.

#### Scenario: Run with default configuration

- **GIVEN** configuration is set in .env file
- **WHEN** executing `npm run dev`
- **THEN** the system runs with configuration from environment
- **AND** extracts styles for the configured file and node
- **AND** displays progress in the terminal

#### Scenario: Override node ID via command line

- **GIVEN** a node ID is provided as a command-line argument
- **WHEN** executing with the argument
- **THEN** the system uses the provided node ID
- **AND** overrides any node ID from configuration

### Requirement: Progress Logging

The system SHALL provide clear, informative progress messages during execution.

#### Scenario: Initialization logging

- **GIVEN** the application starts
- **WHEN** initialization begins
- **THEN** the system logs each initialization step
- **AND** indicates progress (e.g., "Step 1/3: Loading configuration")
- **AND** confirms completion of each step

#### Scenario: Style extraction logging

- **GIVEN** style extraction is in progress
- **WHEN** processing nodes
- **THEN** the system logs the current operation
- **AND** indicates the number of nodes processed
- **AND** shows file paths for generated outputs

#### Scenario: Success confirmation

- **GIVEN** operations complete successfully
- **WHEN** the process finishes
- **THEN** the system displays a success message
- **AND** summarizes what was accomplished
- **AND** lists output file locations

#### Scenario: Error reporting

- **GIVEN** an error occurs during execution
- **WHEN** the error is caught
- **THEN** the system displays a clear error message
- **AND** provides context about what failed
- **AND** suggests potential remediation steps if applicable

### Requirement: Colored Terminal Output

The system SHALL use colored output to improve readability of CLI messages.

#### Scenario: Status colors

- **GIVEN** different types of log messages
- **WHEN** displaying in the terminal
- **THEN** info messages use blue color
- **AND** success messages use green color
- **AND** warning messages use yellow color
- **AND** error messages use red color

#### Scenario: Highlighted information

- **GIVEN** important values in log messages
- **WHEN** displaying logs
- **THEN** file paths, IDs, and counts are highlighted
- **AND** uses consistent color scheme for similar data types

### Requirement: Build Scripts

The system SHALL provide npm scripts for common development and production tasks.

#### Scenario: Development execution

- **GIVEN** changes to TypeScript source
- **WHEN** running `npm run dev`
- **THEN** the system executes using tsx without compilation
- **AND** reflects latest code changes immediately

#### Scenario: Production build

- **GIVEN** the need to create a production build
- **WHEN** running `npm run build`
- **THEN** the system compiles TypeScript to JavaScript
- **AND** generates declaration files
- **AND** creates source maps
- **AND** outputs to `dist/` directory

#### Scenario: Type checking

- **GIVEN** TypeScript source files
- **WHEN** running `npm run type-check`
- **THEN** the system validates types without emitting files
- **AND** reports any type errors
