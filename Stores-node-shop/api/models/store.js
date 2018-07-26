const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    StoreName: String,
    ContractID: Number,
    Country: String,
    DCOTAConnection: String,
    SFOStoreID: Number,
    LocalizedStoreName: String,
    StoreAddressLine1: String,
    StoreAddressLine2: String,
    StoreAddressLine3: String,
    AppleID: Number,
    City: String,
    District: String
});

module.exports=mongoose.model('Store',storeSchema);


