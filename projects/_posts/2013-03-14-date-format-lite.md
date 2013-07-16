---
layout: project
title: date-format-lite
summary: Date format and parser for node.js and browser
tags: [test]
fork: https://github.com/litejs/date-format-lite
css:
- css/pygments.css
---

[1]: https://raw.github.com/litejs/date-format-lite/master/date-format.js
[2]: https://raw.github.com/litejs/date-format-lite/master/min.date-format.js
[3]: https://raw.github.com/litejs/date-format-lite/master/tests/run.js "tests/run.js"

    @version  0.1.5
    @date     2013-07-13

Date format
===========

Lite version of Date format and parse for node.js and browser
that extends native objects.
Download [compressed][2] 
(2142 bytes, 1068 bytes gzipped)
or [uncompressed][1] source.



## How to use

It is designed to let you do more with less code.

### In browser

{% highlight html %}{% raw %}
<script src=date-format.js></script>
{% endraw %}{% endhighlight %}

### In node.js

npm install date-format-lite

{% highlight javascript %}{% raw %}
require("date-format-lite")

{% endraw %}{% endhighlight %}

### Usage

{% highlight javascript %}{% raw %}
var now = new Date()         // Date {Wed Jul 10 2013 16:47:36 GMT+0300 (EEST)}
now.format("isoUtcDateTime") // 2013-07-10T13:47:36Z
now.format("hh:mm")          // 16:47
now.format("UTC:hh:mm")      // 13:47

{% endraw %}{% endhighlight %}

### Define default format

{% highlight javascript %}{% raw %}
Date.masks.default = 'YYYY-MM-DD hh:mm:ss'
now.format()                 // 2013-07-10 13:47:36
{% endraw %}{% endhighlight %}

### Define custom formats

{% highlight javascript %}{% raw %}
Date.masks.my = '"DayNo "D'
now.format("my")             // DayNo 10
{% endraw %}{% endhighlight %}


### Use another language

{% highlight javascript %}{% raw %}
// Add to estonian-lang.js
Date.dayNames = "P E T K N R L pühapäev esmaspäev teisipäev kolmapäev neljapäev reede laupäev".split(" ")
Date.monthNames = "Jaan Veeb Märts Apr Mai Juuni Juuli Aug Sept Okt Nov Dets jaanuar veebruar märts aprill mai juuni juuli august september oktoober november detsember".split(" ")
{% endraw %}{% endhighlight %}


See [tests][3] for more examples

## Syntax

- **YY**    - A two digit representation of a year. Examples: 99 or 03
- **YY**    - A two digit representation of a year. Examples: 99 or 03
- **YYYY**  - A full numeric representation of a year, 4 digits. Examples: 1999 or 2003
- **M**     - Numeric representation of a month, without leading zeros. 1 through 12
- **MM**    - Numeric representation of a month, with leading zeros. 01 through 12
- **MMM**   - A short textual representation of a month, three letters. Jan through Dec
- **MMMM**  - A full textual representation of a month, such as January or March. January through December
- **D**     - Day of the month without leading zeros. 1 to 31
- **DD**    - Day of the month, 2 digits with leading zeros. 01 to 31
- **DDD**   - A textual representation of a day, three letters. Mon through Sun
- **DDDD**  - A full textual representation of the day of the week. Sunday through Saturday
- **H**     - 12-hour format of an hour without leading zeros. 1 through 12
- **HH**    - 12-hour format of an hour with leading zeros. 01 through 12
- **h**     - 24-hour format of an hour without leading zeros. 0 through 23
- **hh**    - 24-hour format of an hour with leading zeros. 00 through 23
- **m**     - Minutes without leading zeros. 0 through 59
- **mm**    - Minutes with leading zeros. 00 to 59
- **s**     - Seconds without leading zeros. 0 through 59
- **ss**    - Seconds with leading zeros. 00 to 59
- **S**     - Milliseconds without leading zeros. 0 through 999
- **SS**    - Milliseconds with leading zeros. 000 to 999
- **u**     - Milliseconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
- **U**     - Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
- **a**     - Lowercase Ante meridiem and Post meridiem. am or pm
- **A**     - Uppercase Ante meridiem and Post meridiem. AM or PM
- **Z**     - Difference to Greenwich time (GMT) with colon between hours and minutes. Example: GMT +02:00
- **w**     - Week number of year, first week is the week with 4 January in it
- **"text"** - text

### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


