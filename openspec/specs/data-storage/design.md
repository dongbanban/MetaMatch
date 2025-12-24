# Data Storage Design

## Architecture

### Module Structure

- `storage/index.ts` - StorageManager class
- Uses Node.js `fs/promises` for async file operations

### Class Design

```typescript
class StorageManager {
  private dataDir: string;

  constructor(dataDir: string);
  async initialize(): Promise<void>;
  async saveNodeStyles(
    metadata: StorageMetadata,
    styles: StyleNode[]
  ): Promise<string>;
  async readJSONFile(filePath: string): Promise<any>;
  private generateFilename(metadata: StorageMetadata): string;
}

interface StorageMetadata {
  fileId: string;
  fileName: string;
  lastModified: string;
  fetchedAt: string;
}
```

## Implementation Details

### Directory Management

- Default data directory: `./data`
- Created with `fs.mkdir` with `recursive: true` option
- Path resolution using Node.js `path` module

### File Operations

- **Write**: `fs.writeFile` with JSON.stringify (2-space indentation)
- **Read**: `fs.readFile` with UTF-8 encoding + JSON.parse
- **List**: `fs.readdir` to find matching files
- Error handling for ENOENT, EACCES, and JSON parse errors

### Filename Generation

```typescript
function generateFilename(metadata: StorageMetadata): string {
  const timestamp = Date.now();
  const nodeId = metadata.nodeId || "full";
  return `figma-node-styles-${metadata.fileId}-${nodeId}-${timestamp}.json`;
}
```

### JSON Structure

```json
{
  "metadata": {
    "fileId": "abc123",
    "fileName": "My Design File",
    "lastModified": "2025-12-24T10:00:00Z",
    "fetchedAt": "2025-12-24T10:30:00Z"
  },
  "styles": [
    {
      "id": "123:456",
      "name": "Button Primary",
      "type": "FRAME",
      "rootId": "123:400",
      "styles": {
        /* style properties */
      }
    }
  ]
}
```

## Dependencies

- Node.js `fs/promises` - Async file operations
- Node.js `path` - Path manipulation
- `types.ts` - Type definitions for StyleNode and metadata
