# StarWars integration

<hr>

## Development

### Prerequisites

- Node.js
- Docker
- Docker compose
- AWS CLI
- AWS SAM CLI
- BetterLeaks

### Install dependencies

```bash
npm install
```

### 1. Start DynamoDB with Floci

```bash
npm run dynamodb-local:start
```

### 2. Run the application locally with SAM CLI

First build the project

```bash
npm run build
```

Then run the application locally

```bash
npm run start:local
```

## Testing

```bash
npm run test
```

## Linting

```bash
npm run biome:check
```

## Security

```bash
npm run secrets:protect
```

## Deployment

```bash
npm run deploy:guided
```

