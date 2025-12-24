# Figma API Client Design

## Architecture

### Module Structure

- `figma/client.ts` - Main `FigmaClient` class
- HTTP client: Axios for REST API communication
- Base URL: `https://api.figma.com/v1`

### Class Design

```typescript
class FigmaClient {
  constructor(accessToken: string);
  async validateToken(): Promise<boolean>;
  async getFile(fileId: string): Promise<FigmaFileResponse>;
  async getNode(fileId: string, nodeId: string): Promise<FigmaNode>;
}
```

## Implementation Details

### Authentication

- Token stored in instance property (never logged or exposed)
- Bearer token added to Authorization header for all requests
- Token validation happens during initialization via test API call

### Error Handling

- Network errors caught and wrapped in custom error types
- API error responses (4xx, 5xx) converted to meaningful error messages
- Invalid responses trigger validation errors

### Node ID Normalization

- Utility function in `utils/validator.ts`
- Regex pattern: `/^(\d+)[:-](\d+)$/`
- Always normalize to colon format before API calls

## Dependencies

- `axios`: HTTP client library
- Custom error classes from `utils/errors.ts`
- Type definitions from `types.ts`
