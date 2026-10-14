---
date: 2026-10-13
author: mothue
category:
  - Tech
tag:
  - 機械学習
---



# 新しい機械学習アルゴリズム、Tsetlin Machine (ツェトリンマシン)をゆるく解説

::: info
この記事は執筆中です．今後随時更新されます．
:::


[[toc]]


## Hello Machine Learning !

機械学習の勉強を初めると、「勾配降下法が〜」「尤度関数が〜」のように確率や統計、微積分の元で作られたアルゴリズムを習うことになります。
もちろん、そういった現代の機械学習(特に深層学習)の基本となる勾配降下法をベースとしたアルゴリズムはとても面白いので一度は知るべきだとは考えています。
しかし、殆どの研究者が主流の手法をおしすすめる一方で、世の中には全く新しいことを考える研究者もいます。
そうやって生まれたアルゴリズムの一例として**Tsetlin Machine**があります。
今日はそんな**変なアルゴリズム「Tsetlin Machine」**の概要を説明させていただきます。


## Tsetlin Machineとは？


## Tsetlin Machineが生まれた経緯

## 




参考文献




VuePressを構築してGitHub Pagesにデプロイしたので，手順をまとめておきます．VuePressを建てたい方の参考になると幸いです．


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
