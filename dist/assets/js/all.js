"use strict";

$(document).ready(function () {
  var s;
  $(window).scroll(function () {
    s = $(document).scrollTop();
    /* 偵測卷軸滑動時，往下滑超過400px就讓GoTop按鈕出現 */

    if (s > $('#header').outerHeight()) {
      $('#header').addClass('mini-nav');
      $('#gotop').fadeIn();
    } else {
      $('#header').removeClass('mini-nav');
      $('#gotop').fadeOut();
    }
  });
  $('#hamberger').click(function () {
    $(this).toggleClass('open');
  }); //gototop

  $('#gotop').click(function () {
    $('html,body').animate({
      scrollTop: 0
    }, 'slow');
    /* 返回到最頂上 */

    return false;
  }); //search

  $('#btn-search').click(function () {
    $('#search-box').toggleClass('open');
  }); //side

  $('.cs-side .side__title').click(function () {
    $(this).parent().toggleClass("active");
  }); //select

  $('.cs-select .select__option').each(function () {
    var $this = $(this);
    $this.on('click', function () {
      $('.cs-select').find('.active').removeClass('active');
      $(this).addClass('active');
      $('#dropdown').text($(this).text());
    });
  }); //select - Q&A

  $('.cs-select .dropdown-item').each(function () {
    var $this = $(this);
    $this.on('click', function () {
      $('#dropdown').text($(this).text());
    });
  });
}); //swiper

var swiper = new Swiper('#banner', {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 50000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});
var swiper2 = new Swiper('#hot', {
  spaceBetween: 0,
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    320: {
      //当屏幕宽度大于等于320
      loop: true,
      noSwiping: false,
      autoplay: true
    },
    980: {
      //当屏幕宽度大于等于1280
      loop: false,
      noSwiping: true,
      autoplay: false
    }
  }
}); //video madal

var $videoSrc;
$('.video-btn').click(function () {
  $videoSrc = $(this).data("src");
  $("#videoModal").modal({
    backdrop: "static"
  });
}); // when the modal is opened autoplay it  

$('#videoModal').on('shown.bs.modal', function (e) {
  // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
  $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
}); // stop playing the youtube video when I close the modal

$('#videoModal').on('hide.bs.modal', function (e) {
  // a poor man's stop video
  $("#video").attr('src', $videoSrc);
}); //video wrapper
// poster frame click event

$(document).on('click', '.js-videoPoster', function (ev) {
  ev.preventDefault();
  var $poster = $(this);
  var $wrapper = $poster.closest('.js-videoWrapper');
  videoPlay($wrapper);
}); // play the targeted video (and hide the poster frame)

function videoPlay($wrapper) {
  var $iframe = $wrapper.find('.js-videoIframe');
  var src = $iframe.data('src'); // hide poster

  $wrapper.addClass('videoWrapperActive'); // add iframe src in, starting the video

  $iframe.attr('src', src);
} // stop the targeted/all videos (and re-instate the poster frames)


function videoStop($wrapper) {
  // if we're stopping all videos on page
  if (!$wrapper) {
    var $wrapper = $('.js-videoWrapper');
    var $iframe = $('.js-videoIframe'); // if we're stopping a particular video
  } else {
    var $iframe = $wrapper.find('.js-videoIframe');
  } // reveal poster


  $wrapper.removeClass('videoWrapperActive'); // remove youtube link, stopping the video from playing in the background

  $iframe.attr('src', '');
} //isotope


var $grid = $('#filter-list').isotope({
  layoutMode: 'vertical',
  itemSelector: '#filter-list [data-filter-class]',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(1)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
});

function filterList(value) {
  var value = $("#filter-list").find("[data-filter-class*=" + value + "]");
  return value;
}

$('#filter-bar [data-filter]').on('click', function () {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({
    filter: filterList(filterValue)
  });
});
$('#filter-bar [data-filter]').each(function () {
  var $this = $(this);
  $this.on('click', function () {
    $('#filter-bar').find('.active').removeClass('active');
    $(this).addClass('active');
  });
});
//# sourceMappingURL=all.js.map
