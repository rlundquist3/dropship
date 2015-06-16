(function() {
  var $loginContainer = $('.js-login-container');
  var $signupContainer = $('.js-signup-container');
  var $loginButton = $('.js-login-button');
  var $signupButton = $('.js-signup-button');


  $signupButton.on('click', function() {
    $signupContainer.css('visibility', 'visible')
  })
                   
  $loginButton.on('click', function() {
    $loginContainer.css('visibility', 'visible')
  })
})();