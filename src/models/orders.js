import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Cancelled"],
    default: "Pending",
  },
  shippingAddress: String,
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered"],
    default: "Processing",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order
