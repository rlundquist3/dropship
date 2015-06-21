var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.Schema.types.ObjectId

var inventoryDataConnection = mongoose.createConnection('mongodb://localhost/inventory_data')

var InventoryData = new Schema({
    company: ObjectId,
    sku: String,
    title: String,
    wholesale_cost: Number,
    quantity_available: Number,
    status: String,
    estimated_availability_date: Date,
    quantity_on_order: Number,
    discontinue_flag: Boolean,
    preorder_flag: Boolean,
    availability_start_date: Date,
    warehouse_code: [String],
    warehouse_location: [String],
    warehouse_quantity: [Number],
    case_pack_title: [String],
    case_pack_cost: [Number],
    case_pack_quantity_per: [Number],
    case_pack_quantity_available: [Number],
    quantity_discount_threshold: [Number],
    quantity_discount_cost: [Number],
    discontinue_date: Date,
    last_update_date: Date,
    map: Number,
    msrp: Number,
    street_price: Number,
    currency_code: String,
    handling_cost: Number,
    sale_cost: Number,
    sale_start_date: Date,
    sale_end_date: Date
})

module.exports = inventoryDataConnection.model('InventoryData', InventoryData)
