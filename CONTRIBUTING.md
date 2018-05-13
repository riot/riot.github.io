# Contributing to riot.js.org

[riot.js.org](http://riot.js.org/) is our documents site for Riot.js.

If you’d like to contribute to improve or translate the docs, you can fork this repo, commit your changes, & send a pull request.

## Improving (English)

Send a pull request to the `master` branch.

## Translation

In short:

- add translation into directory named your language
- send a pull request to `lang/vesion` branch

For example `fr/v2.2.4` or `ja/v2.3.0`.

If there's no translation yet, follow the instruction below.

### Start project for new language:

- Make a new issue about translation [like this](https://github.com/riot/riot.github.io/issues/23)
- [Pick your language code](http://www.sitepoint.com/web-foundations/iso-2-letter-language-codes/). For example: `ja`, `zh`, `es`, `de`, ...etc.
- Collaborators will make a new branch for translation. For example `fr/v2.2.4` or `ja/v2.3.0`.
- Fork the branch, and add some files and directories below.
- Send pull request to the branch. You don't have to complete. It's OK if it's on the way.

### Files and directories:

- Make a new directory at `/` (root) with the name from your language code. For example: [/ja/](https://github.com/riot/riot.github.io/blob/master/ja/)
- Put your translated files into your directory. Follow the original structure. For example:
  - [/index.md](https://github.com/riot/riot.github.io/blob/master/index.md) --> [/ja/index.md](https://github.com/riot/riot.github.io/blob/master/ja/index.md)
  - [/api/index.md](https://github.com/riot/riot.github.io/blob/master/api/index.md) --> [/ja/api/index.md](https://github.com/riot/riot.github.io/blob/master/ja/api/index.md)
- Make some HTML parts in `/_includes/`. Create a new directory there and put these files into it. For example:
  - [/_includes/ja/api-tabs.html](https://github.com/riot/riot.github.io/blob/master/_includes/ja/api-tabs.html)
  - [/_includes/ja/guide-tabs.html](https://github.com/riot/riot.github.io/blob/master/_includes/ja/guide-tabs.html)
- Make a Jekyll template for your language in `/_layouts/`. For example:
  - [/_layouts/ja.html](https://github.com/riot/riot.github.io/blob/master/_layouts/ja.html)

### Check the site locally:

See [Jekyll document](http://jekyllrb.com/docs/quickstart/). Don't worry, easy steps. Basically just two:
- `$ sudo gem install jekyll`
- `$ jekyll serve` at the root directory of this project.

If you use Windows, [check this instruction](http://jekyllrb.com/docs/windows/), too.

### When translation complete:

- Send PR to `master` branch and let someone merge it. (PR is preferred way, but, maintainer can merge it directly if the change is small)
- Remove working branch: ex. `fr/v2.2.4` or `ja/v2.3.0`
- Add tag: ex. `v2.2.4-fr` or `v2.3.0-ja`

### Keep updating continuously:

- We're discussing about [Tagging and branching convention](https://github.com/riot/riot.github.io/issues/16).
- Don't work hard alone, invite your friend as a translator or a reviewer.
- Make a team for your language!


## Note

- No need to translate [v1.0 docs](https://github.com/riot/riot.github.io/blob/master/guide/v1.0.md)
- For translations into languages with [T–V distinction](https://en.wikipedia.org/wiki/T%E2%80%93V_distinction), it is recommend to use V-form.
