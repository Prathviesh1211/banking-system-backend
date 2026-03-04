const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Account must be associated with a User"],
      index:true   //->To improve fetching speed
    },

    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "FROZEN", "CLOSED"],
        message: "Status must be ACTIVE, FROZEN, or CLOSED",
      },
      default: "ACTIVE",
    },

    currency: {
      type: String,
      required: [true, "Currency is required for creating an account"],
      default: "INR",
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.indexe({user:1,status:1})

const accountModel = mongoose.model("Account", accountSchema);

module.exports = accountModel;