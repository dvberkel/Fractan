Fractan [![Build Status](https://travis-ci.org/dvberkel/Fractan.png?branch=master)](https://travis-ci.org/dvberkel/Fractan)
=======

A Fractan-interpreter

Fractan
-------

Fractan is a programming language devised by [John Conway][conway].

Every Fractan program has a number `N` and a (finite) sequence of
fractions `f_1`, `f_2` up until `f_n`. Each step one of the following
two things can happen.

1. Assign `N ← N × f_i` where `i` is the smallest such that `N × f_i`
   is integral.
2. If none of the products `N × f_i` is integral, stop.

Development
-----------

We use [npm][] to manage our dependencies and use [grunt][] to
automate common occuring tasks. Run the following command to install
all the dependencies except [phantomjs][6]

    npm install

[phantomjs][] is used for headless running the [jasmine][]
specification and needs to be available on the path. Go to the
[phantomjs download][phantomjs-download] page for intructions to
acquire phantomjs. 

### Testing

    npm test

executes the `grunt jasmine` task. This generates a `_SpecRunner.html`
from `spec/template/_SpecRunner.tmpl`. When creating new
specifications they should be referenced in the template file.

The generated `_SpecRunner.html` can be viewed in a browser for an
overview of passing/failing tests. Make sure that it is up to date by
running the `npm test` (or equivalently `grunt jasmine`) often.

[conway]: http://en.wikipedia.org/wiki/John_Horton_Conway "Wikipedia on John Horton Conway"
[npm]: https://npmjs.org/ "Node Package Manager homepage"
[grunt]: http://gruntjs.com/ "grunt.js homepage"
[phantomjs]: http://phantomjs.org "phantomjs homepage"
[jasmine]: http://pivotal.github.com/jasmine/ "Jasmine homepage"
[phantomjs-download]: http://phantomjs.org/download.html "Download instructions for phantomjs"
