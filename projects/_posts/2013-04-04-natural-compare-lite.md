---                                                                             
layout: project                                                                 
title: natural-compare-lite
summary: Natural Order String Comparison for Sorting
tags: [litejs]                                                                    
fork: https://github.com/litejs/natural-compare-lite
css:                                                                            
- css/pygments.css                                                              
---                                                                             

[1]: https://raw.github.com/litejs/natural-compare-lite/master/min.js
[2]: https://raw.github.com/litejs/natural-compare-lite/master/natural-compare-lite.js


Natural Order String Comparison
===============================

Download [compressed][1] 
(412 bytes or 267 bytes gzipped)
or [uncompressed][2] source.


### Usage

{% highlight javascript %}
{% raw %}
var a = ["z1.doc", "z10.doc", "z17.doc", "z2.doc", "z23.doc", "z3.doc"]
a.sort(String.natural_compare)
{% endraw %}
{% endhighlight %}

External links
--------------

- [jsperf test](http://jsperf.com/natural-sort-2/2)


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


