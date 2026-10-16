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

原論文(2018年)

**The Tsetlin Machine -- A Game Theoretic Bandit Driven Approach to Optimal Pattern Recognition with Propositional Logic** (英)

ツェトリンマシン -- 命題論理による最適パターン認識への、ゲーム理論とバンディット問題に基づくアプローチ。(日)

[https://arxiv.org/abs/1804.01508]


## 概要(Abstract)


::: tabs


@tab 訳文(日本語 by PLAMO)
個々の人工ニューロンは単純であるが、深層ネットワークで相互接続されることで最先端の性能を発揮する。

おそらく、ツェトリン・オートマトンはさらに単純で汎用性の高い学習メカニズムであり、多腕バンディット問題を解くことが可能である。 

**単一の整数のみを記憶し、増加/減少操作を用いることで、確率的環境における最適な行動を学習する。** 

本論文では、ツェトリン・オートマトンの集合体で構成される命題論理式を用いて複雑なパターン認識問題を解決する、ツェトリン・マシンを提案する。長年の課題である信号対雑音比の消失を解消するため、ツェトリン・マシンは新たなゲームを用いてオートマトンをオーケストレートする。 

**さらに、入力、パターン、出力のすべてをビットとして表現し、認識と学習をビット操作に依拠させることで、計算を簡素化している。**

我々の理論的分析により、**このゲームのナッシュ均衡が、最適なパターン認識精度をもたらす命題論理式と一致することが立証された。** 

これは、局所最適解ではなく大域的最適解のみを持つ学習へと繋がる。5つのベンチマークにおいて、ツェトリン・マシンはSVM、決定木、ランダムフォレスト、ナイーブベイズ分類器、ロジスティック回帰、およびニューラルネットワークと比較して競争力のある精度を示した。

さらに、命題論理式がいかにして解釈を容易にするかを実証する。結論として、高い精度、解釈可能性、および計算の単純さの組み合わせにより、ツェトリン・マシンは幅広い領域において有望なツールになると考えている。

@tab 原文(英語)
Although simple individually, artificial neurons provide state-of-the-art performance when interconnected in deep networks.

Arguably, the Tsetlin Automaton is an even simpler and more versatile learning mechanism, capable of solving the multi-armed bandit problem. 

Merely by means of a single integer as memory, it learns the optimal action in stochastic environments through increment and decrement operations. 

In this paper, we introduce the Tsetlin Machine, which solves complex pattern recognition problems with propositional formulas, composed by a collective of Tsetlin Automata. To eliminate the longstanding problem of vanishing signal-to-noise ratio, the Tsetlin Machine orchestrates the automata using a novel game.

Further, both inputs, patterns, and outputs are expressed as bits, while recognition and learning rely on bit manipulation, simplifying computation.

Our theoretical analysis establishes that the Nash equilibria of the game align with the propositional formulas that provide optimal pattern recognition accuracy. 

This translates to learning without local optima, only global ones. In five benchmarks, the Tsetlin Machine provides competitive accuracy compared with SVMs, Decision Trees, Random Forests, Naive Bayes Classifier, Logistic Regression, and Neural Networks. 

We further demonstrate how the propositional formulas facilitate interpretation. 

In conclusion, we believe the combination of high accuracy, interpretability, and computational simplicity makes the Tsetlin Machine a promising tool for a wide range of domains. 

:::


### 用語解説

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

[Vol.31.No.5(2016/9)多腕バンディット問題 | 人工知能学会 (The Japanese Society for Artificial Intelligence)](https://www.ai-gakkai.or.jp/resource/my-bookmark/my-bookmark_vol31-no5/)


#### 局所最適解、大域的最適解

勾配降下法では、損失関数が小さくなる点に向かって学習するものの、極小値に収まるだけで、全体で見たときの最小値とは限りません。

誤差関数の極小値のことを局所最適解、最小値のことを大域的最適解と思ってください。


#### SVM、決定木、ランダムフォレスト、ナイーブベイズ分類器、ロジスティック回帰、およびニューラルネットワーク
SVM、決定木、ランダムフォレストは大きなif文を作る学習アルゴリズム、
実用的とされている学習アルゴリズムの一覧だと思ってくささい。


## Tsetlin Machineが生まれた経緯

今のAIブームを作り出した深層学習アルゴリズムには多くのメリットがあり、それ故に主流となっています。

シンプルかつ、理論保証が厚い、そして、Transformerという構造を用いることで並列計算性が高く、モデルサイズの向上が性能向上に直結する **スケーリング則** があります。

特にLLMが一部タスクで人間を超えるようになったのはスケーリング則が大いに関連していて、そのあたりの話も非常に面白いのですが、メリットばかりではありません。

よく言われるデメリットは **「学習/推論時の計算コスト」** と **「解釈可能性」** です。

学習/推論時の計算コストは馬鹿にならなくて、1回の学習に100万円以上かかるなんてのはザラです。

(BERTとかでそのレベルなので、今のフロンティアモデルなんてのはどれだけ計算資源を食いつくしているのか想像が付きません...)


また、解釈可能性も一部の分野で凄く重要となります。

それは **「医療」** です。

医療というのは最優先で最先端技術による効率化が必要であるにも関らず、ブラックボックスなAIをシステムに組み込むことは絶対にできません。(技術者倫理)

そのため、解釈可能性の高いモデルはAIの社会実装において必要なのです。


その二大問題が解消できる夢のようなアルゴリズム、それがTsetlin Machineです!


...というと言いすぎもしれませんが、実際にかなり解決に貢献しています。


## Tsetlin Automaton

Tsetlin Machineの元ネタとしてTsetlin Automatonという学習オートマトンがあります。

::: details オートマトンについて

オートマトンというのは内部状態を持っていて、状態遷移によって状態が変化する様子をモデル化したものです。

Wikipediaに掲載されていた図が分かりやすかったので、それを参考に

![扉の開閉に関するAutomaton](https://upload.wikimedia.org/wikipedia/commons/d/d9/FSM_example_w_comments.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original)

状態遷移先は状態によって違って、行動/条件によっても違います

これは○が2つありますが、オートマトンが2つあるという図ではなく、オートマトンが持てる **状態が2つある** という意味です。

複雑な概念ではないので(とは言っても奥は深い)、納得できなければ調べてみてください!

:::


Tsetlin Automatonはとても簡単な構造で、オートマトンと言うからには状態があるのですが、状態には **1つの正の整数** しか持ちません。

持てる状態の幅として **N** というパラメーターを用意します。

Nは基本なんでも良いです。ただ、人間が設定する必要があり、性能を左右するパラメーターです。(ハイパーパラメーター)

Tsetlin Automatonが持てる状態は有限で、**1~2Nの正の整数** です。



  
![TAの図1](/boson/20261014-tsetlin-machine/ta1.png)
  

この正の整数がN以下なら **「含めない」**、N+1は以上なら **「含める」** ということにします。

具体的に何を含めるのかは後ほど説明しますが、とりあえず飲み込んでください。

  

![TAの図2](/boson/20261014-tsetlin-machine/ta2.png)

  

そして、「含める」「含めない」を選択したことにより、 **「報酬」** か **「罰」** を受けることになります。



報酬を受けると「含めない」状態なら更に「含めない」方向に、「含める」状態なら「含める」方向に状態を遷移させます。

罰を受けると「含めない」状態なら「含める」方向に、「含める」状態なら「含めない」方向に状態を遷移させます。

状態→行動→報酬の流れを聞いて強化学習の枠組みととても良く似てることに気づくかもしれません。

実際に学習オートマトンは強化学習の先祖の一つで、強化学習の勉強で一番初めに習う「多腕バンディット問題」の解法と似ています。

![TAの図3](/boson/20261014-tsetlin-machine/ta3.png)

## Tsetlin Machine のアルゴリズム


機械学習の勉強において重要な考え方として想像していただきたいのは、最終的に作りたいのは **「入力したら出力が得られる関数」** であることです。

計算機を用いている以上、作れるのは **関数** なのです。

その関数の内部処理がとても複雑で、入力が数百万次元になっても、関数なのです。

画像から写っている動物の名前を出力する関数、音声から話している内容を文字に起こす関数、質問から応答を言葉で返す関数、ゲームの次の行動を決める関数...全て入力と出力が存在します。

### Tsetlin Machineのデータ前処理


Tsetlin Machineではこの入力と出力は全て真偽値(boolean)になっています。

もちろん深層学習では殆ど浮動小数点型(float)ですが、Tsetlin Machineは論理式を扱う関係上、真偽値にする必要があります。

具体的には、MNISTという手書き数字の白黒画像データセットの場合、それぞれのピクセルに0.0~1.0の明るさがあります。

そのままではTsetlin Machineでは使えないので、閾値を0.25として、それ以上ならTRUE、未満ならFALSEのように前処理を行います。

そして、MNISTでは0~10のどの数字が書かれているかを予測する必要があるのですが、 **「0か、0でないか」「1か、1でないか」** という風にすべての数字に対して学習します。

更に入力には普通の入力と**その否定**があります。

![関数を作る](/boson/20261014-tsetlin-machine/function.png)


### Clause

Tsetlin Machineを構成する構造として、Clause(節)があります。

個人的に「節」という訳はあまり好きではないので、Clauseと呼ばせてください。

Clauseの全体像はこんなかんじです。


![clauseの図](/boson/20261014-tsetlin-machine/clause.png)

Tsetlin Automaton: N=50

入力の次を見てみると、Tsetlin Automatonが沢山あるのが見えると思います。

入力と入力の否定の全てにTsetlin Automatonが一つ割り当てられていて、Tsetlin Automatonの状態が **Nより大きければ**その入力を含め、**N以下であれば**含めません。

言い換えるとTsetlin Automatonに報酬や罰を与えることで**入力を含めるか含めないかを制御**できます。

全ての入力を論理積(AND)で繋ぎ、その出力にClauseに割り当てられた符号(+/-)を付けることでClauseの出力が完成します。

ここまで説明してようやく全体像を説明することができます。

### Tsetlin Machineの全体像

![tsetlin machineの図](/boson/20261014-tsetlin-machine/tsetlin.png)

Clauseの数: 4

このようにClauseを+/-それぞれ半数ずつ用意します。

今回はClauseの数を4つに設定します。

入力と入力の否定を用意して、それぞれを各Clauseに接続します。

そして、Clauseからは±(0または1)が出てくるはずで、その総和を取ります。

ここで注意したいのは0/1はClause内で途中まで真偽値として扱っていましたが、符号を付けた後からは数字の0と1として扱います。

### Tsetlin Machineの学習





参考文献
