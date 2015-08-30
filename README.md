
# d3-plugin-dist

This is a repo that collects varies d3 plugins scattered around the web and compiles
them into a distributable format.

Plugins included in this repo will be distributed in:

* ES6 module
* Anonymous AMD
* Named AMD
* Common JS
* Global

# Distribution Model

`master` branch is the development edge and contains all plugin distributions source.

`plugin/*` branches are individual plugin distribution branch. Contributions
should go into master branch first and built distribution checked into these branches. These
branches will be tagged with version.

`npm` module will contain all plugin distributions. If you only need individual plugin, please
reference it by git repo.

# Licensing

Each individual plugin's author owns their own work. If you do not like your plugin published this
way, please open an issue.
