---
date: 2012-01-03 02:01:00
title: "Google Chrome: Minimum font-size issue"
disqus_id: "263 http://www.fyianlai.com/?p=263"
tags: legacy
---

**Update (24/05/2014):** I have [recently discovered](http://stackoverflow.com/questions/21302069/disable-chrome-minimum-font-size-10px) that Chromium (Desktop) has [dropped support](http://trac.webkit.org/changeset/145168) for the `text-size-adjust` CSS property name rendering the original solution below invalid. The [alternative solution](https://support.google.com/chrome/answer/95416) is still functional. It is **not a bug** as far as I am concerned. It is related to the user's Chromium preferences, and it is not advisable to override them.


**Why does my website's font-size appear larger on other screens? Or why does it not appear as intended?**

A minimum font-size of 12px is set for Chrome users with a special, foreign UI locale (language) - e.g. Chinese, Korean, Japanese, Thai etc. If however, the font-size for any content on your website is set to a value that is less than 12px, it will automatically be resized to 12px. [WebKit](http://www.webkit.org/) - the web browser engine behind Chrome which handles the parsing and layout of websites - however, does support font-sizes of 12px and under. Indeed, for most UI locales, Chrome has set the minimum font-size to 1px (simply: anything smaller will be resized to 1px). The way Chrome behaves when dealing with special UI locales may become problematic for web designs relying heavily on [magic numbers](http://css-tricks.com/magic-numbers-in-css/) or typography. Indeed, other users and developers seem to be raising similar concerns about this behaviour and its adverse impact:

* [http://code.google.com/p/chromium/issues/detail?id=36429](http://code.google.com/p/chromium/issues/detail?id=36429)
* [http://www.google.com/support/forum/p/Chrome/thread?tid=6c5177414cbf8330](http://www.google.com/support/forum/p/Chrome/thread?tid=6c5177414cbf8330)
* [http://stackoverflow.com/questions/2295095/font-size-12px-doesnt-have-effect-in-google-chrome](http://stackoverflow.com/questions/2295095/font-size-12px-doesnt-have-effect-in-google-chrome)

<!--more-->

### How do I fix it?

Based on the links above there is - at the time of this post - no one size-fits-all solution to this problem. There is however, a quick fix solution which will require you to disable auto-adjustment of your website's font sizes via your stylesheet. Simply include the following property in your stylesheet:

{% highlight css %}
html, body {
    -webkit-text-size-adjust: none
}
{% endhighlight %}


### But, there is a catch.

The solution is simply a quick as I have already mentioned. By disabling the auto-adjustment of your website's font sizes you will [introduce another problem for users with accessibility needs](http://www.456bereastreet.com/archive/201011/beware_of_-webkit-text-size-adjustnone/). Your website's font-sizes will no longer _react_ (resize) when a user zooms in / out of your website. Indeed, if your website relies heavily on small font-sizes (not that you should) your users may not have any way to read your content (there will be a lot of squinting involved!).

Is trading the accessibility for aesthetics worth it for your website? Well, it depends on the purpose of the website and its niche, after all, not everyone (myself included) will take advantage of the browser's zooming feature.

Alternatively, you may manually alter the `minimum_font_size` property in your [Chrome preferences](https://support.google.com/chrome/answer/95416?hl=en) to overwrite the minimum value. The new value however, will not be reflected to all your website's Chrome users. They will have to change the value themselves.


### Moving on...

Since 2010 and at the time of this post's publishing, there appears to be no recommended solution and/or upcoming patch for the described problem. Is it a bug? Maybe. I am no browser specialist so I am unable to comment with confidence about this, but perhaps the special UI locales and their respective character sets were developed for 12px and above.

If the so-call problem continues to be left unresolved then perhaps it is advisable to be working with font-sizes of no less than 12px. It should then become a conscious consideration for web designers to ensure their resulting design is both aesthetically pleasing and accessible. With the ever-increasing resolution size of monitors and mobile devices perhaps keeping to the 12px rule is beneficial for us and our audience. Will we ever need anything less than 12px?

Let me know what you think. I am opened to feedback and opinions.


### Discovery

I thought I include a segment about how I had discovered the problem and why it was problematic for me towards the end as I felt most people would be more keen on the solution and its implications.

I was first informed about the problem when I had presented my client with a live preview of a website I was designing and developing for him. He mentioned of some so-call "visual bugs" that I could not find when I was previewing it on my computer. I decided to investigate further but it did not seem to be a problem with cross-browser compatibility as it appeared as expected on other browsers (including Internet Explorer and Firefox), even on my client's computer. Indeed, I have ingrained various best practices for cross-browser compatibility into my workflow (e.g. through the use of libraries and tools such as Normalize.css and Browsershots, respectively) to ensure every browser was properly compensated for.

The enlarged text caused a chain of complications on my web design. Buttons, images and containers were all out of place all because the font-size had forced a few text to overflow beyond their intended container's size. It was neither a platform nor operating system-specific problem as well which made the problem even more puzzling.

I decided to inspect and analyse the problem via my client's perspective through the use of [TeamViewer](http://www.teamviewer.com/). Using Chrome's native developer tools I had discovered that the font-size was set at 12px even though I had specifically defined it as 11px in the stylesheet for that particular element. There were also no overriding styles that could set it at 12px. It was indeed a browser specific problem and upon research, I found out it was due to my client's use of the Chinese UI locale on Chrome.


### Things have changed.

Chrome has changed its web browser, layout engine from WebKit to [Blink](http://www.chromium.org/blink) - a fork of the WebCore component of WebKit. I have not followed up with the problem since the time of its posting as it does not appear to be a problem for me anymore, because a. I do not work with font-sizes < 12px and b. even if my font-sizes are resized, it does not appear to have any adverse impact on its overall design (I have ditched the [magic numbers](http://css-tricks.com/magic-numbers-in-css/)).