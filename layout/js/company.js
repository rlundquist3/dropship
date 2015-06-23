$(document).ready(function() {

  $('.partner-button').on('click', function() {
      sendPartnerRequest()
  })

  function sendPartnerRequest() {
      $.post('/partnerRequest', {target: $('.username').text()})
  }
})
