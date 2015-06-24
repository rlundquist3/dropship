$(document).ready(function() {

    var socket = io.connect();
    socket.emit('get_company_data')
    socket.on('products_data', function(data) {
      socket.emit('product_confirm', 'client got product data')
      //displayData('product', data)
      displayProductData(data)
    })
    socket.on('inventory_data', function(data) {
      socket.emit('inventory_confirm', 'client got inventory data')
      //displayInventoryData(data)
    })

    //Finish implementation after further db setup
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

    //For testing purposes before actual db setup
    function displayProductData(data) {
    $('#products').html('<table cellpadding="0" cellspacing="0" border="0" class="products-table"></table>')
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

    $('.partner-confirm-button').on('click', function() {
        console.log($('.request_company').html())
        console.log($('.request_company').text())
        $.post('/partnerConfirm', {target: $('.request_company').html()})
    })
})
