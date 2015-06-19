(function() {
  var $partnerButton = $('.js-partner-button');
  var $companyName = $('.js-company-name');
  var $searchBar = $('.js-search-bar');


  $partnerButton.on('click', function() {
    sendPartnerRequest()
  }
})();