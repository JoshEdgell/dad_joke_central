$(()=>{
  const $hamburger = $('#hamburger');
  
  const $loginButton = $('#loginButton');
  $loginButton.on('click',()=>{
    $hamburger.click();
  })
})
