---                                                                             
layout: project                                                                 
title: browser-history-lite
summary: History helper for browser
tags: [litejs]                                                                    
fork: https://github.com/litejs/browser-history-lite
css:                                                                            
- css/pygments.css                                                              
---                                                                             

[1]: https://raw.github.com/litejs/browser-history-lite/master/min.js
[2]: https://raw.github.com/litejs/browser-history-lite/master/browser-history-lite.js


History
=======

Browser history helper.
Download [compressed][1] 
(815 bytes or 527 bytes gzipped)
or [uncompressed][2] source.


### Usage

{% highlight javascript %}
{% raw %}

function log(route) {
	console.log("routed to ", route)
}

history.start(log)
{% endraw %}
{% endhighlight %}


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


