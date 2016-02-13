# www.fyianlai.com

[![Build Status](https://travis-ci.org/MrSaints/www.fyianlai.com.svg?branch=gh-pages)](https://travis-ci.org/MrSaints/www.fyianlai.com)
[![devDependency Status](https://david-dm.org/MrSaints/www.fyianlai.com/dev-status.svg)](https://david-dm.org/MrSaints/www.fyianlai.com#info=devDependencies)

A personal website powered by [Jekyll][jekyll].

It is using a custom theme; handcrafted with help from [civil.css][civilcss] library.

See [`humans.txt`][humanstxt] for more documentation.


## Development

Install the development, and frontend dependencies: `npm install && bower install`

Most of the site's configuration can be found in [`_config.yml`][config].

Syntax highlighting is disabled by default (i.e. the CSS for it is not imported). `has_code: true` must be defined in the YAML front matter of a post / page to enable it.

Command | Description
--- | ---
`npm run build` | Compiles the site's static assets using [Gulp][gulpjs], and generates the site using Jekyll
`npm run dev` | An alias for `jekyll serve` (starts a built-in development server to preview the generated site)
`rake post["Title"]` | Creates a new post with the specified title using [Rake][rake]


[jekyll]: https://jekyllrb.com
[civilcss]: http://civilapp.github.io/civil.css
[humanstxt]: humans.txt
[config]: _config.yml
[gulpjs]: http://gulpjs.com/
[rake]: https://github.com/ruby/rake