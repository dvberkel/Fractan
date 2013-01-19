Fractan
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

[conway]: http://en.wikipedia.org/wiki/John_Horton_Conway "Wikipedia on John Horton Conway"