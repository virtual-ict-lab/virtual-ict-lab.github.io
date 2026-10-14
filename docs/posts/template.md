---
date: 2026-10-13
author: Virtual ICT Lab
tag:
  - テンプレート
---

<!--
tag:
  - お知らせ
  - はじめに
-->
# テンプレート

これは，記事を書く際のテンプレートです．

<!-- more -->

## 目次
[[toc]]

## 基本の Markdown

**太字**、*斜体*、~~取り消し線~~、`インラインコード`

- 箇条書き
  - ネスト

1. 番号付きリスト
2. 番号付きリスト

> 引用

---

| 列A | 列B |
| --- | --- |
| 1 | 2 |
| 3 | 4 |

![画像の代替テキスト](/icons/icon-512.png)

## リンク

<!-- 内部リンクは相対パスの .md 指定を推奨 -->
[同じ階層の記事](./other.md)\
[親階層の記事](../README.md)\
[絶対パス](/guide/introduction.md)\
[見出しへのリンク](./other.md#見出し)\
[外部リンク](https://vuepress.vuejs.org/)

## Hint コンテナ

カードっぽいやつ\
::: tip ヒント
ヒント
:::

::: warning 警告
警告
:::

::: danger 危険
危険な警告
:::

::: info 情報
情報
:::

::: important 重要
重要なメッセージ
:::

::: note ノート
ノート
:::

タイトル省略（デフォルトタイトル）：

::: tip
This is a tip
:::

折りたたみ：

::: details クリックして展開
隠れている内容

```ts
console.log('Hello, VuePress!')
```

:::

## 絵文字

VuePress 2 is out :tada: !

## コードブロック

通常：
```rust
fn main() {
    println!("Hello, World");
}
```

タイトル付き：
```rust title="main.rs"
fn main() {
    println!("Hello, World");
}
```

行ハイライト：
```rust{1,3}
fn main() {
    println!("Hello, World");
}
```

行ハイライト（範囲・複数）：
```rust{1,3-4}
fn main() {
    let a = 1;
    let b = 2;
    println!("{}", a + b);
}
```

行番号強制ON
```rust:line-numbers
fn main() {
    println!("Hello, World");
}
```

行番号強制OFF
```rust:no-line-numbers
fn main() {
    println!("Hello, World");
}
```

組み合わせ
```rust title="a.rs" {1} :no-line-numbers
fn main() {
    println!("Hello, World");
}
```

v-pre（デフォルトで有効なので `{{ }}` はそのまま表示される）：
```md
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

v-pre を無効化（Vue に評価させる）：
```md:no-v-pre
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

## コードのインポート

別ファイルのコードを取り込む構文（書式の例。実際に使うときは ``` の外に書く）：

```md
@[code](../foo.rs)
@[code{1-10}](../foo.rs)
@[code rust](../foo.rs)
@[code rust{2,4-5}](../foo.rs)
@[code{3-10} rust{3}:no-line-numbers](../foo.rs)
```

## コードタブ

::: code-tabs

@tab Rust

```rust
fn main() {
    println!("Hello, World");
}
```

@tab Python

```python
print("Hello, World")
```

:::

## タブ

::: tabs

@tab 読む

記事を読んで、基本的な考え方を学びます。

@tab 試す

コードをコピーして実行し、自分の環境で確かめます。

:::

## Vue in Markdown

テンプレート構文：1 + 1 = {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>

コンポーネント：<Badge text="demo" /> <Badge text="警告" type="warning" /> <Badge text="危険" type="danger" />

## 数式

$$
a^2 + b^2 = c^2
$$

インライン数式：$E = mc^2$

## 図（Mermaid）

```mermaid
flowchart LR
  A[右足を出す] --> B[左足を出す]
  B --> C[前に進む]
```

## 動くコードの例

::: normal-demo クリックして試す

```html
<button onclick="this.textContent = '試せました！'">クリックしてください</button>
```

:::
