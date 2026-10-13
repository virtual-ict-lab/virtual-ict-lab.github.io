# virtual-ict-lab.github.io

## Development

Use Node.js 22 (22.18 or newer) and npm 10. Run commands from the project root.

```bash
npm ci
npm run docs:dev
```

Edit Markdown files in `docs/` and preview changes at the URL shown in the terminal.

## Check before pushing

Run the install and build checks with the same Node.js and npm versions as CI:

```bash
npx --yes --package=node@22 --package=npm@10 -c \
  'npm ci && NODE_OPTIONS=--max_old_space_size=8192 npm run docs:build'
```
