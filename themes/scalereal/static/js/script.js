$(document).ready(function () {

  // Homepage Projects and Testimonial sliders
  $('.owl-one, .owl-two').owlCarousel({
    nav: false,
    loop: true,
    margin: 0,
    dots: true,
    slideBy: 1,
    autoplay: true,
    autoplayTimeout: 15000,
    autoplaySpeed: 15000,
    autoplayHoverPause: true,
    animateOut: 'slideOutLeft',
    animateIn: 'slideInRight',
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      767: {
        items: 1,
      },
      1199: {
        items: 1,
      }
    }
  });

  // Hamburger icons toggle for mobile view
  var $hamburger = $('.hamburger');
  $hamburger.on('click', function (e) {
    $hamburger.toggleClass('is-active');
  });

  var current = location.pathname;
  $('.navbar-nav .nav-link').each(function (index) {
    var $this = $(this);
    // if the current path is like this link, make it active
    if ((current === '/' && index === 0) || (current !== '/' && ($this.attr('href') + '/').indexOf(current) !== -1)) {
      $this.addClass('active');
    }
  })

  $('.js-blog-carousel').owlCarousel({
    nav: true,
    loop: false,
    margin: 0,
    dots: false,
    slideBy: 1,
    autoplay: true,
    autoplayTimeout: 15000,
    autoplaySpeed: 15000,
    autoplayHoverPause: true,
    responsiveClass: true,
    items: 2,
    responsive: {
      0: {
        items: 1,
        loop: true
      },
      767: {
        items: 1,
        loop: true
      },
      991: {
        items: 2,
        loop: true
      }
    }
  });
});

if($(".careers-accordion").length > 0){
  $(document).ready(function(){
    var url = window.location.href;
    var start = url.substr(url.indexOf("#"));
    if(start !== '/')
      $(start).collapse('show');
  });
}

$(".careers-accordion").on("show.bs.collapse",function(a){
  var curr = $(a.target).attr("id");
  var url = window.location.href;
  var start = window.location.hash;
  if(start.length > 0){
    window.location.href = url.replace(start, "#" + curr);
  }
  else{
    window.location.href = url + "#" + curr;
  }
});