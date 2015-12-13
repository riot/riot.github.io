---
layout: default
title: Release notes
id: release-notes
---

# {{ page.title }}

## 2.3.12 *December 13, 2015*

- __compiler__
  - Fix issues on IE 9/10 and other minor issues
  - Add the `exclude` to remove singularly portions of your tags from the output like `css`, `js` or `html`
  - Add `url` as third parameter to the `compile` method to better debug the output
- __route__
  - Fix important issues on IE and safari
  - Fix a [regression api bug](https://github.com/riot/route/issues/30)
- __riot-cli__
  - Add the `--config` option to load your cli options and parsers from an external es6 config file [more details](/guide/compiler/#es6-config-file)
  - Add better support for `babel 6` if combined with our [babel-preset-es2015-riot](https://github.com/riot/babel-preset-es2015-riot)
- __riot__
  - Add the possibility to render raw markup directly via template `{= myHtml }` [more details](/guide/#render-unescaped-html)
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

- __riot-cli__
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
