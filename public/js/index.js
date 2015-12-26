var header = $("#guide-template");
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
       if (scroll >= window.innerHeight) {
          header.addClass("fixed");
        } else {
          header.removeClass("fixed");
        }
});