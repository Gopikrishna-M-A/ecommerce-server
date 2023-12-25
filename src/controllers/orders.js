import Order from '../models/orders.js'
import razorpay from 'razorpay';

const razorpayClient = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error getting all orders:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}   

export const verifyOrder = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, total } = req.body;

  try {
      // Fetch payment details from Razorpay
      const payment = await razorpayClient.payments.fetch(razorpay_payment_id);
      const { status, amount, currency, order_id, method } = payment;

      // Verify payment details 
      const result = (status === 'captured' && amount == total && currency === 'INR' && order_id === razorpay_order_id) 

    // const result = razorpayClient.orders.verify(attributes);
    console.log('Payment verification status:', result);
    if (result) {
      // Payment is valid, mark it as successful in your database
      // Your database update logic goes here

      res.status(200).json({ success: true });
    } else {
      // Invalid payment
      res.status(400).json({ success: false, message: 'Invalid payment' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}




export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await razorpayClient.orders.create({
      amount: amount * 100, // Razorpay amount is in paisa, not rupees
      currency: 'INR',
    });
    res.json({ order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(400).json({ error: 'Bad request' });
  }
}   




export const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error getting order details:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}   




export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

    // Update the order status based on the status provided
    // Implement the necessary logic to update the order

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(400).json({ error: 'Bad request' });
  }
}  




export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user._id; 
    const orderHistory = await Order.find({ customer: userId });
    res.json(orderHistory);
  } catch (error) {
    console.error('Error getting order history:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}   


