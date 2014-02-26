---                                                                             
layout: project                                                                 
title: functional-lite
summary: Functional Javascript
tags: [litejs]                                                                    
fork: https://github.com/litejs/functional-lite
css:                                                                            
- css/pygments.css                                                              
---                                                                             

[Build]:    http://img.shields.io/travis/litejs/functional-lite.png
[Coverage]: http://img.shields.io/coveralls/litejs/functional-lite.png
[Gittip]:   http://img.shields.io/gittip/lauriro.png
[1]: https://travis-ci.org/litejs/functional-lite
[2]: https://coveralls.io/r/litejs/functional-lite
[3]: https://www.gittip.com/lauriro/

[7]: https://ci.testling.com/litejs/functional-lite.png
[8]: https://ci.testling.com/litejs/functional-lite
[npm-package]: https://npmjs.org/package/functional-lite



    @version    0.2.1
    @date       2014-02-18
    @stability  2 - Unstable



Functional &ndash; [![Build][]][1] [![Coverage][]][2] [![Gittip][]][3]
==========

Experimental Functional stuff.



Examples
--------

Extends String and Function with "every filter each map fold foldr some"

{% highlight javascript %}{% raw %}
// _ is default first argument name when no arguments defined

"_ + 1".map([1, 2, 3])
// is equal to
"_ -> _ + 1".map([1, 2, 3])
// is equal to
[1, 2, 3].map(Fn("_ + 1"))
// [2, 3, 4]
{% endraw %}{% endhighlight %}

### Browser Support

[![browser support][7]][8]


External links
--------------

-   [npm-package][]


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


