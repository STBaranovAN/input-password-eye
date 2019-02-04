(function($) {
    $(document).on("click",
        ".password-eye",
        function() {
            var icon = $(this);
            var password = $(this).siblings("input");
            if (password.attr("type") == "password") {
                password.attr("type", "text");
                icon.addClass("password-eye-hide");
            } else {
                password.attr("type", "password");
                icon.removeClass("password-eye-hide");
            }
        }
    );
})(jQuery);