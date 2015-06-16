(function() {
  var $uploadForm = $('.js-upload-form');
  var $updateButton = $('.js-update-button');
  var $uploadButton = $('.js-upload-button');
  var $productsContainer = $('.js-products-container');
  var $inventoryContainer = $('.js-inventory-container');
  var $ordersContainer = $('.js-orders-container');
  var $partnersContainer = $('.js-partners-container');
  var $profileContainer = $('.js-profile-container');
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

    var socket = io.connect();
    socket.emit('get_company_data')
    socket.on('products_data', function(data) {
      socket.emit('product_confirm', 'client got product data')
      displayProductData(data)
    })
    socket.on('inventory_data', function(data) {
      socket.emit('inventory_confirm', 'client got inventory data')
      displayInventoryData(data)
    })

    var containers = [$productsContainer, $inventoryContainer, $ordersContainer, $partnersContainer, $profileContainer]

    function displayData(container, type, data) {
      container.html('<table cellpadding="0" cellspacing="0" border="0" class="' + type + '></table>')
      for (var i = 2; i < data.value.length; i++) {
        
      }

    }
    function displayProductData(data) {
      $productsContainer.html('<table cellpadding="0" cellspacing="0" border="0" class="products-table"></table>')
      console.log(data)
      $('.products-table').dataTable({
          'data': data,
          'columns': [
              {'data': 'value.z', 'title': 'a'},
              {'data': 'value.y', 'title': 'b'},
              {'data': 'value.x', 'title': 'c'},
              {'data': 'value.w', 'title': 'd'},
              {'data': 'value.v', 'title': 'e'}
          ]
      })
    }

    function displayInventoryData(data) {
      $inventoryTable.html('soup')
    }
})();
