# virtual-ict-lab.github.io

## dev guide

```bash
npm install
npm run docs:dev
```

## test

```bash
npm run docs:build
```

```bash
npx --yes --package=node@22 --package=npm@10 -c \
  'npm ci && NODE_OPTIONS=--max_old_space_size=8192 npm run docs:build'
```
