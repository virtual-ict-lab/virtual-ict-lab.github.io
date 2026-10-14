---
date: 2026-10-14
author: mothue
excerpt: 無線部 新入部員向けドキュメント
tag:
  - 執筆中!!!
---

# Rust 競プロ環境構築ガイド

<PageMeta />

みなさんはRustで競プロやりますか？私は最近復帰しました．

というわけで今回は，Rustで競技プログラミングの環境を構築する方法を自分用にまとめておきます．

## 前提

- 執筆環境は macOS 27 です．
- rustup / cargoが事前導入済みとします．

それでは，やっていきたいと思います．

## cargo-compete

cargo-competeは，Rustで競プロをやる場合にほぼ必須な便利ツールです．[https://github.com/qryxip/cargo-compete](https://github.com/qryxip/cargo-compete) にて公開されています．

Rust導入済みの場合，次のコマンドで導入ができます：

```bash title="Bash" :no-line-numbers
cargo install cargo-compete
```

以上です．めちゃくちゃ楽！

## 環境をジャッジサーバーと同じコンパイラに合わせる

AtCoderのジャッジ環境は，現状`rustc 1.89.0`なので，再現性を高めるために手元にも`1.89.0`を導入しましょう．

```bash title="Bash" :no-line-numbers
rustup toolchain install 1.89.0
```

## AtCoderの問題を解くディレクトリを作る

```bash title="Bash" :no-line-numbers
mkdir atcoder && cd atcoder
cargo compete init atcoder
```

選択肢が聞かれますが，これは2で大丈夫なはずです．
これで，`cargo-compete`の準備はできました．

```bash title="Bash" :no-line-numbers
$ tree -a
.
├── .cargo
│   └── config.toml
├── compete.toml
└── template-cargo-lock.toml

2 directories, 3 files
```

::: tip

ここでは，cargo-competeにはログインしません．提出の自動化が難しくなったため，私はログインせずに運用しています．

:::

## 細かい設定

templateとかの話を書く

## 実際の運用方法

`cargo compete new`とかして実際にやる話を書く

<AuthorProfile
  name="mothue"
  avatar="/mothue/avatar.png"
  bio="RustとBunのオタク"
  :links="[
    { label: 'GitHub', url: 'https://github.com/mothue', icon: 'github' },
    { label: 'X', url: 'https://x.com/m0thue', icon: 'x' },
  ]"
/>
