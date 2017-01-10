---
layout: default
title: Release notes
id: release-notes
---

# {{ page.title }}

## 3.0.6 *January 10, 2017*

__riot__:

  - _Fix:_ inconsistencies between the `show`, `hide` and `if` directives [riot/2158](https://github.com/riot/riot/issues/2158)
  - _Fix:_ `import riot from 'riot'` using webpack and babel [riot/2091](https://github.com/riot/riot/pull/2091)
  - _Fix:_ loop sorting issue [riot/2205](https://github.com/riot/riot/issues/2205)
  - _Fix:_ issue using dynamic `data-is` attributes [riot/2175](https://github.com/riot/riot/issues/2175)
  - _Fix:_ `if` directive in object loops [riot/2133](https://github.com/riot/riot/issues/2133)
  - _Fix:_ serverside rendering on Windows machines [riot/2131](https://github.com/riot/riot/pull/2131)


## 3.0.5 *December 18, 2016*

__riot__:

  - _Fix:_ internal `parent` attribute should be protected from external override [riot/2154](https://github.com/riot/riot/issues/2154)
  - _Fix:_ selected on `<select><option>` doesn't seem to work right on riot 3 [riot/2164](https://github.com/riot/riot/issues/2164)

## 3.0.4 *December 14, 2016*

__riot__:

  - _Fix:_ restore the `show/hide` behavior [riot/2156](https://github.com/riot/riot/issues/2156)

## 3.0.3 *December 13, 2016*

__riot__:

  - _Fix:_ mount and unmount css injection performances [riot/2152](https://github.com/riot/riot/issues/2152)
  - _Fix:_ different scope between `show`, `hide` and `if` [riot/2125](https://github.com/riot/riot/issues/2125)
  - _Add:_ `data-src` to fetch riot tags avoiding browsers prefetching [riot/2132](https://github.com/riot/riot/issues/2132)
  - _Remove:_ support for SPM [riot/2124](https://github.com/riot/riot/pull/2124)

## 3.0.2 *December 4, 2016*

__riot__:

  - _Fix:_ when using riot-viewBox inside an svg tag it is replaced by viewbox.  [riot/2086](https://github.com/riot/riot/issues/2086)
  - _Fix:_ tag mounted with data-is="{some expression}" is not updating [riot/2102](https://github.com/riot/riot/issues/2102)
  - _Fix:_ attributes are not removed when other tag without attributes is mounted on an element [riot/2098](https://github.com/riot/riot/issues/2098)
  - _Remove:_ removes SPM support [riot/2124](https://github.com/riot/riot/pull/2124)

__riot-tmpl__:

  - _Change:_ avoid to use `console.error` if a user has defined already a custom error function [riot/2108](https://github.com/riot/riot/issues/2108)
  - _Change:_  prefer lowercase to debug tags names

__riot-compiler__:

  - _Change:_ internal regex to support the `@apply rule` provided by css preprocessors

__riot-route__:

  - _Fix:_ router with query param not working [riot-route/74](https://github.com/riot/route/issues/74)
  - _Fix:_ remplate literals break IE [riot-route/77](https://github.com/riot/route/issues/77)


## 3.0.1 *November 26, 2016*

__riot__:

  - _Fix:_ riot@3.0.0 should export default [riot/2084](https://github.com/riot/riot/issues/2084)
  - _Fix:_ class does not remove when value becomes false [riot/2082](https://github.com/riot/riot/issues/2082)
  - _Fix:_ auto update input values after edited it with User [riot/2096](https://github.com/riot/riot/issues/2096)
  - _Fix:_ error when unmount tag that contains ref element [riot/2083](https://github.com/riot/riot/issues/2083)
  - _Fix:_ error toggling child with multiple mixins [riot/2100](https://github.com/riot/riot/issues/2100)
  - _Fix:_ toggling 'if' of 'data-is' tag creates new reference in parents 'tags' object [riot/2089](https://github.com/riot/riot/issues/2089)


## 3.0.0 *November 22, 2016*

It has been a long journey but in the end we made it and riot@3.0.0 is finally out and it represents a
step forward compared to riot 2 for stability, performances and flexibility.

List of improvements and breaking changes

__riot__:

  - _Change:_ build riot using rollup+babel instead of smash using only es6 modules syntax
  - _Change:_ clean up the tests (we use 371 tests!) splitting them into several files written in es6 and we switched to chai.js replacing expect.js
  - _Change:_ improve the loop performances, now the update method is much faster than before.
  - _Change:_ deprecate `riot-tag` in favor of `data-is`
  - _Change:_ use the `ref` attribute instead of `name` and `id` [riot/1185](https://github.com/riot/riot/issues/1185) (__breaking change__)
  - _Change:_ remove riot-route from the core making it optional [riot/1485](https://github.com/riot/riot/issues/1485) (__breaking change__)
  - _Change:_ avoid that the update and the updated events get triggered before any tag has been mounted [riot/1661](https://github.com/riot/riot/issues/1661) (__breaking change__)
  - _Change:_ different approaches in iterable objects in different contexts of "each - in" [riot/1420](https://github.com/riot/riot/issues/1420) (__breaking change__)
  - _Add:_ support for es6 classes to create tags [more info](/api/#riottagel-opts)
  - _Add:_ the `shouldUpdate` method to the tags to emulate componentShouldUpdate in react
  - _Remove:_ the __ prefix for the "boolean" html attributes [riot/276](https://github.com/riot/riot/issues/276)
  - _Remove:_ the automatic preventDefault from the riot DOM events [riot/1770](https://github.com/riot/riot/issues/1770) [riot/1718](https://github.com/riot/riot/issues/1718) [riot/526](https://github.com/riot/riot/issues/526) (__breaking change__)
  - _Fix:_ all the issues related to the if conditions [riot/1477](https://github.com/riot/riot/issues/1477) [riot/1658](https://github.com/riot/riot/issues/1658)
  - _Fix:_ avoid to inherit properties from the parent in loops of custom children tags [riot/1697](https://github.com/riot/riot/issues/1697)
  - _Fix:_ avoid to update the parent tag on the events generated from a child tags [riot/1319](https://github.com/riot/riot/issues/1319) (__breaking change__)
  - _Fix:_ arrays with multiple tags of the same name don’t contain actual tag elements [riot/2061](https://github.com/riot/riot/issues/2061)
  - _Fix:_ the data-is attribute is not updated for dynamic tags  [riot/2037](https://github.com/riot/riot/issues/2037)
  - _Fix:_ virtual with each doesn't remove tag references from parent tag  [riot/2029](https://github.com/riot/riot/issues/2029)
  - _Fix:_ each and switching between object and array [riot/2027](https://github.com/riot/riot/issues/2027)
  - _Fix:_ properties set in looped custom tag element event seem to be cleared by parent update [riot/2019](https://github.com/riot/riot/issues/2019)
  - _Fix:_ riot+compiler.js:1245 Uncaught NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node - when adding to an 'each' structure from a recursively created element onlick [riot/1962](https://github.com/riot/riot/issues/1962)
  - _Fix:_ input numbers leave unprocessed expressions after upgrade to 2.6.0 [riot/1957](https://github.com/riot/riot/issues/1957)
  - _Fix:_ memory  leak [riot/1955](https://github.com/riot/riot/issues/1955)
  - _Fix:_ `require(*tag-name*)` does not allow `parserOptions` [riot/1935](https://github.com/riot/riot/issues/1935)
  - _Fix:_ clear riot tag cache to aid with testing [riot/1875](https://github.com/riot/riot/issues/1875)
  - _Fix:_ 'before-mount' won't work as expected in riot#render [riot/1851](https://github.com/riot/riot/issues/1851)
  - _Fix:_ the logic is not work with if and class together [riot/1769](https://github.com/riot/riot/issues/1769)
  - _Fix:_ should we add a updateSelf() API? [riot/1748](https://github.com/riot/riot/issues/1748)
  - _Fix:_ virtual elements disappear after tag update [riot/1659](https://github.com/riot/riot/issues/1659)
  - _Fix:_ can I use the bool attribute with the custom tag? (like "disabled") [riot/1618](https://github.com/riot/riot/issues/1618)
  - _Fix:_ extra expression evaluation when using attributes [riot/1590](https://github.com/riot/riot/issues/1590)
  - _Fix:_ eS6 class syntax with child tags [riot/1451](https://github.com/riot/riot/issues/1451)
  - _Fix:_ different approaches in iterable objects in different contexts of "each - in" [riot/1420](https://github.com/riot/riot/issues/1420)
  - _Fix:_ support conditions with virtual tag [riot/139](https://github.com/riot/riot/issues/139)
  - _Fix:_ riot-tag as expression in loop [riot/1368](https://github.com/riot/riot/issues/1368)
  - _Fix:_ all treeitem tag have children [riot/1361](https://github.com/riot/riot/issues/1361)
  - _Fix:_ method for clearing compiler state [riot/1236](https://github.com/riot/riot/issues/1236)
  - _Fix:_ dynamically loaded child tags don't get into the parents tags object [riot/1174](https://github.com/riot/riot/issues/1174)
  - _Fix:_ [Q] Child tags counts not matched? [riot/1088](https://github.com/riot/riot/issues/1088)
  - _Fix:_ inconsistent tags behaviour with 1 item vs many  [riot/936](https://github.com/riot/riot/issues/936)
  - _Fix:_ no way to override name attribute on e.g. &lt;input&gt;s to prevent overriding existing properties on `this` [riot/715](https://github.com/riot/riot/issues/715)

__riot-observable__:

  - _Remove:_ support for spaced events, `el.on('foo bar')` becomes `el.on('foo').on('bar')` (__breaking change__)
  - _Fix:_  optimize speed x6 faster than before

__riot-tmpl__:

  - _Change:_ template errors will be always output via `console.error` if the console api is available (__breaking change__)

__riot-compiler__:

  - _Fix:_ allow the es6 import also inside the tags [compiler/69](https://github.com/riot/compiler/issues/69)
  - _Fix_: all the `value` attributes using expressions will be output as `riot-value` to [riot#1957](https://github.com/riot/riot/issues/1957)
  - _Change:_ css generated via riot-compiler will be always scoped (__breaking change__)
  - _Deprecate:_ old `babel` support, now the `es6` parser will use Babel 6 by default (__breaking change__)


### Thank you all!

Many thanks to all the riot community and to all our users who have really helped us making the best decisions to improve this framework.
Special thanks go to [@rogueg](https://github.com/rogueg) for his great work on the riot source code and he is now part of the riot core team.
Thanks also to the other core contributors and collaborators for the hard work on this project you are awesome.

### What comes next?

[@tipiirai](https://github.com/tipiirai) is working on a brand new riot release experimenting new rendering strategies and big core improvements that will be part of riot@4.0.0

For the next releases we will mainly focus on improving the initial rendering performances [riot/2034](https://github.com/riot/riot/issues/2034). We will try to bring the compiler sourcemaps and a better support for hot modules replacement stay tuned!

