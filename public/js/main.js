$(()=>{

  const $hamburger = $('#hamburger');

  const $hamburgerToggler = $('.hamburgerToggler');
  $hamburgerToggler.on('click',()=>{
    $hamburger.click();
  });

  let $dadBox = $('#dadBox');
  let $dadBoxWidth = $dadBox[0].scrollWidth;
  $dadBox.css('height', $dadBoxWidth);
  let $navbar = $('.pos-f-t');
  $navbar.css('max-height', 'calc(100% - ' + $dadBoxWidth + 'px)').css('overflow','hidden');

  // I'm going to have to put a lot into this resize function.  For example, the height of the navbar is going to have to have a max-height that is 100% of the screen size minus the height of dadBox
  $(window).on('resize', function(){
    // let $dadBox = $('#dadBox')
    let $dadBoxWidth = $dadBox[0].scrollWidth;
    $dadBox.css('height', $('#dadBox')[0].scrollWidth);
    $navbar.css('max-height', 'calc(100% - ' + $dadBoxWidth + 'px)').css('overflow','hidden');
  })

})
