(function() {
  var $uploadForm = $('.js-upload-form');
  var $updateButton = $('.js-update-button');
  var $uploadButton = $('.js-upload-button');
  var $productsTable = $('.js-products-table');
  var $inventoryTable = $('.js-inventory-table');
  var $ordersTable = $('.js-orders-table');
  var $partnersTable = $('.js-partners-table');
  var $profileTable = $('.js-profile-table');
  var $tableSlider = $('.js-table-slider');
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

  $productsTab.on('click', function() {
    $tableSlider.css('left', '0%')
  })
  $inventoryTab.on('click', function() {
    $tableSlider.css('left', '-100%')
  })
  $ordersTab.on('click', function() {
    $tableSlider.css('left', '-200%')
  })
  $partnersTab.on('click', function() {
    $tableSlider.css('left', '-300%')
  })
  $profileTab.on('click', function() {
    $tableSlider.css('left', '-400%')
  })

  var socket = io.connect('http://localhost:8000');
    socket.on('server_emit', function (data) {
      socket.emit('client_emit', {client: 'response'});
    });
  socket.on('product_data', displayProductData(data))

      function displayProductData(data) {
          $productsTable.html('<p>got product data</p>')
      }
})();