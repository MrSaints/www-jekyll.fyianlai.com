---
date: 2015-09-21 19:51
title: "Introducing: HistoryX for Chrome"
---

[![HistoryX for Chrome](/img/historyx.png)](/img/historyx.png)

I am excited to introduce, [HistoryX][source] _(v2.3.1)_, an open source [Chrome extension][download] that I have been sporadically working on this past week. In the project manifest (and on GitHub), it is described as an _"extension to enhance your browsing history experience"_. But more specifically, it is an extension which, when enabled, will replace your existing history page with one that is leaner, and expanded with functionality.

It is ideal for regular, and power users alike. The former can take advantage of the improved interface, and smooth [materialesque][material] browsing experience, while the latter can take advantage of the **search, sort, group, and filter features**.

<!--more-->

---


You can [install v2.3.1][download] in the Chrome Web Store now or download the [source][], and run it in [developer mode][].


## Background

The key motivator behind this extension is my dissatisfaction over the currently available options (as will be highlighted later), and my desire for a history page that can allow me to sift through my historical web visits quickly.

As a web developer, and someone with a mild obsessive-compulsive personality disorder (OCPD), I often find myself trying to retrace my previous visits to recall what I have done recently / in the past or trying to locate a website that I vaguely remember.
For example, occasionally something may trigger me to remember a specific phrase from an article I have read or perhaps a well-designed component from a website.  I will subsequently have an urge to locate where this ambiguous "memory" was derived from so I can properly take note of it or share it _(yes, I have a bad tendency to hoard information online, and I have way too many bookmarks)_. The only way I can achieve all this is through going back in time with what I can remember (e.g. keywords, pages I visited before / after, dates, etc).

This extension was built to cater for that need. After all, sometimes what I find unimportant, may become useful in the future. But obviously, since this is quite a complex need, it does have a lot of [planned] features that can help accomplish a bunch of other needs.


### Features

[![v2.3.1](/img/historyx-screenshot.png)](/img/historyx-screenshot.png)

HistoryX supports the basic listing, searching, and paging feature that you can find on the default browser page.

Additionally, you can:

- Change the amount of results per page;
- Filter the results by date through a user-friendly calendar (you can also browse between months, and years quickly by selecting the calendar's header);
- View the total number of results, and the current range of results you are viewing;
- View the total number of times you visited a page;
- View the specific time you visited a page;
- Access the paging controls at the top or bottom of your results (unlike the default page which only allows you to do this at the bottom of it);
- And much more!

_**Tip:** select the current date to toggle filtering by date._

At the moment, the results are in chronological order. Over the next couple of days (or weeks) however, I will be rolling out support for sorting (e.g. by hostname), and grouping results (e.g. by hour).


### Future

Going forward, I intend on implementing [internationalization (il8n)][il8n wiki] through Chrome's [`chrome.i18n` infrastructure][il8n]. Support for il8n however, is likely to come later as I am hoping to optimise the existing code base, and work on ways to streamline the existing workflows. I am looking to shorten the time, and effort needed to perform common tasks by both the user, and the computer (this will potentially involve caching, and fat-cutting).

At the time of this post's publication, **[omnibox][] (i.e. autocomplete), tagging, and saved searches** are other major features I have in mind for this extension. You can find out more by viewing the [roadmap] in the [official project repository][source].

There are no plans for other browsers.


### HistoryX vs. other extensions

So, why should you use this extension vs. other history extensions?

First, unlike most Chrome extensions, this extension is entirely **open source.**

**There are no ads. There are no trackers. It is completely transparent, and non-intrusive.**

You can fork the project, improve it, personalise it or simply just investigate it to validate my claims. Alternatively, you can run your own copy if you do not trust me.

The closest competitor to this extension is tracking your every action via Google Analytics.

Furthermore, as it is open source, you do not have to wait very long for a bug to be patched or for a feature to be added. And if you have a background in JavaScript, you can even do it yourself. The project is being actively developed (or at least I hope it will be even long after I am unavailable to lead it), and feature requests are welcomed.

Indeed, in [The Cathedral and the Bazaar (1999)][catbaz] by Eric S. Raymond, he succinctly describes what he calls **Linus' Law**, that:

> Given enough eyeballs, all bugs are shallow

Second, it relies on a **modern UI library, and web architecture** that have been tested in large production environments.

It is not running on a complex spaghetti bowl of dependencies, and jQuery plugins. Each component, action, store, constant, and utility are isolated in their own file. This will allow you to follow the logic, and trace problems more effortlessly. It also makes it easier for new features to be added.

Several similar extensions are running on outdated libraries, and conflicting dependencies. Consequently, its developers will find it hard to maintain their code base, and to eradicate unpredictable behaviour.
For example, one extension I have used for my history page (before this development came along) has been prone to crashes, and long load times. This problem has not been resolved for several months (although, this might be linked to my point about the nature of open source software).

Finally, **results are not omitted.**

Due to a limitation in [`chrome.history` API][history API] (that is, it only returns the last visited time, not the actual visit time of an entry), a similar extension omits stale visits in older dates. Simply put, if you were to visit Facebook now, an entry of you visiting it yesterday will not show up. This extension instead chooses to show you all the links you have visited in a given date or from a query filter even if it has been visited recently.

Unfortunately, I am still in the midst of developing a workaround to show the _real_ visit time of _stale links_.


#### TL;DR

- Open source;
- Ad-free;
- Tracker-free;
- Active development;
- Modern, predictable, and stable dependencies;
- Intuitive UI;
- High-performance;
- Fully featured.

This is the first, and last history page extension you will ever need.


## Development

[![Source Code](/img/historyx-screenshot-2.png)](/img/historyx-screenshot-2.png)

I have decided to release the extension after **64 commits** consisting of a name change, several changes to its dependencies, and countless iterations to both its design, and code architecture. In spite of all this, it is far from its _final form_. And there is still a long [list of additions, and improvements][roadmap] that have yet to be made.

It is a _work in progress_.

It is built with heavy reliance on the latest, and most popular web libraries including [React][react] (Facebook's UI library), and [Fluxxor][fluxxor] (a set of tools implementing the [Flux architecture][flux]). It also relies on styles provided by [Bootstrap v4 (Alpha)][bootstrap].

You can examine the [source code][source] to see the symbiosis of these libraries, and the use of [`chrome.history` API][history API].

Unfortunately, I will not be documenting the development process in this post, but I will be saving it for another post, soon. Nevertheless, I would like to welcome contributions in any way, shape or form (e.g. pull requests, issues, feature requests, etc). You are most welcome to participate in the [development][source] process.

This project does not have an official communication channel, but I am generally easy to reach via [Twitter][twitter], and IRC (join [FyreChat][irc] #sandbox channel). I am also available via [e-mail][contact] (using my contact form).


## Post-publishing

It has just occurred to me, upon publishing my extension, that I have not included any option to delete a visit. I will be releasing a new version to address this as soon as possible.

Finally, there are several FAQs I would like to address before they are brought up:

1. **In the results, why are some of the dates faded, and shown in full?**

    As mentioned earlier, there are several constraints when using the [`chrome.history` API][history API]. One of which is that it only returns the date / time you have last visited a website. If you have visited it before, it will still show up in the API results as a visit, but it will not show the actual date / time you visited it. It will instead show the date / time you have last visited it.

2. **How does the search feature work?**

    It is currently relying on the [`chrome.history.search` API][search API] method to fetch the results. In the future, I will be implementing a _client-side_ (i.e. JavaScript) search. The current search method should nevertheless be sufficient in most use cases.

3. **How do I remove the date filter?**

    Select the current date in the calendar. It can be toggled.





[download]: https://chrome.google.com/webstore/detail/historyx/eogcblpflkiminggblnpdhmdkihgceif?hl=en-GB&gl=GB
[source]: https://github.com/MrSaints/historyx
[developer mode]: https://developer.chrome.com/extensions/getstarted#unpacked
[react]: https://facebook.github.io/react/
[fluxxor]: https://github.com/BinaryMuse/fluxxor
[flux]: https://facebook.github.io/flux/
[bootstrap]: http://v4-alpha.getbootstrap.com/
[material]: https://www.google.com/design/spec/material-design/introduction.html
[history API]: https://developer.chrome.com/extensions/history
[search API]: https://developer.chrome.com/extensions/history#method-search
[omnibox]: https://developer.chrome.com/extensions/omnibox
[il8n]: https://developer.chrome.com/extensions/i18n
[il8n wiki]: https://en.wikipedia.org/wiki/Internationalization_and_localization
[catbaz]: https://en.wikipedia.org/wiki/The_Cathedral_and_the_Bazaar
[roadmap]: https://github.com/MrSaints/historyx/issues/1
[twitter]: https://twitter.com/MrSaints
[irc]: http://www.fyrechat.net/
[contact]: /hello