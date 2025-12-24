# CLI Interface Design

## Architecture

### Module Structure

- `src/index.ts` - Main entry point and CLI orchestration
- `utils/logger.ts` - Logging utility with colored output

### Entry Point Flow

```typescript
// Main execution flow
async function main() {
  const metaMatch = new MetaMatch();
  await metaMatch.initialize();
  await metaMatch.fetchNodeStyles(cmdLineNodeId);
}

main().catch((error) => {
  logger.error("Fatal error", error);
  process.exit(1);
});
```

## Implementation Details

### Logger Utility

```typescript
class Logger {
  info(message: string, data?: any): void;
  success(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, error?: Error): void;
}
```

Uses `chalk` for colored output:

- Info: `chalk.blue`
- Success: `chalk.green`
- Warning: `chalk.yellow`
- Error: `chalk.red`
- Highlights: `chalk.cyan` for paths/IDs, `chalk.bold` for emphasis

### Command-Line Argument Parsing

- Access via `process.argv`
- Simple positional argument for node ID override
- Format: `npm run dev -- [nodeId]`

### NPM Scripts

```json
{
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc && vite build",
    "type-check": "tsc --noEmit",
    "start": "node dist/index.js"
  }
}
```

### Error Handling

- Global try-catch in main function
- Errors logged with stack traces in development
- Clean error messages for user-facing errors
- Process exits with code 1 on fatal errors

### Progress Indicators

- Step-by-step progress: "Step 1/3: ..."
- Operation descriptions: "Loading...", "Processing...", "Writing..."
- Completion confirmations: "✓ Success" messages
- Summary statistics: counts, file paths, durations

## Dependencies

- `chalk` - Terminal colors and styling
- Node.js `process.argv` - Command-line arguments
- Node.js `process.exit()` - Exit code handling
