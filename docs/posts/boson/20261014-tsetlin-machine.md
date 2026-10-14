---
date: 2026-10-14
author: boson
category:
  - Tech
tag:
  - 機械学習
  - Tsetlin Machine
---



# 超絶変態機械学習アルゴリズム、Tsetlin Machine (ツェトリンマシン)

::: info
この記事は執筆中です．今後随時更新されます．
:::


[[toc]]


## Hello Machine Learning !

機械学習の勉強を初めると、勾配降下法や尤度関数のように確率や統計、微積分の元で作られたアルゴリズムを習うことになります。

もちろん、そういった現代の機械学習(特に深層学習)の基本となる勾配降下法をベースとしたアルゴリズムはとても面白いので一度は知るべきだとは考えています。

しかし、殆どの研究者が主流の手法をおしすすめる一方で、世の中には全く新しいことを考える研究者もいます。

そうやって生まれたアルゴリズムの一例として**Tsetlin Machine**があります。

損失関数？行列積？連鎖律？そんな理論は一切使いません。

勾配降下法？誤差逆伝播法？そんなアルゴリズムも一切使いません。

なんならゲーム理論とかいう謎分野を理論保証に持っています。

..............とっっっても「変」じゃないですか!？

今日はそんな **超絶変態アルゴリズム「Tsetlin Machine」** の概要を説明させていただきます。

(どうか ツェトリンマシン と発音してください)

## 今日やらないこと

理論的な収束性の証明は筆者の理解が浅いため書きません。(いずれ理解して書きたいです)

最新の研究動向はとても面白いのですがこの記事の主題ではないため書きません、ぜひ気になった方は調べてみてください。(最近はalphaXivとか言う翻訳要約サービスがあるらしいです。)

## Tsetlin Machineとは？

順を追って説明するために、まずは原論文の説明から見ていきましょう。

論文というと気が引ける方も多いと思いますが、日本語訳と解説を載せるので、雰囲気でも掴んでいってください。

ここの内容は全て理解できなくても大丈夫です。

原論文

**The Tsetlin Machine -- A Game Theoretic Bandit Driven Approach to Optimal Pattern Recognition with Propositional Logic** (英)
ツェトリンマシン -- 命題論理による最適パターン認識への、ゲーム理論とバンディット問題に基づくアプローチ。(日)

[https://arxiv.org/abs/1804.01508]


## 概要(Abstract)


::: tabs

@tab 原文(英語)
Although simple individually, artificial neurons provide state-of-the-art performance when interconnected in deep networks. Arguably, the Tsetlin Automaton is an even simpler and more versatile learning mechanism, capable of solving the multi-armed bandit problem. Merely by means of a single integer as memory, it learns the optimal action in stochastic environments through increment and decrement operations. In this paper, we introduce the Tsetlin Machine, which solves complex pattern recognition problems with propositional formulas, composed by a collective of Tsetlin Automata. To eliminate the longstanding problem of vanishing signal-to-noise ratio, the Tsetlin Machine orchestrates the automata using a novel game. Further, both inputs, patterns, and outputs are expressed as bits, while recognition and learning rely on bit manipulation, simplifying computation. Our theoretical analysis establishes that the Nash equilibria of the game align with the propositional formulas that provide optimal pattern recognition accuracy. This translates to learning without local optima, only global ones. In five benchmarks, the Tsetlin Machine provides competitive accuracy compared with SVMs, Decision Trees, Random Forests, Naive Bayes Classifier, Logistic Regression, and Neural Networks. We further demonstrate how the propositional formulas facilitate interpretation. In conclusion, we believe the combination of high accuracy, interpretability, and computational simplicity makes the Tsetlin Machine a promising tool for a wide range of domains. 

@tab 訳文(日本語 by PLAMO)
個々の人工ニューロンは単純であるが、深層ネットワークで相互接続されることで最先端の性能を発揮する。

おそらく、ツェトリン・オートマトンはさらに単純で汎用性の高い学習メカニズムであり、多腕バンディット問題を解くことが可能である。 

**単一の整数のみを記憶し、増加/減少操作を用いることで、確率的環境における最適な行動を学習する。** 

本論文では、ツェトリン・オートマトンの集合体で構成される命題論理式を用いて複雑なパターン認識問題を解決する、ツェトリン・マシンを提案する。長年の課題である信号対雑音比の消失を解消するため、ツェトリン・マシンは新たなゲームを用いてオートマトンをオーケストレートする。 

**さらに、入力、パターン、出力のすべてをビットとして表現し、認識と学習をビット操作に依拠させることで、計算を簡素化している。**

我々の理論的分析により、**このゲームのナッシュ均衡が、最適なパターン認識精度をもたらす命題論理式と一致することが立証された。** 

これは、局所最適解ではなく大域的最適解のみを持つ学習へと繋がる。5つのベンチマークにおいて、ツェトリン・マシンはSVM、決定木、ランダムフォレスト、ナイーブベイズ分類器、ロジスティック回帰、およびニューラルネットワークと比較して競争力のある精度を示した。

さらに、命題論理式がいかにして解釈を容易にするかを実証する。結論として、高い精度、解釈可能性、および計算の単純さの組み合わせにより、ツェトリン・マシンは幅広い領域において有望なツールになると考えている。

:::


### 用語解説：

#### 人工ニューロン、深層ネットワーク
現代の深層学習アルゴリズムの基本構造です。
今回は深掘りしませんが、深層学習のアルゴリズムを超絶簡潔に言うと、



入力層に入力データを与え、それぞれの層が「前の層の計算結果を使って計算を行い(行列積)、後ろの層に与える」というのを最後の層まで行い予測を行います。

正解データから誤差を計算して(誤差関数、最小二乗法)、今度は「後ろの層から前の層に誤差を小さくするパラメーターの方向を伝えていき(誤差逆伝播法)、更新する(勾配降下法)」というのを繰り返します。

最終的に誤差が少ないパラメーターの「モデル」が完成します。



正直、こんな雑な説明では到底理解できないので、興味があればインターネットや本で調べてみてください!\([図書館のすゝめ](./20261014-library.md)\)

とりあえずは「現代の深層学習アルゴリズム」なんだなあと理解していただければ結構です。

#### 命題論理、命題論理式

入力から論理式があって、それを評価したら真か偽か決まるものです。

ざっくりと論理式だと思ってください。


#### 多腕バンディット問題
当たる確率や報酬がバラバラな複数のスロットマシンがあります。選択できる行動は「どのスロットを引くか」です。そんな環境で何回もスロットを引いて試しながら、報酬の最大化を目指します。

[Vol.31.No.5(2016/9)多腕バンディット問題 | 人工知能学会 (The Japanese Society for Artificial Intelligence)][https://www.ai-gakkai.or.jp/resource/my-bookmark/my-bookmark_vol31-no5/]


#### 局所最適解、大域的最適解

勾配降下法では、損失関数が小さくなる点に向かって学習するものの、極小値に収まるだけで、全体で見たときの最小値とは限りません。

誤差関数の極小値のことを局所最適解、最小値のことを大域的最適解と思ってください。


#### SVM、決定木、ランダムフォレスト、ナイーブベイズ分類器、ロジスティック回帰、およびニューラルネットワーク
SVM、決定木、ランダムフォレストは大きなif文を作る学習アルゴリズム、
実用的とされている学習アルゴリズムの名前の一覧だと思ってくささい。


## Tsetlin Machineが生まれた経緯

今のAIブームを作り出した深層学習アルゴリズムには多くのメリットがあり、それ故に主流となっています。

シンプルかつ、理論保証が厚い、そして、Transformerという構造を用いることで並列計算性が高く、モデルサイズの向上が性能向上に直結する **スケーリング則** があります。

特にLLMが一部タスクで人間を超えるようになったのはスケーリング則が大いに関連していて、そのあたりの話も非常に面白いのですが、メリットばかりではありません。

よく言われるデメリットは「学習/推論時の計算コスト」と「解釈可能性」です。

学習/推論時の計算コストは馬鹿にならなくて、1回の学習に100万円以上かかるなんてのはザラです。

(BERTとかでそのレベルなので、今のフロンティアモデルなんてのはどれだけ計算資源を食いつくしているのか想像が付きません...)

また、解釈可能性も一部の分野で凄く重要となります。




...そう、「医療分野」です。

医療というのは最優先で最先端技術による効率化が必要であるにも関らず、解釈可能性が無いブラックボックスのAIに命を委ねるようなことは絶対にできません。(技術者倫理があれば)

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
