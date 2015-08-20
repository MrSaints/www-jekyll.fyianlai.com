---
date: 2014-11-04 09:24:00
title: "Prepare() in Beego web app framework."
---

[`Prepare()`](http://beego.me/docs/mvc/controller/controller.md) is a method exposed by [`beego.Controller{}`](https://godoc.org/github.com/astaxie/beego#Controller) and it is executed prior to the method corresponding to your route and HTTP request (the action). It is not a filter and thus, it can easily be extended (much like the `Get()` and `Post()` method) for a variety of functions such as:

* **Session control:** ACL-based authentication and authorization
* **Globals:** Setting [ REUSABLE ] defaults for your template (stylesheets, JavaScipts, variables...)

<!--more-->

## Core / base controller (globals)

We may for example create a core / base controller that would set `layout.tpl` as its default layout and assign a template variable to a string array of stylesheets or JavaScripts to import.

###### controllers/base.go:

{% highlight go %}
type BaseController struct {
    // Embedding: "Inherit" beego.Controller
    beego.Controller
}

func (this *BaseController) Prepare() {
    // Overwrite beego.Controller.Layout (string)
    this.Layout = "layout.tpl"

    // beego.Controller.Data comprises of a map of template variables
    this.Data["HeadStyles"] = []string{
        "//cdn.jsdelivr.net/pure/0.5.0/pure-min.css",
        "//yui.yahooapis.com/pure/0.5.0/grids-responsive-min.css",
        "//fonts.googleapis.com/css?family=Roboto:400,500,300",
        "/static/css/base.css",
    }

    this.Data["HeadScripts"] = []string{
        "//cdn.jsdelivr.net/modernizr/2.8.3/modernizr.min.js",
    }
}
{% endhighlight %}

Any _new struct_ embedding `BaseController{}` will now inherit its methods and variables (only `Prepare()` in this case) as well as those in the anonymous member `beego.Controller{}` as it is embedded in `BaseController{}` (refer to the first few lines). Unless the new struct sets its own `Prepare()` method, Beego will fallback to using the next defined `Prepare()` which in this case, belongs to `BaseController{}`. Our _new struct_ will now have a `Layout` variable that is set to `layout.tpl` (overwriting `beego.Controller{}` default) and an array of styles and scripts in `HeadStyles` and `HeadScripts` template variable (set via `Data`) respectively, by default.

**Fun fact:** [`beego.Controller.Prepare()`](https://github.com/astaxie/beego/blob/master/controller.go#L112) does not contain any logic.

This is useful for reducing redundancy in our controllers. Indeed, we do not have to define the same `Layout` in every controller, and we may, on a per controller method basis, add or remove styles and scripts from our template just by altering the `HeadStyles` and `HeadScripts` array. For example, assuming we have a layout...

###### views/layout.tpl:

{% highlight html %}
{% raw %}
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title>Beego App: {{.Title}}</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{range .HeadStyles}}
            <link rel="stylesheet" href="{{.}}">
        {{end}}

        {{range .HeadScripts}}
            <script src="{{.}}"></script>
        {{end}}
    </head>

    <body>
        {{.LayoutContent}}
    </body>
</html>
{% endraw %}
{% endhighlight %}

And a _new struct_ controller named `HelloWorldController` implementing `BaseController{}`.

###### controllers/helloworld.go:

{% highlight go %}
{% raw %}
type HelloWorldController struct {
    // Embedding: "Inherit" BaseController
    BaseController
}

func (this *HelloWorldController) Get() {
    // Set {{.Title}}
    this.Data["Title"] = "Hello World!"

    // TplNames is parsed into {{.LayoutContent}}
    this.TplNames = "hello_world.tpl"
}
{% endraw %}
{% endhighlight %}

Beego will automatically render (if the `AutoRender` config is enabled) `hello_world.tpl` AND `layout.tpl`. The contents of `hello_world.tpl` will be imported into the `LayoutContent` template variable [ in the curly braces ]. Additionally, {% raw %}`{{range .HeadStyles}}` and `{{range .HeadScripts}}`{% endraw %} will loop through our string array of stylesheets and JavaScripts so that we can import them into our HTML page. Our HTML document title will be "Beego App: Hello World!" once successfully rendered.

Notice that in our `HelloWorldController.Get()` method we did not have to define what `Layout` is as it was already defined by `HelloWorldController{}` parent, the `BaseController{}`. Thus, when the `Render()` method is fired, it will be in the [context of](https://github.com/astaxie/beego/blob/master/controller.go#L197) `HelloWorldController{}`. We can even include specific stylesheets and scripts specific for the `HelloWorldController.Get()` method by using Go's `append` function on `this.Data["HeadScripts"]`.

If we were to rewrite `HelloWorldController{}` to implement `beego.Controller{}` instead, `Layout` will not be defined as well as the other template variables we are using for our JavaScript and stylesheet imports. The resulting HTML output will simply be a parsed `hello_world.tpl` without `layout.tpl`.

You may visualise the inheritance of our controllers in the following manner:

1. beego.Controller
2. beego.Controller -> BaseController
3. beego.Controller -> BaseController -> HelloWorldController

By extending the original `beego.Controller{}` we may overwrite its methods and variables, and implement our own logic that will better cater to our needs. Best of all, we can abide by DRY (Do Not Repeat Yourself) principles.

## Execute parent Prepare()

If we were to create a new `Prepare()` method in `HelloWorldController{}`, the `Prepare()` method in `BaseController{}` will no longer be fired (for reasons we have highlighted above - it is overwritten). We may still however, execute the "parent" method by calling the struct name directly (for anonymous members) or the field name. For example:

###### controllers/helloworld_with_parent.go:

{% highlight go %}
func (this *HelloWorldController) Prepare() {
    this.BaseController.Prepare()

    // Do other stuff
}
{% endhighlight %}

Both `HelloWorldController.Prepare()` and `BaseController.Prepare()` will now be fired in that order.

Through this additional extension, we may not only maintain the logic and variables established in our parent controller, but extend them further to encompass new logic or variables for all methods in a controller. We may for a specific controller, validate a user session to see if they are logged in and redirect them away from it if they are not, and at the same time, we can still keep our parent variables which can be used to render the template to those who are logged in and validated.

As a final note, it is probably worth exploring [Beego Godocs](https://godoc.org/github.com/astaxie/beego), [Beego source code](https://github.com/astaxie/beego/) and [WeTalk](https://github.com/beego/wetalk), a project made in Beego by... Beego to learn more about the ins and outs of the framework (not as well documented on the official website, probably due to the lack of English contributors). You can see `Prepare()` in action in [Anna & Daphne's admin control panel](https://github.com/AnnaDaphne/Admin).