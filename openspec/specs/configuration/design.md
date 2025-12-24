# Configuration Management Design

## Architecture

### Module Structure

- `config/index.ts` - ConfigManager singleton class
- Uses `dotenv` package for .env file loading

### Class Design

```typescript
class ConfigManager {
  private config: MetaMatchConfig | null = null;

  initialize(): void;
  getConfig(): MetaMatchConfig;
  private parseFileUrl(url: string): { fileId: string; nodeId?: string };
  private validateConfig(config: MetaMatchConfig): void;
}

interface MetaMatchConfig {
  token: string;
  fileId: string;
  nodeId?: string;
}
```

## Implementation Details

### Initialization Sequence

1. **Load environment** - Call `dotenv.config()`
2. **Extract values** - Read from `process.env`
3. **Parse URL** - If FIGMA_FILE_URL provided, extract IDs
4. **Validate** - Check required fields present and valid
5. **Store** - Cache in singleton instance

### URL Parsing

- Regex pattern: `/\/file\/([^\/]+)/` for file ID
- Query parameter parsing for `node-id`
- Node ID normalization (dash to colon format)

### Error Handling

- Missing token → Throw with clear message about token requirement
- Invalid URL → Throw with URL format guidance
- Missing file ID → Throw with configuration instructions

### Singleton Pattern

```typescript
export const configManager = new ConfigManager();
```

- Single instance exported
- All modules import the same instance
- Initialize once in main entry point
- Access config throughout application lifecycle

## Dependencies

- `dotenv` - Environment variable loading
- Node.js `process.env` - Environment access
- `utils/validator.ts` - ID validation utilities
