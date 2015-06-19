(function() {
  var $loginSubmit = $('.js-login-submit');
  var $loginPassword = $('.js-login-password');
  var $loginUsername = $('.js-login-username');
  var $loginContainer = $('.js-login-container');
  var $signupSubmit = $('.js-signup-submit');
  var $signupPasswordConfirm = $('.js-signup-password-confirm');
  var $signupPassword = $('.js-signup-password');
  var $signupUsername = $('.js-signup-username');
  var $signupCompanyName = $('.js-signup-company-name');
  var $signupContainer = $('.js-signup-container');
  var $loginButton = $('.js-login-button');
  var $signupButton = $('.js-signup-button');


  $signupButton.on('click', function() {
    $signupContainer.css('visibility', 'visible')
  })

  $loginButton.on('click', function() {
    $loginContainer.css('visibility', 'visible')
  })

  $signupSubmit.on('click', function() {
    if($signupPassword.val() == $signupPasswordConfirm.val()) {
        $.post('/signup', {company: $signupCompanyName.val(),
                              username: $signupUsername.val(),
                              password: $signupPassword.val()})
    } else {
      alert('passwords do not match')
    }
  })

  $loginSubmit.on('click', function() {
    $.post('/login', {username: $loginUsername.val(),
                      password: $loginPassword.val()})
  })

})();
