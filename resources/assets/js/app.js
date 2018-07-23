import $ from 'jquery';
window.$ = $;

// ページ上部に移動
$('body').on('click', '#move-page-top', (event) => {
  event.stopPropagation();
  document.body.scrollTop = document.documentElement.scrollTop = 0;
});

const $movePageTop = $('#move-page-top');
$(window).scroll((event) => {
  if ($(event.target).scrollTop() > 100) {
    $movePageTop.addClass('show');
  } else {
    $movePageTop.removeClass('show');
  }
});
