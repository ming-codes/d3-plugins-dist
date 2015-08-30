
# d3-plugin-dist

This is a repo that collects varies d3 plugins scattered around the web and compiles
them into a distributable format.

Plugins included in this repo will be distributed in:

* ES6 module
* Anonymous AMD
* Named AMD `d3/plugins/*`
* Common JS
* Global `d3.plugins.*`

All plugins are hoisted inside the `d3.plugins` namespace to avoid conflict with `d3` itself.

# Distribution Model

`master` branch is the development edge and contains all plugin distributions source.

`plugin/*` branches are individual plugin distribution branch. Contributions
should go into master branch first and built distribution checked into these branches. These
branches will be tagged with version.

`npm` module will contain all plugin distributions. If you only need individual plugin, please
reference it by git repo.

# Contributing

If you found bug in any of the plugins, please open issue in the original plugin's repo
and create an issue in this repo referencing the issue. Distribution will be updated
after the original's bug is addressed.

# Licensing

Each individual plugin's author owns their own work. If you do not like your plugin published this
way, please open an issue.
