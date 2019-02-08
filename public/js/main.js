$(()=>{

  const $hamburger = $('#hamburger');

  const $hamburgerToggler = $('.hamburgerToggler');
  $hamburgerToggler.on('click',()=>{
    $hamburger.click();
  });

  let $dadBox = $('#dadBox');
  $dadBox.css('height', $dadBox[0].scrollWidth);

  $(window).on('resize', function(){
    let $dadBox = $('#dadBox')
    $dadBox.css('height', $('#dadBox')[0].scrollWidth);
  })

})
