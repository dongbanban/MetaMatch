# Project Context

## Purpose

MetaMatch is a Figma API-based tool for extracting node information and styles from Figma designs. The tool fetches design nodes, parses their style information (layout, typography, colors, effects, etc.), and generates CSS files for use in web development projects. It bridges the gap between design and implementation by automating the extraction of design specifications.

**Key Goals:**

- Extract style information from Figma nodes via the Figma REST API
- Parse and organize design tokens (colors, typography, spacing, shadows, etc.)
- Generate CSS files grouped by root nodes for easy integration
- Provide a clean CLI interface for designers and developers
- Support automated design-to-code workflows

## Tech Stack

- **Runtime**: Node.js 20+
- **Language**: TypeScript 5.3+ (strict mode enabled)
- **Module System**: ES Modules (ESNext)
- **Build Tool**: Vite 5.x
- **HTTP Client**: Axios 1.6+
- **CLI Styling**: Chalk 5.3+
- **Configuration**: dotenv for environment variables
- **Development**: tsx for TypeScript execution during development

## Project Conventions

### Code Style

- **File Headers**: All TypeScript files must include a header comment block:
  ```typescript
  /*
   * @file: [absolute file path]
   * @author: dongyang
   * @description: [brief description]
   */
  ```
- **TypeScript Configuration**:
  - Strict mode enabled (`strict: true`)
  - ESNext module resolution
  - Force consistent casing in file names
  - Generate declaration files and source maps
- **Naming Conventions**:
  - Classes: PascalCase (e.g., `FigmaClient`, `StorageManager`)
  - Functions/methods: camelCase (e.g., `fetchNodeStyles`, `validateToken`)
  - Files: kebab-case (e.g., `style-extractor.ts`, `file-generator.ts`)
  - Constants: UPPER_SNAKE_CASE
  - Interfaces: PascalCase with descriptive names (e.g., `FigmaNode`, `StyleNode`)
- **Path Aliases**: Use `@/` prefix for imports from `src/` directory
- **JSDoc**: Document all public functions and classes with JSDoc comments including parameters and return types
- **Console Logging**: Use the custom logger utility (`utils/logger.js`) instead of raw `console.log`

### Architecture Patterns

- **Modular Structure**: Code organized into focused modules:
  - `config/` - Configuration management
  - `figma/` - Figma API client and interactions
  - `storage/` - Data persistence and file operations
  - `utils/` - Shared utilities (logger, validator, parsers, generators)
- **Separation of Concerns**:
  - API client logic isolated in `FigmaClient` class
  - Style parsing separated from file generation
  - Configuration centralized in `configManager`
- **Error Handling**: Custom error classes in `utils/errors.ts`
- **Type Safety**: Comprehensive type definitions in `types.ts`
- **Single Responsibility**: Each module has a clear, focused purpose
- **Dependency Injection**: Core classes accept dependencies in constructors

### Testing Strategy

Currently no automated testing is configured. When adding tests, follow these guidelines:

- Use a testing framework compatible with TypeScript and ES Modules (e.g., Vitest)
- Place test files adjacent to source files with `.test.ts` or `.spec.ts` extension
- Mock Figma API calls for unit tests
- Test error handling paths and validation logic

### Git Workflow

- Follow OpenSpec workflow for changes (see `openspec/AGENTS.md`)
- Create proposals for new capabilities, breaking changes, or architecture shifts
- Changes stored in `openspec/changes/<change-id>/`
- Use kebab-case, verb-led change IDs (e.g., `add-batch-export`, `refactor-style-parser`)
- Validate proposals with `openspec validate <id> --strict` before implementation

## Capabilities

MetaMatch provides the following capabilities, each documented in detail in the specs directory:

- **[Figma API Client](specs/figma-api-client/spec.md)** - Authentication and communication with Figma REST API
- **[Configuration Management](specs/configuration/spec.md)** - Environment-based configuration loading and validation
- **[Style Extraction](specs/style-extraction/spec.md)** - Parsing and extracting style properties from Figma nodes
- **[CSS Generation](specs/css-generation/spec.md)** - Converting extracted styles to CSS files
- **[Data Storage](specs/data-storage/spec.md)** - Persisting extracted data as JSON files
- **[CLI Interface](specs/cli-interface/spec.md)** - Command-line interface with progress logging

## Important Constraints

- **API Rate Limits**: Figma API has rate limits; implement appropriate delays for batch operations
- **Node ID Format**: Must validate and normalize node IDs (support both `:` and `-` separators)
- **ES Modules Only**: Project strictly uses ES modules; all imports require `.js` extension
- **Node.js Built-ins**: External modules list must include all Node.js built-ins for Rollup
- **Token Security**: Figma personal access tokens must never be committed; use `.env` file
- **File Path Consistency**: Always use absolute paths in file headers and logging

## External Dependencies

### Figma REST API

- **Base URL**: `https://api.figma.com/v1`
- **Documentation**: https://www.figma.com/developers/api
- **Authentication**: Bearer token in Authorization header

### Required Environment Variables

- `FIGMA_ACCESS_TOKEN` - Personal access token from Figma account settings
- `FIGMA_FILE_URL` - Full Figma file URL (extracts file ID and optional node ID)
