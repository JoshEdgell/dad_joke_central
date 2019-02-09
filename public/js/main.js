$(()=>{

  const $hamburger = $('#hamburger');

  const $hamburgerToggler = $('.hamburgerToggler');
  $hamburgerToggler.on('click',()=>{
    $hamburger.click();
  });

  let $dadBox = $('#dadBox');
  $dadBox.css('height', $dadBox[0].scrollWidth);

  // I'm going to have to put a lot into this resize function.  For example, the height of the navbar is going to have to have a max-height that is 100% of the screen size minus the height of dadBox
  $(window).on('resize', function(){
    let $dadBox = $('#dadBox')
    $dadBox.css('height', $('#dadBox')[0].scrollWidth);
  })

})
