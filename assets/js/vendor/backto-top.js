(function ($) {
    "use strict";

    $(document).ready(function () {
        var progressPath = document.querySelector('.rn-progress-parent path');
        var scrollDownPath = document.querySelector('.rn-scroll-down path');
        var pathLength = progressPath.getTotalLength();

        // Initialize progress and scroll-down paths
        [progressPath, scrollDownPath].forEach(path => {
            path.style.transition = path.style.WebkitTransition = 'none';
            path.style.strokeDasharray = pathLength + ' ' + pathLength;
            path.style.strokeDashoffset = pathLength;
            path.getBoundingClientRect();
            path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        });

        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();

            // Calculate progress for upward scroll (progressPath)
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;

            // Calculate progress for downward scroll (scrollDownPath)
            var scrollDown = (height - scroll) * pathLength / height;
            scrollDownPath.style.strokeDashoffset = pathLength - scrollDown;
        };
        updateProgress();

        $(window).scroll(updateProgress);

        var offset = 50;
        var duration = 550;

        // Back to top activation
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > offset) {
                $('.rn-progress-parent').addClass('rn-backto-top-active');
            } else {
                $('.rn-progress-parent').removeClass('rn-backto-top-active');
            }

            if ($(this).scrollTop() < $(document).height() - $(window).height() - offset) {
                $('.rn-scroll-down').addClass('rn-scroll-down-active');
            } else {
                $('.rn-scroll-down').removeClass('rn-scroll-down-active');
            }
        });

        // Scroll to top
        $('.rn-progress-parent').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        });

        // Scroll to bottom
        $('.rn-scroll-down').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: $(document).height() - $(window).height() }, duration);
            return false;
        });
    });
})(jQuery);
