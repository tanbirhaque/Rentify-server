const { ObjectId } = require("mongodb");
const Payments = require("../../models/Payments");
const Requested_Properties = require("../../models/requestedProperties");
const Properties = require("../../models/Properties");


const paymentInsert = async (req, res) => {
    const payment = new Payments({
        paymentUser: req.body.paymentUser,
        propertyId: req.body.propertyId,
        requestId: req.body.requestId,
        price: req.body.price,
        owner: req.body.owner,
        property_status: req.body.property_status,
        date: req.body.date,
        transactionId: req.body.transactionId
    });
    const paymentResult = await payment.save();
    const query = { _id: new ObjectId(payment.requestId) };
    const deleteRes = await Requested_Properties.deleteOne(query)
    // This functions bellow are working for patch the status of property from the property collection by filtering the specific property collection using propertyID from the payment object. [Added by -Tanbir]
    const filter = { _id: new ObjectId(payment.propertyId) };
    const updateDoc = {
        $set: {
            "property_info.property_details.property_status":
                payment.property_status,
        },
    };
    const patchRes = await Properties.updateOne(filter, updateDoc);
    res.send({ paymentResult, deleteRes, patchRes });
}

module.exports = paymentInsert;