$(document).ready(function() {

    $('.login-button').on('click', function() {
        $('.login-container').css('visibility', 'visible')
    })
    
    $('.signup-button').on('click', function() {
        $('.signup-container').css('visibility', 'visible')
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
