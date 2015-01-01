# Template Skeleton

**This is a boilerplate repo for sitebuilds/templates.**


## Usage

1. Clone the repo
2. Remove git history if does not want to follow changes of the skeleton repo
3. Customize name, description, license, etc. values in `package.json` and `bower.json` files
4. Create your own template


## Documentation

This is a short documentation of the used modules in this sitebuild template. Each included module is part of the usually recommended tools for a good template/sitebuild. However, you are free to remove any, if you don't need it. Please not, that the module must be removed from the `package.json` file AND the `Gruntfile.js` file as well. For configuration examples, check the `Gruntfile.js` or the official site of each module. We use `bower` as a package manager.

PRs are welcome to improve the workflow.


### Developer Workflow

There are two commands which a developer should use:

- `grunt`
- `grunt work`

The first one builds the whole project. The second one does two things: starts a webserver pointing to your distribution directory and watches your source directory (`src/html/` and `src/less`) for changes and rebuilds that part of the project if anything changed. If you have livereload installed in your browser, you don't event have to reload the site.


### Paths

You can modify some paths in `Gruntfile.js` to set custom destinations. However you have to make sure to use these path variables in your HTML templates and in `Gruntfile.js`as well.


### LESS

We prefer LESS as our CSS extension tool. The latest Twitter Bootstrap release is already installed and added to the workflow. Check the `src/less/` directory. By default a `style.css` and a `style.min.css` file is generated with Twitter Bootstrap included. We recommend to add custom styles in `main.less` (or create your own file structure for custom styles) and use `style.less` as the main bootstrap file.

### JavaScript

We recommend to put your custom javascript files in `src/js/`. All files in this directory gets copied to the distribution files, also gets uglified. This way you can include `*.min.js` files in your production environment (if you want). During development use the original files instead.

Some recommended libraries are installed by default:

- jQuery
- HTML5 Shiv
- Modernizr
- Respond.js


### HTML

We use `processhtml` to generate HTML files. This lets you to create a common layout (header, nav, footer, etc.) and use it to generate the full page without repeating yourself. There is also a beautifying mechanism which makes your HTML files correctly indented. The default setting is to use tabs for indentation.


### Vendor files

All required files (which are not less files) should be copied to the distribution directory without processing. Also your custom files in `src/fonts/`, `src/js/` and `src/img/` are copied to the assets.


### Humans.txt

We encourage everyone to place a `humans.txt` file in their website. This module makes this a lot more easier. Modify `src/humans.json` to add information. This is probably useless for a template.

Module website: https://github.com/roughcoder/grunt-humans-txt


### Favicon generation

Favicons are getting more and more important. In the old times we had a single icon for browsers. Nowadays different mobile platforms require different favicons. This module helps in it a lot. You only have to place a favicon big enough (there is an example in `src/favicon.png` which is 180x180 pixel) to generate one (or more) for all the required platforms.

**Note:** You have to install `node-gyp` globally in your prefix to make it work.

Module website: https://github.com/gleero/grunt-favicons

### Firefox manifest

Firefox manifest includes information about your application and the place of favicons for each size.

Module website: https://github.com/ro-ka/grunt-firefox-manifest

### Manifest Appcache

This file is very usefull to use HTML5 cache of assets. Grunt can automatically generate on from the list of files in the distribution folder. You can also add an offline page here, which can be shown by the browser if your website is down. It is recommended for template developers to add this offline file, so users does not have to make it.

Module website: https://github.com/gunta/grunt-manifest

Look for "HTML5 Cache" to learn more about it.

### Modernizr

This module checks all your CSS files (the generated ones as well) and checks which features are used in them. Based on this, a generated modernizr file is placed in your distribution directory which only includes the required tests. This reduces load time. For this module to work `modernizr` must be installed by bower, so only remove it from bower config if you remove it completely.

Module website: https://github.com/Modernizr/grunt-modernizr
