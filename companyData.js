var mongoose = require('mongoose')
var Schema = mongoose.Schema

var dataTestConnection = mongoose.createConnection('mongodb://localhost/test_data')

var TestData = new Schema({
    z: String,
    y: String,
    x: String,
    w: String,
    v: String
})

var productDataConnection = mongoose.createConnection('mongodb://localhost/product_data')

var ProductData = new Schema({
    sku: String,
    title: String,
    wholesale_cost: Number,
    quantity_available: Number,
    long_description: String,
    short_description: String,
    long_text_description: String,
    short_text_description: String,
    brand: String,
    manufacturer: String,
    condition: String,
    last_update_date: Date,
    mpn: String,
    upc: String,
    ean: String,
    isbn: String,
    gtin: String,
    country_of_origin: String,
    catalog: [String],
    catalog_start_date: [Date],
    catalog_end_date: [Date],
    category: String,
    package_weight: Number,
    package_weight_units: String,
    estimated_shipping_cost: Number,
    package_length: Number,
    package_height: Number,
    package_depth: Number,
    package_dimension_units: String,
    ships_freight: Boolean,
    freight_class: Number,
    ships_alone: Boolean,
    max_ship_single_box: Number,
    length: Number,
    height: Number,
    depth: Number,
    dimension_units: String,
    weight: Number,
    weight_units: String,
    dimension_description: String,
    min_purchase_quantity: Number,
    max_purchase_quantity: Number,
    street_price: Number,
    bin_number: String,
    case_pack_length: Number,
    case_pack_height: Number,
    case_pack_depth: Number,
    case_pack_units: String,
    case_pack_quantity: Number,
    cross_sell_skus: String,
    accessory_skus: String,
    keywords: String,
    image_name: [String],
    image_type: [String],
    image_reference: [String],
    media_name: [String],
    media_type: [String],
    media_reference: [String],
    brand_image_reference: [String],
    pers_available: Boolean,
    pers_lines: Number,
    pers_char_per_line: Number,
    pers_description: String,
    pers_ship_lead_time: Number,
    pers_ship_lead_time_type: String,
    gift_wrap_available: Boolean,
    details: String,
    warranty: String,
    user_defined_name: [String],
    user_defined_value: [String],
    attribute_name: [String],
    attribute_value: [String]
})

module.exports = dataTestConnection.model('TestData', TestData)
    //productDataConnection.model('ProductData', ProductData)
