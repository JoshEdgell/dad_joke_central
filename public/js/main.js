$(()=>{

  const $hamburger = $('#hamburger');

  const $hamburgerToggler = $('.hamburgerToggler');
  $hamburgerToggler.on('click',()=>{
    $hamburger.click();
  });

  const formCheck = function() {
    return false;
  }

  var userForm = document.getElementsByClassName('createUser');
  console.log(userForm);

  var validation = Array.prototype.filer

})
