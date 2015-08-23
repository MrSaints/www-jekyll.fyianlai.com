/*
 civil.js

 Correct margins to establish vertical rhythm
 Samples line-height from "p" element
 Targets code blocks and images
 */
;(function ($) {
    var $objHeight = 0;
    var $lineHeight = parseInt($("p").css("line-height"), 10);
    $("pre, img").each(function () {
        $this = $(this);
        $objHeight = $this.outerHeight();
        $difference = $lineHeight - ($objHeight % $lineHeight);
        if ($difference !== 0) {
            $this.css("margin-bottom", function (index, current) {
                return parseInt(current, 10) + $difference + "px";
            });
        }
    });
})(jQuery);