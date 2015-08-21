---
date: 2012-02-06 04:06:00
title: "WordPress: Connecting to an external/secondary database"
disqus_id: "268 http://www.fyianlai.com/?p=268"
---

#### `$wpdb` can only access and manipulate the WordPress database. How may I do the same for another database with different credentials?

WordPress provides developers with a class of functions to manipulate the database and this is particularly useful for custom plugins and/or themes. Developers may interface - create, read, write and/or delete data - with the WordPress database via the [global `$wpdb` object](http://codex.wordpress.org/Class_Reference/wpdb); however, to interact with another database (an external/secondary one) a new instantiation of the wpdb class is required. In WordPress' codex, [hyperdb](http://wordpress.org/extend/plugins/hyperdb/) is recommended as the solution _"for extremely complicated setups with many databases"_. If however, you are not too keen on using someone else's plugin it is pretty simple to create your own custom database object using the wpdb class.

<!--more-->

Here is a [gist](https://gist.github.com/MrSaints/8209879) of how you may do so:

<!-- TODO: Fix line comments -->

{% highlight php %}
<?php
define('DB_HOST', '127.0.0.1');
define('DB_USER', 'root');
define('DB_PASS', 'password');
define('DB_NAME', 'school');

class CustomDatabase
{
    private $db;

    public function __construct() {
        // Connect To Database
        try {
            $this->db = new wpdb(DB_USER, DB_PASS, DB_NAME, DB_HOST);
            $this->db->show_errors(); // Debug
        } catch (Exception $e) {    // Database Error
            echo $e->getMessage();
        }
    }

    // Example Query -- Count Students
    public function count_users() {
        return $this->db->get_var("SELECT COUNT(*) FROM `students`;--");
    }

    // Example Query #2 -- Update Student Name
    public function update_student_id($student_id, $student_name) {
        return $this->db->update(
            'students',
            array('student_name' => $student_name),
            array('student_id' => $student_id),
            array('%s'), array('%d')
        );
    }
}
$Custom_DB = new CustomDatabase;
?>
{% endhighlight %}


## Explain it to me?

The example in the gist above demonstrates how you can use the wpdb class provided by WordPress to communicate with an external database with entirely different database credentials (host, username, password and database name) as evident from line 25 to 28. In the example above, we are working with a database containing data of students in a school.

The CustomDatabase class seen above begins by instantiating the wpdb class into `$this->db` object as seen by the class constructor (line 34 to 42). A connection to the external database is stored in the object and it will not interfere with your WordPress database connection (which is likely if you were to connect using conventional PHP MySQL functions). Unlike the `$wpdb` global object however, `$this->db` is only accessible by the class itself (hence, the [private declaration](http://www.php.net/manual/en/language.oop5.visibility.php)) and it is not publicly accessible (unless you make it so). Furthermore, `$wpdb` is only capable of interacting with the WordPress database as I have previously mentioned.

Using the custom instantiation of wpdb (stored in `$this->wpdb`) we can then manipulate data from our external database as seen on line 44 to 57\. The `count_users()` function will return the total number of students in our students table of our external database. The `update_student_id()` function will update the students table by changing the name of a student with a specified student ID. As `$this->wpdb` is an object instantiation of the wpdb class, you may use any of its methods (refer to the [WordPress Codex](http://codex.wordpress.org/Class_Reference/wpdb) to find out more about the methods you may use along with their respective arguments/parameters).

You may use the described functions above by calling `$Custom_DB->count_users()`. The try-catch statement in the example is not necessary, but you should include a fallback / a mechanism to deal with failed database connections as it may interfere with your application.


## And we're done.

There is always a learning curve involved when working with new plugins, libraries, frameworks, etc. In the case of WordPress, it is unfortunately pretty steep in my honest opinion. The WordPress Codex is incomplete and in several occasions, provide close to no real world example that is accompanied by in-depth explanation. Fortunately for us developers, there are several websites and communities committed to providing what the WordPress Codex lacks (The [Tuts+ Network](http://wp.tutsplus.com/) and [CSS-Tricks](http://css-tricks.com/snippets/wordpress/) just to name a few).


## Don't get me wrong.

The WordPress Codex is not entirely flawed nor should it be considered useless. It succeeds in many areas (particularly on articles that are featured on its [home page](http://codex.wordpress.org/)). It is merely ineffective. Indeed, it fails to compensate for [various types](http://wp.smashingmagazine.com/2012/07/04/writing-effective-wordpress-documentation/) of learning preferences. Those who are capable of deciphering and experimenting with the ins and outs of its simplicity will excel best. It is definitely not easy to get to grips with initially, but with dozens of resources out there (tutorials, frameworks, plugins, etc) and a strong support network (e.g. [Stack Overflow](http://stackoverflow.com/)), I suppose there is not any real need for the Codex to be heavily revamped and the time saved may be invested in other areas such as improving the overall code base, which the developers are doing a fantastic job at.

As always, feedback and opinions are welcomed.