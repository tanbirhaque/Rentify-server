const { model, Schema } = require("mongoose");

const Requested_PropertiesSchema = new Schema({
    property: {
        owner_details: {
            owner_name: {
                type: String,
                default: ""
            },
            owner_img: {
                type: String,
                default: ""
            },
            owner_email: {
                type: String,
                default: ""
            }
        },
        ownership_duration: {
            type: String,
            default: ""
        },
        property_for: {
            type: String,
            default: ""
        },
        verify_status: {
            type: String,
            default: ""
        },
        property_img: {
            type: String,
            default: ""
        },
        property_title: {
            type: String,
            default: ""
        },
        property_category: {
            type: String,
            default: ""
        },
        property_description: {
            type: String,
            default: ""
        },
        property_details: {
            property_id: {
                type: String,
                default: ""
            },
            property_price: {
                type: Number,
                default: null
            },
            property_type: {
                type: String,
                default: ""
            },
            property_status: {
                type: String,
                default: ""
            },
            bedroom: {
                type: Number,
                default: null
            },
            bath: {
                type: Number,
                default: null
            },
            balcony: {
                type: Number,
                default: null
            },
            garages: {
                type: Number,
                default: null
            },
            sqf: {
                type: Number,
                default: null
            },
            built: {
                type: String,
                default: ""
            },
            floor_plans: {
                type: String,
                default: ""
            },
            property_video: {
                type: String,
                default: ""
            },
            property_features: [],
            property_tags: [],
        },
        property_location: {
            address: {
                street: {
                    type: String,
                    default: ""
                },
                city: {
                    type: String,
                    default: ""
                },
                state: {
                    type: String,
                    default: ""
                },
                country: {
                    type: String,
                    default: ""
                }
            }
        }
    },
    propertyID: {
        type: String,
        default: ""
    },
    requestStatus: {
        type: String,
        default: ""
    },
    requesterName: {
        type: String,
        default: ""
    },
    requesterNumber: {
        type: String,
        default: ""
    },
    requesterEmail: {
        type: String,
        default: ""
    },
    requesterPhoto: {
        type: String,
        default: ""
    },
    requesterMessage: {
        type: String,
        default: ""
    },
    family: {
        type: String,
        default: ""
    },
    children: {
        type: String,
        default: ""
    },

})

const Requested_Properties = model("Requested_Properties", Requested_PropertiesSchema, "Requested_Properties");
module.exports = Requested_Properties;