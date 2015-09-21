
# d3-plugin-dist

[![Build Status](https://travis-ci.org/ming-codes/d3-plugins-dist.svg?branch=master)](https://travis-ci.org/ming-codes/d3-plugins-dist)
[![npm version](https://badge.fury.io/js/d3-plugins-dist.svg)](http://badge.fury.io/js/d3-plugins-dist)
[![devDependency Status](https://david-dm.org/ming-codes/d3-plugins-dist/dev-status.svg)](https://david-dm.org/ming-codes/d3-plugins-dist#info=devDependencies)

This is a repo that collects varies d3 plugins scattered around the web and compiles them into a distributable format.

Plugins included in this repo will be distributed in:

* ES6 module
* Anonymous AMD
* Named AMD `d3/plugins/*`
* Common JS
* Global `d3.plugins.*`

All plugins are hoisted inside the `d3.plugins` namespace to avoid conflict with `d3` itself.

# Contributing

If you found bug in any of the plugins, please open issue in the original plugin's repo
and create an issue in this repo referencing the issue. Distribution will be updated
after the original's bug is addressed.

# Licensing

Each individual plugin's author owns their own work. If you do not like your plugin published this
way, please open an issue.
