---
layout: default
title: Release notes
id: release-notes
---

# {{ page.title }}

## 2.6.1 *August 25, 2016*

- __riot__
 - Fix textarea inconsistent updates on IE [riot#1959](https://github.com/riot/riot/issues/1959)
 - Fix input type="number" bug on IE [riot#1957](https://github.com/riot/riot/issues/1957)

## 2.6.0 *August 20, 2016*

- __riot__
  - Fix bug in nested loops templates [riot#1646](https://github.com/riot/riot/issues/1649)
  - Fix server rendering issues [riot#1850](https://github.com/riot/riot/issues/1850) [riot#1839](https://github.com/riot/riot/issues/1839)
  - Fix inherit problem in loops [riot#1897](https://github.com/riot/riot/issues/1897) thanks to [@5angel](https://github.com/5angel)
  - Fix options correctly passed to the compiler [riot#1801](https://github.com/riot/riot/issues/1801)
  - Fix svg xlink attributes [riot#1922](https://github.com/riot/riot/issues/1922)
  - Add support for getters setters in mixins [riot#1888](https://github.com/riot/riot/pull/1888) thanks to [@5angel](https://github.com/5angel)

- __riot-observable__
  - __BREAKING CHANGE__: riot observable will no longer support events namespaces, this feature brings performance drawback and router issues [more info](https://github.com/riot/route/issues/63)

- __riot-tmpl__
  - Fix wrong context bug [riot#1916](https://github.com/riot/riot/issues/1916)

- __riot-route__
  - Fix relative links issues [riot#1916](https://github.com/riot/route/issues/64)


## 2.5.0 *July 3, 2016*

- __riot__
  - Fix mixins using child class functions (`class Child extends Parent {}`) [riot#1857](https://github.com/riot/riot/pull/1857)
  - Fix bug select option order [riot#1815](https://github.com/riot/riot/issues/1815)
  - Fix `riot.csp` previously bundled with the wrong `riot-tmpl` version [riot#1076](https://github.com/riot/riot/issues/1076#issuecomment-225211502)

- __riot-compiler__
  - Add support for es6 "import" inside tags [compiler#71](https://github.com/riot/compiler/pull/71)

- __riot-cli__
  - Add better error messages in case of missing dependencies

## 2.4.1 *May 22, 2016*

- __riot__
  - Fix unable to render server-side SVG [riot#1780](https://github.com/riot/riot/issues/1780)
  - Fix object detection in the loops [riot#1790](https://github.com/riot/riot/issues/1790)
  - Add throw errors in case of unregistered mixins initialization [riot#1796](https://github.com/riot/riot/pull/1796) thanks to [@juodumas](https://github.com/juodumas)
  - Add support for class (function) mixins [riot#1800](https://github.com/riot/riot/pull/1800) thanks to [@ashleybrener](https://github.com/ashleybrener)
  - Fix `yield` replacing issue [riot#1786](https://github.com/riot/riot/issues/1786)
  - Fix protect the internal "tags" attribute from being externally overridden [riot#1803](https://github.com/riot/riot/issues/1803)
  - Removed useless `riot+compiler.csp.js` bundle [riot#1799](https://github.com/riot/riot/issues/1799)

## 2.4.0 *May 7, 2016*

- __riot__
  - Fix Chrome Content Security Policy issues [riot#1076](https://github.com/riot/riot/issues/1076), we provide special riot builds (`riot.csp`) to solve this problem
  - Fix multiple global mixin [riot#1699](https://github.com/riot/riot/issues/1699) - thanks to [@wintercounter](https://github.com/wintercounter)
  - Add better support for the svg tags [riot#1199](https://github.com/riot/riot/issues/1199)

- __observable__
  - Now 30% faster [observable#18](https://github.com/riot/observable/pull/18) - thanks to [@Ke-](https://github.com/Ke-)
  - Add events namespace support [observable#15](https://github.com/riot/observable/pull/15) - thanks again to [@Ke-](https://github.com/Ke-)

- __cli__
  - Add the `--new` option to easily create new riot components
  - Fix symlinks issues thanks to the `shelljs@0.7.0` upgrade [cli#14](https://github.com/riot/cli/issues/14)

- __compiler__
  - Add the `pug` parser, `jade` will be deprecated in the next riot major release
  - Add the possibility to pass custom parsers options directly via the `compiler.compile` method through the `parserOptions: {js: {}, template: {}, style: {}}` key [compiler#64](https://github.com/riot/compiler/issues/64)
  - Fix un-escape parser options in html [compiler#63](https://github.com/riot/compiler/issues/63)

## 2.3.18 *April 2, 2016*

- __riot__
  - Add the possibility to debug the internal tags cache exposed in `riot.vdom`
  - Fix nested virtual tag unmount issue [riot#1652](https://github.com/riot/riot/issues/1652)
  - Fix select reset on the onchange event [riot#1667](https://github.com/riot/riot/issues/1667)
  - Fix using the new `data-is` attribute the custom tag css are not applied [riot#1666](https://github.com/riot/riot/issues/1666)
  - Update enable the overriding of the riot internal methods [riot#1616](https://github.com/riot/riot/issues/1616)

- __route__
  - Fix subroute context [riot-route#52](https://github.com/riot/route/pull/52)

## 2.3.17 *March 9, 2016*

- __riot__
  - Add support for `data-is` (together with `riot-tag`) attribute to bind riot tags to existing DOM elements [more info](http://riotjs.com/guide/#html-elements-as-tags)
  - Fix regression of the input values update patch introduced to fix [riot#1612](https://github.com/riot/riot/issues/1612). This fix is a breaking change and we are [discussing](https://github.com/riot/riot/issues/1642) whether to introduce it in riot 3.0.0
  - Fix checkbox update issue [riot#1647](https://github.com/riot/riot/issues/1647)
  - Fix problem with looped `<option>` [riot#1374](https://github.com/riot/riot/issues/1374)
  - Fix all the tags will be lowercase [riot#1622](https://github.com/riot/riot/issues/1622)

## 2.3.16 *February 27, 2016*

- __riot__
  - Update project copyright [more info](https://github.com/riot/riot/pull/1584) see also [riot#1545](https://github.com/riot/riot/issues/1545)
  - Add global mixins feature [more info](/api/#mixin-global)
  - Fix server side each bug on using the tables [riot#1628](https://github.com/riot/riot/issues/1628)
  - Fix override of the `root` protected property in loops [riot#1627](https://github.com/riot/riot/issues/1627)
  - Fix textarea bug on IE11 [riot#1625](https://github.com/riot/riot/issues/1625)
  - Fix wrong input behavior on update [riot#1612](https://github.com/riot/riot/issues/1612)
  - Fix IE loop performances issues [riot#1599](https://github.com/riot/riot/issues/1599)
  - Fix weird loop bug [riot#1581](https://github.com/riot/riot/issues/1581)

- __cli__
  - Fix path issue on Windows [riot#1605](https://github.com/riot/riot/issues/1605)

## 2.3.15 *January 31, 2016*

- __riot__
  - Fix `<virtual>` tag update [1512](https://github.com/riot/riot/issues/1512)
  - Fix the `riot.update` method [1353](https://github.com/riot/riot/issues/1353)

- __compiler__
  - Fix use the `defer` attribute on the `<script>` tags to load them in runtime [1492](https://github.com/riot/riot/issues/1492)
  - Fix [riot#1511](https://github.com/riot/riot/issues/1511) : Escape Quotes - They may be some issues to fix
  - Regression of logic to parse style and script tags, due to loss of performance and other issues
  - Removed the "compress" option of the `less` parser, which is deprecated and generates warnings in the console
  - Removed the useless CSS parser `stylus` from the browser version
  - Refactorization of all the code, with more comments in preparation for the automatic documentation of the API
  - Various tweaks to increase performance and reduce (~55%) memory consumption
  - Files to preprocess are moved from "lib" to the "src" directory, now "lib" has the required node.js files only

- __tmpl__
  - Refactorization, now `tmpl` and `brackets` are ~5% faster
  - Removed unused `tmpl.isRaw` function (internal)
  - Changes to comments
  - Files to preprocess are moved from the "lib" to the "src" directory, "lib" was removed


## 2.3.13 *January 11, 2016*

- __riot__
  - Fix serverside rendering issue using the value attribute on the `textarea, option` tags [more info](https://github.com/riot/riot/issues/1455)
  - Fix nested `yield` slot issue [more info](https://github.com/riot/riot/issues/1458)
  - Add support for `yield` slots serverside
  - Add better strategy for css injection [more info](https://github.com/riot/riot/issues/1439)
- __observable__
  - Fix the issue with the errors swallowed in the callbacks [more details](https://github.com/riot/riot/issues/1483), you no longer need `tag.on('error', cb)` to catch them
  - Change the `all` method replaced with `*` to provide a more consistent api [more info](http://riotjs.com/api/observable/#on)
- __compiler__
  - Fix [riot#1495](https://github.com/riot/riot/issues/1495) : Warning of input tag value - Avoids warnings for date/datetime/time/month/email/color types with expression in its value.
  - Fix [riot#1488](https://github.com/riot/riot/issues/1488) : Cannot read property 'replace' of undefined when compiling in Node a tag with an import in its less stylesheet -- Thanks to @jrx-jsj
  - Fix [riot#1448](https://github.com/riot/riot/issues/1448) : Riot compiler parses and removes content from string declaration. This is partial fix, you need to write `<\/script>` for closing script tags within quoted strings.
  - Revised regex that matches `<pre>` tags.
- __tmpl__
  - Fix issues with double quotes.
- __cli__
  - Fix for the `watch` task in case of errors, it will keep running re-starting a new subprocess forever on any error
  - Add better `version` output showing only the `riot-compiler` and the `riot-cli` version currently in use
- __route__
  - Add server side support [more details](https://github.com/riot/route/issues/18)
  - Add replaceState support [more details](/api/route/#riot-route-to-title-shouldreplace)


## 2.3.12 *December 15, 2015*

- __compiler__
  - Fix issues on IE 9/10 and other minor issues
  - Add the `exclude` to remove singularly portions of your tags from the output like `css`, `js` or `html`
  - Add `url` as third parameter to the `compile` method to better debug the output
- __route__
  - Fix important issues on IE and safari
  - Fix a [regression api bug](https://github.com/riot/route/issues/30)
- __cli__
  - Add the `--config` option to load your cli options and parsers from an external es6 config file [more details](/guide/compiler/#es6-config-file)
  - Add better support for `babel 6` if combined with our [babel-preset-es2015-riot](https://github.com/riot/babel-preset-es2015-riot)
- __riot__
  - Add multi transclusion [more details](/api/#multi-transclusion)
  - Fix loops containing null items

## 2.3.11 *November 22, 2015*

- __compiler__
  - Gets rid of the zero-indentation restriction for custom tags, now you can indent these tags, but the opening and closing tag must have exactly the same indentation (length and type). All the tag will be unindented by this amount.
  - Support for `src` and `charset` attributes in `<script>` tags for reading JavaScript sources from the file system - [riot#507](https://github.com/riot/riot/issues/507)
  - The `compile` function can return separate parts by setting the new `entities` option. These parts have unescaped newlines.
  - New attribute `options` for `script` and `style` tags will append/overwrite attributes in the default configuration object of the parser at tag level.
  - Fix [riot#1261](https://github.com/riot/riot/issues/1261): `<pre>` tag does not preserve neither `\n` nor `\t`.
    Now whitespace within `<pre>` tags is always preserved.
  - Fix [riot#1358](https://github.com/riot/riot/issues/1358): Empty style in tag (scoped) breaks.
  - Fix [riot#1306](https://github.com/riot/riot/issues/1306): Compiler preserves newlines in class objects, causing "Unterminated String Constant" errors.
  - Fix [riot#1314](https://github.com/riot/riot/issues/1314): `settings.brackets` no longer works.

- __riot__
  - Fix support for `riot.render` on the old node versions
  - Fix loop small issues using
  - Fix `riot.route` will not block not registered links with `event.preventDefault`
  - Add `error` event on all the `riot.observable` instances to catch all the possible errors thrown in the callbacks

- __cli__
  - Add better error messages if a parser is not locally installed
  - Add the `export` option to extract singularly just portions of your tags like `css`, `js` or `html`
  - Add the `style` option to chose the default preprocessor for your tags style
  - Add built-in css preprocessor support for `sass`, `scss` and `less`

## 2.3.1 *November 10, 2015*

- Add the `babel` parser to support the brand new babel 6 release, use `es6` if you still want to use the previous babel releases
- Update `riot.route.start(autoExec)` start listening the url changes and also exec routing on the current url.
- Remove `compiler.js` `compiler.min.js` from the project root, please use always `riot+compiler.js` instead
- Fix the broken [`modular` option](https://github.com/riot/cli/issues/7) in the `riot-cli`
- Fix the broken [`riot.render`](https://github.com/riot/riot/pull/1330) method

## 2.3.0 *November 5, 2015*

This major release is a big step forward for riot and it fixes [many issues](https://github.com/riot/riot/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed)
organizing the code base in several modules.
Riot was split in 6 different modules:

- [compiler](https://github.com/riot/compiler)
- [tmpl](https://github.com/riot/tmpl)
- [observable](https://github.com/riot/observable)
- [route](https://github.com/riot/route)
- [core](https://github.com/riot/riot)
- [cli](https://github.com/riot/cli)

Here the list of our biggest changes:

- Add html5 history router please check [the documentation](/api/route/)
- Add new rewritten versions of the compiler, template engine and the command line
- Deprecate `riot.mountTo`
- Change `tag._id` to `tag._riot_id` **you should not use riot internal "private" properties anyway**
- Fix the use of `yield` on the server
- Fix memory leak in `riot.render`
- Fix the use of dynamic attributes such as `name` `id`
- Update loop behaviour, they will be a bit slower but more reliable you can use the `no-reorder` option if you want to enable a faster rendering algorithm [more details](/guide/#loops-advanced-tips)

## 2.2.4 *August 12, 2015*

- Fix the remaining core bugs before the bigger 2.3.0 release [more details](https://github.com/riot/riot/issues?q=is%3Aissue+milestone%3A2.2.4)
- Add support for multiple style blocks in the same component
- Fix bugs related to the context lost in the nested loops
- Added more tests to the codebase
- *NOTE*: This is the last stable release before dropping the IE8 support
- [Short-term roadmap](https://github.com/riot/riot/issues/1063)

## 2.2.3 *August 4, 2015*

- Fix many bugs [more details](https://github.com/riot/riot/issues/1063)

## 2.2.2 *July 5, 2015*

- New child components will inherit properties from the parent also in a loop
- New riot is able to compile attributes also on the top level tag [more details](https://github.com/riot/riot/issues/948)
- Improve the loop performances and fix many bugs
- Improve the AMD/commonjs compatibility
- Fix the error thrown in the compiler for the tags using type=text/javascript attribute
- Fix parent variables not exposed to the loop children, now __all the children in a loop will inherit the parent properties/methods__ [more details](https://github.com/riot/riot/issues/896)
- Fix the error thrown trying to override read only events properties
- Fix the riot cli combined with the --modular flag when no output file is specified

## 2.2.1 *June 28, 2015*

- Fix the options are not correctly passed to the children in a loop [more details here](https://github.com/riot/riot/issues/884)

## 2.2.0 *June 27, 2015*

- New super fast loop logic ( the DOM nodes will be no longer reordered [more details here](https://github.com/riot/riot/issues/484) )
- Re-enable the `use strict` mode
- Re-enable the `coffescript` mode for the nostalgics
- Fix inconsistencies using loop with empty or null arrays
- Fix the `mount` in the loop children
- Increase the code coverage
- Add the possibility to specify where riot will inject the custom tags [css in the DOM](/guide/#scoped-css)

List of bug fixes and details can be found [here](https://github.com/riot/riot/issues/773)

## 2.1.0 *May 20, 2015*

- [Mixins](/guide/#mixins)
- Ability to define attributes for the root element on the tag definition
- Split the node compiler from the browser compiler
- Simplify the build script using [smash](https://github.com/mbostock/smash)
- Add Saucelabs tests hooks for crossbrowser testing
- Add Coveralls coverage hooks to check the code coverage on any pull request

List of bug fixes and details can be found [here](https://github.com/riot/riot/issues/648)

## 2.0.15 *Apr 23, 2015*

- A new `<yield>` core tag allowing [html transclusion](/guide/#nested-html)
- A new [riot-tag](/guide/#html-elements-as-tags) attribute to use standard HTML elements as mount nodes
- `tag.unmount(flag)` to decide whether the parent should be removed or not from the DOM
- `riot.route.start()` and `riot.route.stop()` methods to start and stop the Riot router. These methods allow the use of a different router on your application.
- The server side compiler now supports AMD and CommonJS modules with `--modular` or `-m` command line option
- Numerous [bug fixes](https://github.com/riot/riot/issues/584)
- Special thanks to *[@GianlucaGuarini](https://github.com/GianlucaGuarini)* for this release


## 2.0.14 *Apr 8, 2015*

- [Server side rendering](/guide/#server-side-rendering)
- [Bug fixes](https://github.com/riot/riot/compare/v2.0.13...v2.0.14)

## 2.0.13 *Mar 11, 2015*

- A large bug fix release consisting of [pull requests](https://github.com/riot/riot/compare/v2.0.12...v2.0.13) from the community only. Thank you!
- Larger [test suite](https://github.com/riot/riot/tree/master/test)

## 2.0.12 *Mar 2, 2015*

- Support for [Scoped CSS](/guide/#scoped-css)
- Direct [access to nested tags](/api/#nested-tags) and their API via `tags` variable. For example: `tags.my_timer.clear()`
- The custom tags are now constructed on parse time and initialized on mount time. This is preliminary work for the upcoming [plugin system](https://github.com/riot/riot/issues/416) and allows plugins to do their thing before initialization as well.
- `--whitespace` compiler option to preserve newlines and whitespace on the generated output. Good with nested `pre` and `textarea` elements.
- Using [Karma](http://karma-runner.github.io/0.12/index.html) for cross browser testing
- *WARNING* the deprecated `riot.mountTo` will be removed on the next release


## 2.0.11 *Feb 23, 2015*

- `riot.mount` now accepts the same parameters as `riot.mountTo`, which is now *deprecated*
- New `riot.mount(selector, tagName, opts)` allows you to mount a certain tag to any selection of HTML elements
- `riot.unmount` followed with `riot.mount` now correcly replaces the earlier tag
- Test suite v1. Expect this to grow in size and functionality. Thanks to [@GianlucaGuarini](https://github.com/GianlucaGuarini)


## 2.0.10 *Feb 19, 2015*

- [Todo MVC example](https://github.com/txchen/feplay/tree/gh-pages/riot_todo)
- Array items can be sorted and reordered and the view updates accordingly. Thanks to [@pakastin](https://github.com/pakastin)!
- Nested `style` tags are automatically inject into `<head>` to avoid duplicate definitions
- Ability to define tags on the same line: `<tag></tag>`
- Single line ES6 style methods: `foo() { this.bar = 'baz' }`
- No illegal server requests with images: `<img src={ src }>`
- Fix compiler to support custom brackets
- `this.update()` is no longer needed when defining tags manually with `riot.tag`. This method is now automatically called after an event handler is executed
- [Contributing guidelines](https://github.com/riot/riot/blob/master/CONTRIBUTING.md)


## 2.0.9 *Feb 13, 2015*

- LiveScript support
- Ability to set `if`, `show` and `hide` attributes for a custom tag
- Multiple class shortcut: `{ 'foo bar': baz }`
- Took away `children` property, which was designed for theoretical need mostly.
- A memory leak fix on `riot.observable`. Thanks to [@GianlucaGuarini](https://github.com/GianlucaGuarini) for the hard debug work and everyone else on this [pull request](https://github.com/riot/riot/issues/248)


## 2.0.8 *Feb 9, 2015*

- New `unmount()` method and `children[]` property for [tag instances](/api/#tag-instance)
- One way data flow: updates and unmounts always propagate downwards from parent to children
- The `if` attribute now works as expected by adding or removing the root node from DOM
- [Compiler API](/api/compiler/) exposed to the public
- Global variables are supported in expressions, e.g. `{ location }`
- Customizable `.tag` extension, e.g. `riot --ext html`
- [Customizable brackets](/api/misc/#brackets), e.g. `riot.settings.brackets = '${ }'`
- Ability to print the current version with: `riot --version`
- The semi-hidden `riot._tmpl()` is now completely hidden and not part of the global `riot` object
- Reorganized source code. The former big `view.js` is now split into [multiple files](https://github.com/riot/riot/tree/master/lib/browser/tag)


## 2.0.7 *Jan 29, 2015*

- Super fast [in-browser compilation](/guide/compile/) for: `<script type="riot/tag">`
- Built-in [Typescript support](/guide/compiler/#typescript)
- Ability to plug in a HTML pre-processor (along with JS processor)
- Built-in [Jade support](/guide/compiler/#jade)
- Ability to define [custom parsers](/api/#route-parser) for router.
- Markup can be written with valid XML and HTML5 void tags are not self-closed
- Allow definition of empty placeholder tags. Good on development phase.
- `riot.observable()` now returns a new observable when called without the argument
- Compiler is now called like this:


```
var riot = require('riot')
var js_string = riot.compile(tag_source_string)
```


## 2.0.5 *Jan 27, 2015*

- An ability to plug in a JavaScript pre-processor
- Built-in CoffeeScript support
- Built-in EcmaScript 6 support


## 2.0.2 *Jan 26, 2015*

- CommonJS and AMD support
- Component support
- Bower support
- `npm install` now works under io.js and node 0.11
- `require('riot')` now returns riot.js (plays nicely with Browserify etc.)
- `require('riot/compiler')` returns the compiler
- `riot.js` and `riot.min.js` are now found on the repository root
- hosted on [cdnjs](https://cdnjs.com/libraries/riot) and [jsdelivr](http://www.jsdelivr.com/#!riot)


## 2.0 *Jan 22, 2015*

[A React- like, 2.5KB user interface library](https://muut.com/blog/technology/riot-2.0/)

A significant non- backwards compatible update.

![](https://muut.com/blog/technology/riot-2.0/riot1to2.png)


## 1.0 *April 15, 2014*

Removal of jQuery dependency.


## 0.9 *November 01, 2013*

[The 1kb client-side MVP library](https://muut.com/blog/technology/riotjs-the-1kb-mvp-framework.html)

The initial release.
