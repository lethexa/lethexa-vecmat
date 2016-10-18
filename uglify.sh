#!/bin/sh

uglifyjs dist/lethexa-vecmat.js -ns -c -m --mangle-props=2 --mangle-regex="/^_/" -o build/lethexa-vecmat.min.js
