---
layout: ja
title: リリースノート
id: release-notes
---

# {{ page.title }}

## 3.8.1 *2017年12月28日*

 - _修正_: 破壊的変更を避けるために、硬めの`Exception Errors`よりも`console.warn`を推奨 [riot/2511](https://github.com/riot/riot/issues/2511)

## 3.8.0 *2017年12月28日*

__riot__:

  - _修正_: 紛らわしい`virtual`タグの`data-is`属性との使い方 [riot/2511](https://github.com/riot/riot/issues/2511)
  - _更新_: プロジェクト貢献者リスト [riot/2512](https://github.com/riot/riot/issues/2512)

__riot-compiler__:

  - _追加_: 実験的なソースマップのサポート

`sourcemap = true`オプションを使用してコンパイルすると、コンパイラは` code`と `sourcemap`を含むオブジェクトを返します。
**現在のriotコンパイラは "実際のパーサ"を使用しないので、生成されたソースマップは間違っているかもしれません**。
私たちは次のriotのメジャーリリースでより良いソースマップ結果を生み出す予定です。

__riot-cli__:

  - _追加_: インラインソースマップを生成する`sourcemap`オプション
  - _変更_: すべてのAPIメソッドは、ノードで使用されている場合、常にプロミスを返す

## 3.7.4 *2017年11月5日*

__riot__:

  - _修正_: SVG内に、ループでのネストされたカスタムタグの表示に失敗する [riot/2464](https://github.com/riot/riot/issues/2464)
  - _修正_: `each`ループを持つタグ上で未定義として渡される関数 [riot/2474](https://github.com/riot/riot/issues/2474)
  - _修正_: `before-unmount`は、子タグのDOMを破棄した後に呼ばれる [riot/2480](https://github.com/riot/riot/issues/2480)
  - _修正_: `uid`の内部関数を修正 [riot/2481](https://github.com/riot/riot/issues/2481)
  - _追加_: jsDelivrのhitsバッジ [riot/2467](https://github.com/riot/riot/issues/2467)

## 3.7.3 *2017年10月1日*

__riot__:

  - _修正_: 三項演算子が期待通りに動作しない [riot/2454](https://github.com/riot/riot/issues/2454)
  - _追加_: riot.compileに関する機能のリクエスト [riot/2451](https://github.com/riot/riot/issues/2451)

## 3.7.2 *2017年9月23日*

__riot__:

  - _修正_: SVGにて動的なpreserveAspectRatioが動作しない [riot/2445](https://github.com/riot/riot/issues/2445)
  - _修正_: Yieldのコンテンツ内における`show`のスコープ [riot/2448](https://github.com/riot/riot/issues/2448)
  - _改善_: ループのパフォーマンス
  - _改善_: 新しいタグの作成では、関数インスタンスの代わりにオブジェクトが優先
  - _改善_: 親 -> 子タグへの継承を単純化

__riot-compiler__:

  - _更新_: ビット演算子を回避する、依存関係とリファクタリングいくつかの内部コード
  - _修正_: coffeescriptパーサーが必要 [riot-compiler/102](https://github.com/riot/compiler/pull/102)

## 3.7.0 *2017年9月2日*

__riot__:

  - _追加_: `key`属性を用いてループのパフォーマンス改善 [more info](/guide/#key) [riot/2418](https://github.com/riot/riot/issues/2418)
  - _追加_: タグのオプションはmixinの`init`関数に渡される [riot/2434](https://github.com/riot/riot/issues/2434)
  - _修正_: `isMounted`は.on("mount")イベント内ではfalseを返す [riot/2436](https://github.com/riot/riot/issues/2436)
  - _修正_: ref属性を持つyieldがコンテンツのロードに失敗する [riot/2433](https://github.com/riot/riot/issues/2433)
  - _修正_: もし以前に"value"属性が設定されていれば、それは削除されず、また再び偽値に設定される [riot/2427](https://github.com/riot/riot/issues/2427)

## 3.6.3 *2017年8月23日*

__riot__:

  - _修正_: 修正しようとする別の試み [riot/2409](https://github.com/riot/riot/issues/2409)
  - _修正_: [riot/2428](https://github.com/riot/riot/issues/2428) [riot/2424](https://github.com/riot/riot/issues/2424)
  - _修正_: 古いpackage-lock.json [riot/2425](https://github.com/riot/riot/issues/2425)

## 3.6.2 *2017年8月18日*

__riot__:

  - _修正_: マウントイベントなしでトリガされたアンマウントイベント [riot/2409](https://github.com/riot/riot/issues/2409)
  - _改善_: 古いレガシーコードを削除してループのパフォーマンスを上げる
  - _改善_: ソースコードの部分的なリファクタリングにはES2016の構文がより良い

## 3.6.1 *2017年6月25日*

__riot__:

  - _削除_: `riot.csp.min.js`はChrome拡張機能では役に立たないがローカルに読み込むことはできる。代わりに`riot.csp.js`を使用する

__riot-compiler__:
  - _修正_: 正規表現を含むタグのコンパイルに関連する可能性のあるバグ [riot/2369](https://github.com/riot/riot/issues/2369)
  - _更新_: 複数のモジュールを共有するためにnpmのskip-regex関数を使用（将来的に）
  - _更新_: JSコードの安全な置き換えのためのjsSplitter関数。次のコンパイラの一部


## 3.6.0 *June 8, 2017*

__riot__:

  - _追加_: the option to block the riot automatic updates via `riot.settings.autoUpdate` [more info](/api/misc/#autoupdate) [riot/2377](https://github.com/riot/riot/issues/2377)
  - _修正_: regex in <script> function breaks compiler [riot/2369](https://github.com/riot/riot/issues/2369)

__riot-tmpl__:

  - _修正_: incorrect regex that matches literal regexes
  - _修正_: use shared regex parser for browser and server versions

__riot-compiler__:

  - _修正_: various issues with literal regexes

## 3.5.1 *May 21, 2017*

__riot-tmpl__:

  - _修正_: `}` in output when expression contains `)/` [riot/2361](https://github.com/riot/riot/issues/2361)

__riot__:

  - _修正_: inline DOM templates only work on top level tags [riot/2359](https://github.com/riot/riot/issues/2359)
  - _修正_: the result of `riot.version` is displayed as WIP [riot/2352](https://github.com/riot/riot/issues/2352)


## 3.5.0 *May 13, 2017*

__riot__:

  - _追加_: enable the use of DOM inline templates [more info](/api/#tags-without-template) [riot/2296](https://github.com/riot/riot/issues/2296)
  - _追加_: easier svg sub tags support [riot/2290](https://github.com/riot/riot/issues/2290)
  - _修正_: better error message [riot/2335](https://github.com/riot/riot/issues/2335)
  - _修正_: show on nested tags prefers parent's context [riot/2333](https://github.com/riot/riot/issues/2333)
  - _修正_: attributes not updating in v.3.4.4 [riot/2343](https://github.com/riot/riot/issues/2343)
  - _修正_: bring back data-ref and ref [riot/2348](https://github.com/riot/riot/issues/2348)


__riot-cli__:
  - _修正_: fix rollup false positive warnings [rollup-plugin-riot/89](https://github.com/riot/rollup-plugin-riot/issues/89)


## 3.4.4 *April 30, 2017*

__riot__:

  - _修正_: remove `ref` attributes avoiding to parse them twice [riot/2329](https://github.com/riot/riot/issues/2329)
  - _修正_: avoid to remove attributes for truthy properties [riot/2331](https://github.com/riot/riot/issues/2331)
  - _修正_: support for IE11 events handling [riot/2332](https://github.com/riot/riot/issues/2332)


## 3.4.3 *April 24, 2017*

__riot__:

  - _修正_: fair angular library size comparison [riot/2325](https://github.com/riot/riot/issues/2325)
  - _修正_: data-is works differently as expression to hard-coded attribute [riot/2321](https://github.com/riot/riot/issues/2321)
  - _修正_: scope differs between `if` and `show` [riot/2125](https://github.com/riot/riot/issues/2125)

__riot-cli__:

  - _修正_: error exception reporting [cli/26](https://github.com/riot/cli/issues/26)

## 3.4.2 *April 14, 2017*

__riot__:

  - _修正_: "data-is" attribute is being removed if you mount on the same element [riot/2317](https://github.com/riot/riot/issues/2317)
  - _修正_: riot attributes remain in output [riot/2316](https://github.com/riot/riot/issues/2316)

## 3.4.1 *April 9, 2017*

__riot__:

  - _修正_: parent tag data-is is reset when disabling a nested tag with `if="...` [riot/2311](https://github.com/riot/riot/issues/2311)
  - _修正_: object is not valid in "show" anymore [riot/2300](https://github.com/riot/riot/issues/2300)
  - _修正_: undefined not handled as empty string (in tags)  [riot/2297](https://github.com/riot/riot/issues/2297)
  - _修正_: `<div if="...">` containing `<div data-is="...">` does not unmount tag properly [riot/2307](https://github.com/riot/riot/issues/2307)

## 3.4.0 *March 26, 2017*

__riot__:

  - _修正_: `riot-` prefixed attributes will be no longer prefixed in the `opts` object [riot/2103](https://github.com/riot/riot/issues/2103)
  - _修正_: `Null` and `undefined` expressions will be no longer converted into empty strings for the tag attributes [riot/2080](https://github.com/riot/riot/issues/2080)
  - _修正_: style attribute with expressions makes show directive invalid at the beginning [riot/2178](https://github.com/riot/riot/issues/2178)
  - _修正_: riot will not force all the expressions evaluating them as strings [riot/2310](https://github.com/riot/riot/issues/2310)
  - _追加_: add support for `style` and `class` object expressions more info [here](/guide/#class-object-expressions) and [here](/guide/#style-object-expressions)

## 3.3.2 *March 5, 2017*

__riot__:

  - _Fix:_ tag root attributes out of sync [riot/2280](https://github.com/riot/riot/issues/2280)
  - _Fix:_ virtual tag doesn't work with each in server side rendering [riot/2220](https://github.com/riot/riot/issues/2220)
  - _Fix:_ using es6 classes mixins, some functions are lost [riot/2219](https://github.com/riot/riot/issues/2219)
  - _Fix:_ rendering issue with tag iteration/re-ordering [riot/2271](https://github.com/riot/riot/issues/2271)
  - _Fix:_ ES6 template literals forward slashes issue [riot/2167](https://github.com/riot/riot/issues/2167)
  - _Fix:_ re add the `riot.version` attribute
  - _Improve:_ remove dead code
  - _Improve:_ increase code coverage to 100% :tada:

## 3.3.1 *February 19, 2017*

__riot__:

  - _Fix:_ shouldUpdate prevents every update  [riot/2118](https://github.com/riot/riot/issues/2118)

__riot-compiler__:

  - _Fix:_ es6 template strings issue  [riot/2167](https://github.com/riot/riot/issues/2167)
  - _Add:_ support for shortcut generator functions `* foo()`

## 3.3.0 *February 18, 2017*

__riot__:

  - _Add:_ fine grain control over tag updates by passing nextOpts to `shouldUpdate` [riot/2238](https://github.com/riot/riot/issues/2238)

__riot-compiler__:

  - _Fix:_ es6 `import` regex compatibility issues [riot/2263](https://github.com/riot/riot/issues/2263)
  - _Add:_ support for `async` shortcut methods [riot/2195](https://github.com/riot/riot/issues/2195)

## 3.2.1 *February 10, 2017*

__riot__:

  - _Fix:_ error when using virtual and update handler [riot/2251](https://github.com/riot/riot/issues/2251)
  - _Change:_ switch from plegie to opencollective as donation platform [riot/2239](https://github.com/riot/riot/pull/2239)

## 3.2.0 *February 6, 2017*

__riot__:

  - _Fix:_ disable the global mixins for the anonymous tags [riot/2056](https://github.com/riot/riot/issues/2056)
  - _Fix:_ setting selected attribute of multiple `<option>` tags in a multi select does not work properly [riot/2247](https://github.com/riot/riot/issues/2247)
  - _Fix:_ mount event not fired due to listener for wrong event [riot/2249](https://github.com/riot/riot/issues/2249)
  - _Add:_ the `riot.settings.skipAnonymousTags` flag [more info](/api/misc/#skipanonymoustags)
  - _Improve:_ the looped tags rendering is ~30% faster than before mainly for the `anonymous` tags

## 3.1.1 *February 4, 2017*

__riot__:

  - _Fix:_ issue removing tags in a loop [riot/2240](https://github.com/riot/riot/issues/2240)
  - _Fix:_ tag root is not always in body when its mount event fires [riot/1938](https://github.com/riot/riot/issues/1938)
  - _Change:_ improve the rendering performance of the anonymous looped tags

__riot-compiler__:

  - _Fix:_ restore the support for the es6 in browser compilation using babel [examples/51](https://github.com/riot/examples/issues/51)


## 3.1.0 *January 29, 2017*

__riot__:

  - _修正:_ 動的にdata-isを使うと、virtualタグがレンダリングされる [riot/2208](https://github.com/riot/riot/issues/2208)
  - _修正:_ 子タグがyieldを持っている場合、動的な親タグからdata-is属性が削除される [riot/2211](https://github.com/riot/riot/issues/2211)
  - _修正:_ rollupのサーバーサイド（cjs）トランスパイル [riot/2216](https://github.com/riot/riot/issues/2216) [riot/2225](https://github.com/riot/riot/issues/2225) and [riot/2224](https://github.com/riot/riot/issues/2224)
  - _修正:_ ソートされたリストが正しく表示されない [riot/2228](https://github.com/riot/riot/issues/2228) [riot/2205](https://github.com/riot/riot/issues/2205)
  - _修正:_ selectタグと動的オプションを使うと、条件付きの`if`が期待通りに動作しない [riot/2229](https://github.com/riot/riot/issues/2229)
  - _変更:_ `_internal`タグのプロパティを` __`に改名しましたが、とにかくこれは使用するべきではない
  - _変更:_ `_parent`プロパティを公開しないようにした。現在これは` __`キーに含まれる
  - _変更:_ `isMounted`プロパティを反復不可能、書き込み不可能にする
  - _追加:_ webpack経由のホットモジュールリロードを処理するための実験的な`riot.reload` API [more info](https://github.com/riot/tag-loader)

__riot-compiler__:

  - _修正:_ スタイルタグは、たとえjavasdriptの文字列内に存在してもriotタグから外される [riot/2210](https://github.com/riot/riot/issues/2210)

__riot-route__:

  - _追加:_ タグベースのルータ [riot-route/80](https://github.com/riot/route/pull/80) [more-info](/api/route#tag-based-routing)

## 3.0.7 *2017年1月10日*

__riot__:

  - _修正:_ ホットフィックス if/eachの組み合わせは動作しない [riot/2207](https://github.com/riot/riot/issues/2207)

## 3.0.6 *2017年1月10日*

__riot__:

  - _修正:_ `show`、`hide`および`if`ディレクティブ間の矛盾 [riot/2158](https://github.com/riot/riot/issues/2158)
  - _修正:_ webpackとbabelを用いた`import riot from 'riot'` [riot/2091](https://github.com/riot/riot/pull/2091)
  - _修正:_ ループによるソートの問題 [riot/2205](https://github.com/riot/riot/issues/2205)
  - _修正:_ 動的に`data-is`属性を使用している問題 [riot/2175](https://github.com/riot/riot/issues/2175)
  - _修正:_ オブジェクトループ内の`if`ディレクティブ [riot/2133](https://github.com/riot/riot/issues/2133)
  - _修正:_ Windowsマシン上でのサーバサイドレンダリング [riot/2131](https://github.com/riot/riot/pull/2131)

## 3.0.5 *2016年12月18日*

__riot__:

  - _修正:_ 内部の`parent`属性は外部のオーバーライドから保護する必要がある [riot/2154](https://github.com/riot/riot/issues/2154)
  - _修正:_ `<select><option>`で選択されたものが、riot3で正しく動作していない [riot/2164](https://github.com/riot/riot/issues/2164)

## 3.0.4 *2016年12月14日*

__riot__:

  - _修正:_ `show/hide`の動作を復元 [riot/2156](https://github.com/riot/riot/issues/2156)

## 3.0.3 *2016年12月13日*

__riot__:

  - _修正:_ mount、unmountでのcss挿入のパフォーマンス [riot/2152](https://github.com/riot/riot/issues/2152)
  - _修正:_ `show`、`hide`と`if`でスコープが異なる [riot/2125](https://github.com/riot/riot/issues/2125)
  - _追加:_ `data-src`を使用し、ブラウザの事前読込を回避してriotタグを取得する [riot/2132](https://github.com/riot/riot/issues/2132)
  - _削除:_ SPMのサポート [riot/2124](https://github.com/riot/riot/pull/2124)

## 3.0.2 *2016年12月4日*

__riot__:

  - _修正:_ svgタグ内でriot-viewBoxを使用すると、viewboxに置き換えられる。  [riot/2086](https://github.com/riot/riot/issues/2086)
  - _修正:_ data-is="{some expression}"でマウントされたタグが更新されない [riot/2102](https://github.com/riot/riot/issues/2102)
  - _修正:_ 属性の無い他のタグが要素にマウントされている場合、属性が削除されない [riot/2098](https://github.com/riot/riot/issues/2098)
  - _削除:_ SPMサポートの削除 [riot/2124](https://github.com/riot/riot/pull/2124)

__riot-tmpl__:

  - _変更:_ ユーザーが既にカスタムエラー関数を定義している場合、`console.error`の使用を避ける [riot/2108](https://github.com/riot/riot/issues/2108)
  - _変更:_  タグ名をデバッグする場合は小文字を使用する

__riot-compiler__:

  - _変更:_ cssプリプロセッサでの`@apply rule`をサポートする内部正規表現

__riot-route__:

  - _修正:_ クエリパラメータ付きルータが動作していない [riot-route/74](https://github.com/riot/route/issues/74)
  - _修正:_ テンプレートリテラルでIEが止まる [riot-route/77](https://github.com/riot/route/issues/77)


## 3.0.1 *2016年11月26日*

__riot__:

  - _修正:_ riot@3.0.0がデフォルトでエクスポートされるべき [riot/2084](https://github.com/riot/riot/issues/2084)
  - _修正:_ 値がfalseになる時にクラスが削除されない [riot/2082](https://github.com/riot/riot/issues/2082)
  - _修正:_ ユーザーが編集したinput値の自動更新 [riot/2096](https://github.com/riot/riot/issues/2096)
  - _修正:_ ref要素を含むタグをunmountするとエラーになる [riot/2083](https://github.com/riot/riot/issues/2083)
  - _修正:_ 複数のミックスインを持つ子を切り替えるとエラーになる [riot/2100](https://github.com/riot/riot/issues/2100)
  - _修正:_ 'data-is'タグの'if'を切り替えると、'親'タグのオブジェクトに新しい参照が作成される [riot/2089](https://github.com/riot/riot/issues/2089)


## 3.0.0 *2016年11月22日*

長い道のりでしたが、最終的にriot@3.0.0をリリースすることができました。riot2と比較して安定性、パフォーマンス、柔軟性が向上しています。

改善点と破壊的変更点の一覧

__riot__:

  - _変更:_ smashの代わりにrollup+babelを使用してriotをビルド。es6モジュールの文法のみを使用
  - _変更:_ テストをクリーンアップ (私たちは371個のテストを使用) して、それらをes6で書かれたいくつかのファイルに分割。また、expect.jsの代わりにchai.jsに切り替えた
  - _変更:_ ループのパフォーマンスを向上。更新が以前よりもはるかに高速に
  - _変更:_ riot-tagは非推奨でdata-isを使用する
  - _変更:_ `name`と`id`の代わりに`ref`属性を使用する [riot/1185](https://github.com/riot/riot/issues/1185) (__破壊的変更__)
  - _変更:_ コアからriot-routeを削除してオプションにする [riot/1485](https://github.com/riot/riot/issues/1485) (__破壊的変更__)
  - _変更:_ タグがマウントされる前にupdateおよびupdatedイベントがトリガーされるのをやめる [riot/1661](https://github.com/riot/riot/issues/1661) (__破壊的変更__)
  - _変更:_ "each - in"はコンテキストの違いで、繰り返しオブジェクトへのアプローチが変わる [riot/1420](https://github.com/riot/riot/issues/1420) (__破壊的変更__)
  - _追加:_ ES6のclassを使用したタグの作成をサポート [more info](/api/#riottagel-opts)
  - _追加:_ タグにreactのcomponentShouldUpdateを真似た`shouldUpdate`メソッドを追加
  - _削除:_ 真偽属性のための __ 接頭辞 [riot/276](https://github.com/riot/riot/issues/276)
  - _削除:_ riot DOMイベントでの自動的なpreventDefault [riot/1770](https://github.com/riot/riot/issues/1770) [riot/1718](https://github.com/riot/riot/issues/1718) [riot/526](https://github.com/riot/riot/issues/526) (__破壊的変更__)
  - _修正:_ if属性に関連するすべての問題 [riot/1477](https://github.com/riot/riot/issues/1477) [riot/1658](https://github.com/riot/riot/issues/1658)
  - _修正:_ 子タグのループ内では親タグからプロパティを継承しないようにする [riot/1697](https://github.com/riot/riot/issues/1697)
  - _修正:_ 子タグで発生したイベントでは親タグを更新しないようにする [riot/1319](https://github.com/riot/riot/issues/1319) (__破壊的変更__)
  - _修正:_ 同じ名前の複数のタグを持つ配列には、実際のタグ要素は含まれていない [riot/2061](https://github.com/riot/riot/issues/2061)
  - _修正:_ 動的タグの場合にdata-is属性が更新されない  [riot/2037](https://github.com/riot/riot/issues/2037)
  - _修正:_ eachメソッドを指定したvirtualタグは、親タグからのタグ参照を削除しない [riot/2029](https://github.com/riot/riot/issues/2029)
  - _修正:_ eachメソッドと、オブジェクトと配列の切り替え [riot/2027](https://github.com/riot/riot/issues/2027)
  - _修正:_ ループされたカスタムタグ要素のイベントで設定されたプロパティは、親の更新によってクリアされるようだ [riot/2019](https://github.com/riot/riot/issues/2019)
  - _修正:_ 再帰的に作成された要素から'each'構造にonclickを追加するとき - riot+compiler.js:1245 Uncaught NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node [riot/1962](https://github.com/riot/riot/issues/1962)
  - _修正:_ 2.6.0へアップグレードすると、inputタグ（属性はnumber）では未処理の式が残ってしまう [riot/1957](https://github.com/riot/riot/issues/1957)
  - _修正:_ メモリリーク [riot/1955](https://github.com/riot/riot/issues/1955)
  - _修正:_ `require(*tag-name*)`は`parserOptions`を許可しない [riot/1935](https://github.com/riot/riot/issues/1935)
  - _修正:_ テストを補助するためにriotタグのキャッシュをクリア[riot/1875](https://github.com/riot/riot/issues/1875)
  - _修正:_ riot＃renderで'before-mount'が期待どおりに動作しない [riot/1851](https://github.com/riot/riot/issues/1851)
  - _修正:_ ifとclassを同時に使うとロジックが動作しない [riot/1769](https://github.com/riot/riot/issues/1769)
  - _修正:_ updateSelf（） APIを追加する必要はある？ [riot/1748](https://github.com/riot/riot/issues/1748)
  - _修正:_ virtual要素がタグ更新後に消える [riot/1659](https://github.com/riot/riot/issues/1659)
  - _修正:_ カスタムタグでbool属性は使用可能？ （"disabled"など） [riot/1618](https://github.com/riot/riot/issues/1618)
  - _修正:_ 属性を使用している時の余計な式の評価　[riot/1590](https://github.com/riot/riot/issues/1590)
  - _修正:_ 子タグ付きes6クラス構文 [riot/1451](https://github.com/riot/riot/issues/1451)
  - _修正:_ `each - in`の異なるコンテキストにおける反復可能なオブジェクトについて、個別のアプローチ [riot/1420](https://github.com/riot/riot/issues/1420)
  - _修正:_ `virtual`タグで条件をサポートする [riot/139](https://github.com/riot/riot/issues/139)
  - _修正:_ ループ内でのriot-tagの動作 [riot/1368](https://github.com/riot/riot/issues/1368)
  - _修正:_ すべてのtreeitemタグには子が存在する [riot/1361](https://github.com/riot/riot/issues/1361)
  - _修正:_ コンパイラの状態をクリアするメソッド [riot/1236](https://github.com/riot/riot/issues/1236)
  - _修正:_ 動的にロードされた子タグは親タグのオブジェクトに含まれない [riot/1174](https://github.com/riot/riot/issues/1174)
  - _修正:_ [Q]子タグの数の合計が一致しない？ [riot/1088](https://github.com/riot/riot/issues/1088)
  - _修正:_ 1つのアイテムと多くのアイテムでタグの動作が矛盾する  [riot/936](https://github.com/riot/riot/issues/936)
  - _修正:_ name属性を上書きする方法はない。例えば&lt;input&gt;について、`this`の既存のプロパティを上書きしないようにする [riot/715](https://github.com/riot/riot/issues/715)

__riot-observable__:

  - _削除:_ スペース区切りのサポート、 `el.on('foo bar')` は `el.on('foo').on('bar')`になります (__破壊的変更__)
  - _修正:_ 以前より速さを6倍に最適化

__riot-tmpl__:

  - _変更:_ テンプレートのエラーがコンソールAPIが使用可能ならば常に`console.error`として出力されるようになりました (__破壊的変更__)

__riot-compiler__:

  - _修正:_ タグ内でes6のインポートを許可 [compiler/69](https://github.com/riot/compiler/issues/69)
  - _修正:_ テンプレート変数を用いた全て`value`属性は`riot-value`として出力 [riot#1957](https://github.com/riot/riot/issues/1957)
  - _変更:_ riot-compiler経由で生成されたcssは常にスコープとなります (__破壊的変更__)
  - _廃止:_ 古い`babel`のサポート、`es6`パーサーはデフォルトでBabel6を使用するようになる (__破壊的変更__)


### 皆さん、ありがとうございます!

このフレームワークを改善するための最善の決定を下すのに協力してくれたすべてのriotコミュニティとすべてのユーザーに感謝します。
riotのソースコードに関する彼の偉大な作業のために[@rogueg](https://github.com/rogueg)にお越しいただき、ありがとうございます。
このプロジェクトの熱心な貢献者と協力者にも感謝しています。

### 次は何ですか?

[@tipiirai](https://github.com/tipiirai)はriot@4.0.0の一部となる新しいレンダリング手法と大きなコアの改良を試作し、新しいriotリリースに取り組んでいます。

次のリリースでは、主に初期レンダリングパフォーマンスの向上[riot/2034](https://github.com/riot/riot/issues/2034)に焦点を当てます。私たちは、コンパイラのソースマップを持ってきて、ホットモジュール交換のサポートを続けていきます。
