---
date: 2026-10-13
author: mothue
category:
  - ガイドライン
tag:
  - テンプレート
---

# 記事を書く

::: tip お知らせ
GitHub Organizationに入っていない人はDiscordでmentionしてください．
:::

::: info 執筆中です
このガイドはまだ執筆中です．
:::

[[toc]]

## 手順

このリポジトリは，[virtual-ict-lab/virtual-ict-lab.github.io](https://github.com/virtual-ict-lab/virtual-ict-lab.github.io)にあります．

mainブランチには直でPushしないでください！！
1. （まだブランチを切っていない人は）自分のブランチを切る
2. cloneして記事を書く
3. PRを出す
4. 承認される
5. 公開

## push/PR前のテスト

```bash rust title="Bash" :no-line-numbers
npx --yes --package=node@22 --package=npm@10 -c \
  'npm ci && NODE_OPTIONS=--max_old_space_size=8192 npm run docs:build'
```

## 記事を書く際のガイド

### 名前空間を分ける

`posts/{handle_name}`で区切るようにすると混ざらない（と思います）ので，それを推奨しています．
`posts/{handle_name}/yyyymmdd-記事名.md` のようにするのをお勧めします．

### アセットや写真などの置き場

プロジェクトルートから，`./docs/.vuepress/public`配下に，名前空間を分けて置くことを推奨しています．
