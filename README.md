# Email Skeleton

**This is a boilerplate repo for email templates.**


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

- `grunt [dist]`
- `grunt work`

The first one builds the whole project. You can optionally use the `dist` which is the default command.

The third one does two things: starts a webserver pointing to your distribution directory and watches your source directory (`src/html/`) for changes and rebuilds that part of the project if anything changed. If you have livereload installed in your browser, you don't event have to reload the site.


### Paths

You can modify some paths in `Gruntfile.js` to set custom destinations. However you have to make sure to use these path variables in your HTML templates and in `Gruntfile.js`as well.


### HTML

We use `processhtml` to generate HTML files. This lets you to create a common layout (header, nav, footer, etc.) and use it to generate the full page without repeating yourself. There is also a beautifying mechanism which makes your HTML files correctly indented. The default setting is to use tabs for indentation.
