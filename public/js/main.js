$(()=>{

  const $hamburger = $('#hamburger');

  const $hamburgerToggler = $('.hamburgerToggler');
  $hamburgerToggler.on('click',()=>{
    $hamburger.click();
  });

  const $loginButton = $('#loginButton');
  $loginButton.on('click', ()=>{
    const $userLink = $('.userLink');
    $userLink.on('click', ()=>{
      const $fullStar = $('.fas');
      console.log($fullStar, 'fullStar');

      //Look back at how I dealt with multiple click even elements (it has to be something to do with binding) from the disappearing cards on my website

    });
  });

})
