---
layout: default
title: Release notes
id: release-notes
---

# {{ page.title }}

## 3.13.1 *November 1, 2018*

__riot__:
  - _Fix_: `skipAnonymousTags` setting doesn't effect mount event in global mixin [riot/2635](https://github.com/riot/riot/issues/2635)

## 3.13.0 *October 20, 2018*

__riot__:
  - _Add_: The `keepValueAttributes` setting to enable falsy `value` attributes removal [riot/2629](https://github.com/riot/riot/issues/2629)

## 3.12.0 *September 2, 2018*

__riot__:
  - _Add_: Components options creation via functions [riot/2613](https://github.com/riot/riot/issues/2613)

## 3.11.2 *August 29, 2018*

__riot__:
  - _Fix_: Parentnode check on virtual replace [riot/2615](https://github.com/riot/riot/pull/2615)


## 3.11.1 *July 14, 2018*

__riot__:
  - _Fix_: Upload the new `bin` folder [to npm](https://github.com/riot/riot/commit/f4b6a76ff28cfed19f944c67e2d0d86832183f62)

## 3.11.0 *July 14, 2018*

__riot__:
  - _Add_: Support for [pnpm](https://github.com/pnpm/pnpm) users [riot/2610](https://github.com/riot/riot/issues/2610)
  - _Fix_: Race condition issue with the `if` directive [riot/2609](https://github.com/riot/riot/issues/2609)

## 3.10.3 *June 20, 2018*

__riot__:

  - _Fix_: Loops - index value does not change in "if" statement during iteration [riot/2603](https://github.com/riot/riot/issues/2603)

## 3.10.2 *June 16, 2018*

__riot__:

  - _Fix_: If you reuse the declared object in the tag, an error will occur [riot/2600](https://github.com/riot/riot/issues/2600)
  - _Update_: Avoid the use of alpha dependencies, freeze `simple-dom@1.3.0`
  - _Fix_: `npm audit` dev dependencies vulnerabilities


## 3.10.1 *May 20, 2018*

__riot__:

  - _Fix_: Any element attributes that are functions are added as event handlers [riot/2592](https://github.com/riot/riot/issues/2592)
  - _Fix_: Full unnecessary rerender with lost focus after state update [riot/2585](https://github.com/riot/riot/issues/2585)


## 3.10.0 *May 10, 2018*

__riot__:

  - _Update_: [Remove the React](https://github.com/riot/riot/commit/9eb8d615d4f50ce78f30dc1952500f6591d65924#diff-0a08a7565aba4405282251491979bb6bR4) from the project description
  - _Fix_: Observable passed as mount 'opt' parameter looses on/off/etc methods [riot/2581](https://github.com/riot/riot/issues/2581)


## 3.9.5 *May 5, 2018*

__riot__:

  - _Improve_: 100% Coverage!
  - _Fix_: Components in each loop have their properties overwritten [riot/2580](https://github.com/riot/riot/issues/2580)
  - _Fix_: Elements are unintentionally left with nested conditional tags [riot/2575](https://github.com/riot/riot/issues/2575)

## 3.9.4 *April 19, 2018*

__riot__:

  - _Fix_: Styles are left after unregister() [riot/2576](https://github.com/riot/riot/issues/2576)

## 3.9.3 *April 16, 2018*

__riot__:

 - _Fix_: filter failure when looping on a string [riot/2574](https://github.com/riot/riot/issues/2574)

## 3.9.2 *April 14, 2018*

__riot__:

 - _Fix_: the `riot.unregister` fails together with `riot.mount('*')` [riot/2573](https://github.com/riot/riot/issues/2573)

## 3.9.1 *March 31, 2018*

__riot__:

 - _Fix_: keep the backward compatibility for the misleading use of the `<virtual data-is>` tags [riot/2564](https://github.com/riot/riot/issues/2564)

## 3.9.0 *February 18, 2018*

__riot__:

- _Add_: support for JSPM [riot/2540](https://github.com/riot/riot/pull/2540)
- _Update_: improve memory usage
- _Update_: partial refactoring improving the code base maintainability

## 3.8.1 *December 28, 2017*

__riot__:

 - _Fix_: prefer `console.warn` to hard `Exception Errors` to avoid breaking changes [riot/2511](https://github.com/riot/riot/issues/2511)

## 3.8.0 *December 28, 2017*

__riot__:

  - _Fix_: misleading use of `virtual` tags together with `data-is` attribute [riot/2511](https://github.com/riot/riot/issues/2511)
  - _Update_: project contributors list [riot/2512](https://github.com/riot/riot/issues/2512)

__riot-compiler__:

  - _Add_: experimental sourcemaps support

If you will compile using the `sourcemap=true` option the compiler will return an object
containing `code` and `sourcemap`. **The current riot compiler doesn't use a "real parser" so the generated sourcemaps might be inaccurate**
We will generate better sourcemap results in the next riot major release.

__riot-cli__:

  - _Add_: the `sourcemap` option to generate inline sourcemap
  - _Change_: all its API methods will return always promises if used in node

## 3.7.4 *November 5, 2017*

__riot__:

  - _Fix_: fail to display nested custom tag in loop into SVG [riot/2464](https://github.com/riot/riot/issues/2464)
  - _Fix_: function passed as undefined when on a tag with an `each` loop [riot/2474](https://github.com/riot/riot/issues/2474)
  - _Fix_: `before-unmount` is called after destroying the DOM on child tags [riot/2480](https://github.com/riot/riot/issues/2480)
  - _Fix_: fix the `uid` internal function [riot/2481](https://github.com/riot/riot/issues/2481)
  - _Add_: jsDelivr hits badge [riot/2467](https://github.com/riot/riot/issues/2467)

## 3.7.3 *October 1, 2017*

__riot__:

  - _Fix_: ternary if does not behave as expected [riot/2454](https://github.com/riot/riot/issues/2454)
  - _Add_: feature request about riot.compile [riot/2451](https://github.com/riot/riot/issues/2451)

## 3.7.2 *September 23, 2017*

__riot__:

  - _Fix_: svg dynamic preserveAspectRatio don't work [riot/2445](https://github.com/riot/riot/issues/2445)
  - _Fix_: scoping of `show` in Yielded Content [riot/2448](https://github.com/riot/riot/issues/2448)
  - _Improve_: loops performance
  - _Improve_: new tags creation preferring objects instead of function instances
  - _Improve_: simplify parent -> children tags inheritance

__riot-compiler__:

  - _Update_: dependencies and refactor some internal code avoiding bitwise operators
  - _Fix_: coffeescript parser require [riot-compiler/102](https://github.com/riot/compiler/pull/102)

## 3.7.0 *September 2, 2017*

__riot__:

  - _Add_: improve loops performance via `key` attribute [more info](/guide/#key) [riot/2418](https://github.com/riot/riot/issues/2418)
  - _Add_: tag options will be passed to the mixins `init` function [riot/2434](https://github.com/riot/riot/issues/2434)
  - _Fix_: `isMounted` returns false inside .on("mount") event [riot/2436](https://github.com/riot/riot/issues/2436)
  - _Fix_: yield with ref attribute fails to load contents [riot/2433](https://github.com/riot/riot/issues/2433)
  - _Fix_: "value" attribute is not removed if previously set and then set again to falsy value [riot/2427](https://github.com/riot/riot/issues/2427)

## 3.6.3 *August 23, 2017*

__riot__:

  - _Fix_: another attempt to fix [riot/2409](https://github.com/riot/riot/issues/2409)
  - _Fix_: [riot/2428](https://github.com/riot/riot/issues/2428) [riot/2424](https://github.com/riot/riot/issues/2424)
  - _Fix_: package-lock.json out of date [riot/2425](https://github.com/riot/riot/issues/2425)

## 3.6.2 *August 18, 2017*

__riot__:

  - _Fix_: unmount event triggered without mount event [riot/2409](https://github.com/riot/riot/issues/2409)
  - _Improve_: loops performance by removing old legacy code
  - _Improve_: refactor partially the source code preferring more ES2016 syntax goodies

## 3.6.1 *June 25, 2017*

__riot__:

  - _Remove_: `riot.csp.min.js` because it's useless in Chrome Extensions since it can be locally loaded. Use `riot.csp.js` instead

__riot-compiler__:
  - _Fix_: possible bug involving compilation of tags containing regex. [riot/2369](https://github.com/riot/riot/issues/2369)
  - _Update_: using the skip-regex function from npm for sharing bwteen modules (at future).
  - _Update_: the jsSplitter function for safer replacement of JS code, part of the next compiler.


## 3.6.0 *June 8, 2017*

__riot__:

  - _Add_: the option to block the riot automatic updates via `riot.settings.autoUpdate` [more info](/api/misc/#autoupdate) [riot/2377](https://github.com/riot/riot/issues/2377)
  - _Fix_: regex in <script> function breaks compiler [riot/2369](https://github.com/riot/riot/issues/2369)

__riot-tmpl__:

  - _Fix_: incorrect regex that matches literal regexes
  - _Fix_: use shared regex parser for browser and server versions

__riot-compiler__:

  - _Fix_: various issues with literal regexes

## 3.5.1 *May 21, 2017*

__riot-tmpl__:

  - _Fix_: `}` in output when expression contains `)/` [riot/2361](https://github.com/riot/riot/issues/2361)

__riot__:

  - _Fix_: inline DOM templates only work on top level tags [riot/2359](https://github.com/riot/riot/issues/2359)
  - _Fix_: the result of `riot.version` is displayed as WIP [riot/2352](https://github.com/riot/riot/issues/2352)


## 3.5.0 *May 13, 2017*

__riot__:

  - _Add_: enable the use of DOM inline templates [more info](/api/#tags-without-template) [riot/2296](https://github.com/riot/riot/issues/2296)
  - _Add_: easier svg sub tags support [riot/2290](https://github.com/riot/riot/issues/2290)
  - _Fix_: better error message [riot/2335](https://github.com/riot/riot/issues/2335)
  - _Fix_: show on nested tags prefers parent's context [riot/2333](https://github.com/riot/riot/issues/2333)
  - _Fix_: attributes not updating in v.3.4.4 [riot/2343](https://github.com/riot/riot/issues/2343)
  - _Fix_: bring back data-ref and ref [riot/2348](https://github.com/riot/riot/issues/2348)


__riot-cli__:
  - _Fix_: fix rollup false positive warnings [rollup-plugin-riot/89](https://github.com/riot/rollup-plugin-riot/issues/89)


## 3.4.4 *April 30, 2017*

__riot__:

  - _Fix_: remove `ref` attributes avoiding to parse them twice [riot/2329](https://github.com/riot/riot/issues/2329)
  - _Fix_: avoid to remove attributes for truthy properties [riot/2331](https://github.com/riot/riot/issues/2331)
  - _Fix_: support for IE11 events handling [riot/2332](https://github.com/riot/riot/issues/2332)


## 3.4.3 *April 24, 2017*

__riot__:

  - _Fix_: fair angular library size comparison [riot/2325](https://github.com/riot/riot/issues/2325)
  - _Fix_: data-is works differently as expression to hard-coded attribute [riot/2321](https://github.com/riot/riot/issues/2321)
  - _Fix_: scope differs between `if` and `show` [riot/2125](https://github.com/riot/riot/issues/2125)

__riot-cli__:

  - _Fix_: error exception reporting [cli/26](https://github.com/riot/cli/issues/26)

## 3.4.2 *April 14, 2017*

__riot__:

  - _Fix_: "data-is" attribute is being removed if you mount on the same element [riot/2317](https://github.com/riot/riot/issues/2317)
  - _Fix_: riot attributes remain in output [riot/2316](https://github.com/riot/riot/issues/2316)

## 3.4.1 *April 9, 2017*

__riot__:

  - _Fix_: parent tag data-is is reset when disabling a nested tag with `if="...` [riot/2311](https://github.com/riot/riot/issues/2311)
  - _Fix_: object is not valid in "show" anymore [riot/2300](https://github.com/riot/riot/issues/2300)
  - _Fix_: undefined not handled as empty string (in tags)  [riot/2297](https://github.com/riot/riot/issues/2297)
  - _Fix_: `<div if="...">` containing `<div data-is="...">` does not unmount tag properly [riot/2307](https://github.com/riot/riot/issues/2307)

## 3.4.0 *March 26, 2017*

__riot__:

  - _Fix_: `riot-` prefixed attributes will be no longer prefixed in the `opts` object [riot/2103](https://github.com/riot/riot/issues/2103)
  - _Fix_: `Null` and `undefined` expressions will be no longer converted into empty strings for the tag attributes [riot/2080](https://github.com/riot/riot/issues/2080)
  - _Fix_: style attribute with expressions makes show directive invalid at the beginning [riot/2178](https://github.com/riot/riot/issues/2178)
  - _Fix_: riot will not force all the expressions evaluating them as strings [riot/2310](https://github.com/riot/riot/issues/2310)
  - _Add_: add support for `style` and `class` object expressions more info [here](/guide/#class-object-expressions) and [here](/guide/#style-object-expressions)

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

  - _Fix:_ virtual tag is rendered when use a dynamic data-is [riot/2208](https://github.com/riot/riot/issues/2208)
  - _Fix:_ data-is attribute get removed from parent dynamic tag if child tag has yield [riot/2211](https://github.com/riot/riot/issues/2211)
  - _Fix:_ rollup server side (cjs) transpilation [riot/2216](https://github.com/riot/riot/issues/2216) [riot/2225](https://github.com/riot/riot/issues/2225) and [riot/2224](https://github.com/riot/riot/issues/2224)
  - _Fix:_ sorted list not displayed correctly [riot/2228](https://github.com/riot/riot/issues/2228) [riot/2205](https://github.com/riot/riot/issues/2205)
  - _Fix:_ conditional `if` does not work as expected with select tag and dynamic options [riot/2229](https://github.com/riot/riot/issues/2229)
  - _Change:_ renamed the `_internal` tag property to `__`, you shouldn't use them anyway
  - _Change:_ avoid to expose the `_parent` property, it's now included in the `__` key
  - _Change:_ make the `isMounted` property not iterable and writable
  - _Add:_ the experimental `riot.reload` API to handle hot module reload via webpack [more info](https://github.com/riot/tag-loader)

__riot-compiler__:

  - _Fix:_  style tag get stripped from riot tag even if it's in a javascript string. [riot/2210](https://github.com/riot/riot/issues/2210)

__riot-route__:

  - _Add:_ tag based router [riot-route/80](https://github.com/riot/route/pull/80) [more-info](/api/route#tag-based-routing)

## 3.0.7 *January 10, 2017*

__riot__:

  - _Fix:_ hot fix Broke if/each combination [riot/2207](https://github.com/riot/riot/issues/2207)

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

