---
layout: ja
title: リリースノート
id: release-notes
---

# {{ page.title }}


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

改善点と互換性のない変更点の一覧

__riot__:

  - _変更:_ smashの代わりにrollup+babelを使用してriotをビルド。es6モジュールの文法のみを使用
  - _変更:_ テストをクリーンアップ (私たちは371個のテストを使用) して、それらをes6で書かれたいくつかのファイルに分割。また、expect.jsの代わりにchai.jsに切り替えた
  - _変更:_ ループのパフォーマンスを向上。更新が以前よりもはるかに高速に
  - _変更:_ riot-tagは非推奨でdata-isを使用する
  - _変更:_ `name`と`id`の代わりに`ref`属性を使用する [riot/1185](https://github.com/riot/riot/issues/1185) (__互換性のない変更__)
  - _変更:_ コアからriot-routeを削除してオプションにする [riot/1485](https://github.com/riot/riot/issues/1485) (__互換性のない変更__)
  - _変更:_ タグがマウントされる前にupdateおよびupdatedイベントがトリガーされるのをやめる [riot/1661](https://github.com/riot/riot/issues/1661) (__互換性のない変更__)
  - _変更:_ "each - in"はコンテキストの違いで、繰り返しオブジェクトへのアプローチが変わる [riot/1420](https://github.com/riot/riot/issues/1420) (__互換性のない変更__)
  - _追加:_ ES6のclassを使用したタグの作成をサポート [more info](/api/#riottagel-opts)
  - _追加:_ タグにreactのcomponentShouldUpdateを真似た`shouldUpdate`メソッドを追加
  - _削除:_ 真偽属性のための __ 接頭辞 [riot/276](https://github.com/riot/riot/issues/276)
  - _削除:_ riot DOMイベントでの自動的なpreventDefault [riot/1770](https://github.com/riot/riot/issues/1770) [riot/1718](https://github.com/riot/riot/issues/1718) [riot/526](https://github.com/riot/riot/issues/526) (__互換性のない変更__)
  - _修正:_ if属性に関連するすべての問題 [riot/1477](https://github.com/riot/riot/issues/1477) [riot/1658](https://github.com/riot/riot/issues/1658)
  - _修正:_ 子タグのループ内では親タグからプロパティを継承しないようにする [riot/1697](https://github.com/riot/riot/issues/1697)
  - _修正:_ 子タグで発生したイベントでは親タグを更新しないようにする [riot/1319](https://github.com/riot/riot/issues/1319) (__互換性のない変更__)
  - _修正:_ 同じ名前の複数のタグを持つ配列には、実際のタグ要素は含まれていない [riot/2061](https://github.com/riot/riot/issues/2061)
  - _修正:_ 動的タグの場合にdata-is属性が更新されない  [riot/2037](https://github.com/riot/riot/issues/2037)
  - _修正:_ eachメソッドを指定したvirtualタグは、親タグからのタグ参照を削除しない
  [riot/2029](https://github.com/riot/riot/issues/2029)
  - _修正:_ eachメソッドと、オブジェクトと配列の切り替え [riot/2027](https://github.com/riot/riot/issues/2027)
  - _修正:_ ループされたカスタムタグ要素のイベントで設定されたプロパティは、親の更新によってクリアされるようだ [riot/2019](https://github.com/riot/riot/issues/2019)
  - _修正:_ riot+compiler.js:1245 Uncaught NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node - when adding to an 'each' structure from a recursively created element onlick [riot/1962](https://github.com/riot/riot/issues/1962)
  - _修正:_ input numbers leave unprocessed expressions after upgrade to 2.6.0 [riot/1957](https://github.com/riot/riot/issues/1957)
  - _修正:_ メモリリーク [riot/1955](https://github.com/riot/riot/issues/1955)
  - _修正:_ `require(*tag-name*)` does not allow `parserOptions` [riot/1935](https://github.com/riot/riot/issues/1935)
  - _修正:_ clear riot tag cache to aid with testing [riot/1875](https://github.com/riot/riot/issues/1875)
  - _修正:_ 'before-mount' won't work as expected in riot#render [riot/1851](https://github.com/riot/riot/issues/1851)
  - _修正:_ the logic is not work with if and class together [riot/1769](https://github.com/riot/riot/issues/1769)
  - _修正:_ should we add a updateSelf() API? [riot/1748](https://github.com/riot/riot/issues/1748)
  - _修正:_ virtual要素がタグ更新後に消える [riot/1659](https://github.com/riot/riot/issues/1659)
  - _修正:_ can I use the bool attribute with the custom tag? (like "disabled") [riot/1618](https://github.com/riot/riot/issues/1618)
  - _修正:_ extra expression evaluation when using attributes [riot/1590](https://github.com/riot/riot/issues/1590)
  - _修正:_ eS6 class syntax with child tags [riot/1451](https://github.com/riot/riot/issues/1451)
  - _修正:_ different approaches in iterable objects in different contexts of "each - in" [riot/1420](https://github.com/riot/riot/issues/1420)
  - _修正:_ support conditions with virtual tag [riot/139](https://github.com/riot/riot/issues/139)
  - _修正:_ ループ内でのriot-tagの動作 [riot/1368](https://github.com/riot/riot/issues/1368)
  - _修正:_ すべてのtreeitemタグには子が存在する [riot/1361](https://github.com/riot/riot/issues/1361)
  - _修正:_ コンパイラの状態をクリアするメソッド [riot/1236](https://github.com/riot/riot/issues/1236)
  - _修正:_ dynamically loaded child tags don't get into the parents tags object [riot/1174](https://github.com/riot/riot/issues/1174)
  - _修正:_ [Q] Child tags counts not matched? [riot/1088](https://github.com/riot/riot/issues/1088)
  - _修正:_ inconsistent tags behaviour with 1 item vs many  [riot/936](https://github.com/riot/riot/issues/936)
  - _修正:_ no way to override name attribute on e.g. &lt;input&gt;s to prevent overriding existing properties on `this` [riot/715](https://github.com/riot/riot/issues/715)

__riot-observable__:

  - _削除:_ スペース区切りのサポート、 `el.on('foo bar')` は `el.on('foo').on('bar')`になります (__互換性のない変更__)
  - _修正:_ 以前より速さを6倍に最適化

__riot-tmpl__:

  - _変更:_ テンプレートのエラーがコンソールAPIが使用可能ならば常に`console.error`として出力されるようになりました (__互換性のない変更__)

__riot-compiler__:

  - _修正:_ タグ内でes6のインポートを許可 [compiler/69](https://github.com/riot/compiler/issues/69)
  - _修正:_ all the `value` attributes using expressions will be output as `riot-value` to [riot#1957](https://github.com/riot/riot/issues/1957)
  - _変更:_ riot-compiler経由で生成されたcssは常にスコープとなります (__互換性のない変更__)
  - _廃止:_ 古い`babel`のサポート、`es6`パーサーはデフォルトでBabel6を使用するようになりました (__互換性のない変更__)


### 皆さん、ありがとうございます!

このフレームワークを改善するための最善の決定を下すのに協力してくれたすべてのriotコミュニティとすべてのユーザーに感謝します。
riotのソースコードに関する彼の偉大な作業のために[@rogueg](https://github.com/rogueg)にお越しいただき、ありがとうございます。
このプロジェクトの熱心な貢献者と協力者にも感謝しています。

### 次は何ですか?

[@tipiirai](https://github.com/tipiirai)はriot@4.0.0の一部となる新しいレンダリング手法と大きなコアの改良を試作し、新しいriotリリースに取り組んでいます。

次のリリースでは、主に初期レンダリングパフォーマンスの向上[riot/2034](https://github.com/riot/riot/issues/2034)に焦点を当てます。私たちは、コンパイラのソースマップを持ってきて、ホットモジュール交換のサポートを続けていきます。
