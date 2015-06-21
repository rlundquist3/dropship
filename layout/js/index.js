$(document).ready(function() {
    console.log('aasdfasdf')
    var $signupButton = $('.signup-button')
    var $signupForm = $('.signup-form')
    var $signupSubmit = $('.signup-submit')
    var $loginButton = $('.login-button')
    var $loginForm = $('.login-form')
    var $loginSubmit = $('.login-submit')

    $('.login-button').on('click', function() {
        console.log('x')
        $('.x').css('visibility', 'visible')
    })

    $('.login-button').click(function() {
        console.log('x')
        $('.x').css('visibility', 'visible')
    })

    $signupButton.on('click', function() {
        console.log('signup')
        $signupForm.css('visibility', 'visible')
    })

    $loginButton.on('click', function() {
        $loginForm.css('visibility', 'visible')
    })

    /*$signupSubmit.on('click', function() {
        if($signupPassword.val() = $signupPasswordConfirm.val()) {
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
    })*/

})
