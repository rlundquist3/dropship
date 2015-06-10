(function() {
  var $uploadForm = $('.js-upload-form');
  var $updateButton = $('.js-update-button');
  var $uploadButton = $('.js-upload-button');
  var $searchBar = $('.js-search-bar');
  var $profileTab = $('.js-profile-tab');
  var $partnersTab = $('.js-partners-tab');
  var $ordersTab = $('.js-orders-tab');
  var $inventoryTab = $('.js-inventory-tab');
  var $productsTab = $('.js-products-tab');
  var $companyName = $('.js-company-name');


  $uploadButton.on('click', function() {
    $uploadForm.css('visibility', 'visible')
  })

  var $uploadFormButton = $('.jsUploadFormButton')

  $uploadFormButton.on('click', function() {
    $uploadForm.css('visibility', 'invisible')
  })
})();