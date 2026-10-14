---
date: 2026-10-13
author: mothue
excerpt: VuePressを構築して公開するまでの手順を爆速公開！
tag:
  - Tech
  - VuePress
  - npm
---

# VuePress 自分流爆速構築ガイド(2026年版)

<PageMeta />

::: info
この記事は執筆中です．今後随時更新されます．
:::

VuePressを構築してGitHub Pagesにデプロイしたので，手順をまとめておきます．VuePressを建てたい方の参考になると幸いです．

[[toc]]

## 環境

- node v26.10.0
- npm 11.19.1

## 導入する

`npm`で構築する場合です．`my-blog`の名前は好きな名前にできます．この名前で新規ディレクトリが作成されます．

GitHub Pagesで公開する場合，ここは`your-github-id.github.io`にするといいでしょう．

```bash title="Bash" :no-line-numbers
npm init vuepress my-blog
```

実行すると，何件か質問があります．迷いそうなところだけ挙げておきます：

- `Which bundler do you want to use?` -> `vite`がおすすめです．
- `What type of project do you want to create?` -> ここでは`blog`を選びます．
- `Your project name` -> 私はディレクトリ名とおなじにしています．良いのか悪いのかはわかりません
- `Do you need a GitHub workflow to deploy docs on GitHub pages?` -> `Y` を選びます．

完了すると，依存関係などのインストールが始まるので，ちょっと待ちます．

`Successful Generated!`が出たら完璧です．

`Would you like to preview template now?`は．`Y`でテンプレートサーバーが動きますが，ここでは`n`でスキップしましょう．どうせあとで開きます．

## 設定と起動のテスト

先ほど作ったディレクトリに移動してください．
ちなみに，もし`vulnerabilities`の警告が出た場合，`npm audit fix --force`をしておきましょう．

```bash title="Bash" :no-line-numbers
cd my-blog
npm audit fix --force
```

起動するかのテストをします．何も触っていなければ起動するはずです！

開発用のホットリロード対応なviteサーバーが生えてきます：
```bash title="Bash" :no-line-numbers
npm run docs:dev
```

純粋にビルドが通るだけの確認はこちら：
```bash title="Bash" :no-line-numbers
npm run docs:build
```

## 早速デプロイ

いよいよデプロイです．まず，このリポジトリをGitHubにアップロードしてください．すると，`workflows`の中のCI/CDが走って，自動でビルドされます．

変なことをしていない限り，問題は起こらない（はず）です．問題が起きたらClaudeとかに聞いてください．

CIが通ると，こんな感じに緑のチェックマークが出てきます．

![CI/CDが成功した様子．最新のコミットメッセージの右に緑色のチェックマークが表示されている．](/mothue/20261013-init-vuepress/0.png)

ビルド通らなかった場合，赤色の❌表示になるので，クリックするとログが見れます．

次に，GitHubの設定を開きます：

Settings -> Pages -> Branchから，"Branch"の項目を開きます．

![GitHub Pagesの公開するブランチの様子．ブランチの選択部分が`gh-pages`に選択されている様子．](/mothue/20261013-init-vuepress/1.png)

ここの"Branch"が，デフォルトでは`main`になっていると思うので，ここを`gh-pages`にします．これで公開ができるようになるので，保存してから数分待つと，設定したドメイン（特にいじっていないなら`your-github-id.github.io`になっているはず）でアクセスができます．

## まとめ

GitHub Pagesは神！なので全人類GitHub Pagesでオリジナルのブログを生やしましょう．

<AuthorProfile
  name="mothue"
  avatar="/mothue/mozui-icon-a.png"
  bio="BunとRustのオタク"
  :links="[
    { label: 'GitHub', url: 'https://github.com/mothue', icon: 'github' },
    { label: 'X', url: 'https://x.com/m0thue', icon: 'x' },
  ]"
/>
