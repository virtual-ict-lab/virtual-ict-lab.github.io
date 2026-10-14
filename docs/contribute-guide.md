---
date: 2026-10-13
author: mothue
tag:
  - ガイドライン
  - テンプレート
---

# 記事を書く

<PageMeta />

::: tip お知らせ
GitHub Organizationに入っていない人はDiscordでmentionしてください．
:::

::: info 執筆中です
このガイドはまだ執筆中です．
:::

[[toc]]

## 必読

マークダウンの構文集：[markdown-guide.md](./posts/markdown-guide.md)

投稿のテンプレート：[posts/template.md](./posts/template.md)

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

### タグ

記事の分類にはタグを使います．技術名やテーマなど，関連記事を探す手掛かりになるものを付けてください．
記事の先頭のフロントマターに，1つでも配列形式で書きます：

```yaml
tag:
  - VuePress
  - npm
```

### 脚注・出典

本文に `[^名前]` を書き，`[^名前]: 内容` で脚注を定義します．
番号は本文に登場する順に自動で付き，脚注一覧はページ下部にまとめて表示されます．
本文の番号から脚注へ移動し，脚注の戻るリンクから本文に戻れます．
戻るリンク `↩︎` にホバーすると参照元の本文が表示され，プレビューの「本文へ戻る」からも移動できます．
キーボードでは `↩︎` を選ぶと表示され，Tabでプレビューのリンクへ移動，Escで閉じられます．

```md
この説明には補足があります[^note]．資料も参照できます[^source]．

[^note]: ここに補足を書きます．
[^source]: [資料のタイトル](https://example.com)
```

同じ名前を使うと同じ脚注を参照できます．名前は記事内で区別できるものにしてください．
定義は本文の途中でも末尾でも書けます．脚注内ではリンクや太字も使えます．

### 最終更新・読了目安の表示

通常はページ上部に自動表示されます．フロントマターで `pageMeta: false` にすると自動表示をOFFにできます．
本文に `<PageMeta />` を置くと上部の自動表示は止まるので，`pageMeta: false` を書かなくても好きな場所へ移動できます．
コード例やコメント内に書かれた `<PageMeta />` は判定に含めません．
たとえばタイトルの下に表示する場合：

```md
---
date: 2026-10-13
author: mothue
---

# 記事のタイトル

<PageMeta />

ここから本文を書きます．
```

個別に隠す場合は `<PageMeta :show-updated="false" />` または `<PageMeta :show-reading-time="false" />` を使います．
`pageMeta: false` にして `<PageMeta />` を置かなければ，どちらも表示されません．
最終更新日時はGit履歴，読了目安は本文から自動で取得します．読み込み用の `import` は不要です．

### 名前空間を分ける

`posts/{handle_name}`で区切るようにすると混ざらない（と思います）ので，それを推奨しています．
`posts/{handle_name}/yyyymmdd-記事名.md` のようにするのをお勧めします．

### アセットや写真などの置き場

プロジェクトルートから，`./docs/.vuepress/public`配下に，名前空間を分けて置くことを推奨しています．

### プロフィールカード

Markdown本文の好きな場所に，`AuthorProfile` を置けます．読み込み用の `import` は不要です．

```vue
<AuthorProfile
  name="ハンドルネーム"
  avatar="/icons/icon-192.png"
  bio="雑な自己紹介をここに書きます。"
  :links="[
    { label: 'GitHub', url: 'https://github.com/your_handle', icon: 'github' },
    { label: 'X', url: 'https://x.com/your_handle', icon: 'x' },
    { label: 'Webサイト', url: 'https://example.com' },
  ]"
/>
```

`name` は必須です．`avatar`・`bio`・`links` は省略できます．画像を省略すると人物アイコンが表示されます．
画像は `public` 配下に置き，`/mothue/avatar.png` のように指定します．
リンクは `label` と `url` を指定し，GitHub・Xは `icon` を付けるとアイコンボタンになります．
リンクは新しいタブで開きます．このカードは本文への表示用で，フロントマターの `author` とは独立しています．
