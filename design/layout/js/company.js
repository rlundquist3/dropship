(function() {
  var $companyName = $('.js-company-name');
  var $searchBar = $('.js-search-bar');


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
  	
    function displayData(container, type, data) {
        container.html('<table cellpadding="0" cellspacing="0" border="0" class="' + type + '"></table>')
        console.log(data)
        var columns = []
        for (var column in data[0]) {
            if (column != '_id' && column != '__v') {
                columns.push({'data': column, 'title': column})
            }
        }
        console.log(columns)

        $('.'+type).dataTable({
            'data': data,
            'columns': columns
        })
    }

      function displayProductData(data) {
        $productsContainer.html('<table cellpadding="0" cellspacing="0" border="0" class="products-table"></table>')
        console.log(data)
        $('.products-table').dataTable({
            'data': data,
            'columns': [
                {'data': 'z', 'title': 'z'},
                {'data': 'y', 'title': 'y'},
                {'data': 'x', 'title': 'x'},
                {'data': 'w', 'title': 'w'},
                {'data': 'v', 'title': 'v'}
            ]
        })
      }
})();