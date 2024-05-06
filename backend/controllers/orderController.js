import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import twilio from 'twilio';
// import sgMail from '@sendgrid/mail';



// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No order items");
		return;
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate("user", "name email");

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private

// const twilio = require('twilio');

const updateOrderToPaid = asyncHandler(async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);

		if (order) {
			order.isPaid = true;
			order.paidAt = Date.now();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.email_address
			};

			const updatedOrder = await order.save();

			if (order.isPaid) {
				console.log('paid successfully');
				await sendSMS("Order has been paid."); 
				// await sendEmail("Order has been paid."); 
			}

			res.json(updatedOrder);
		} else {
			res.status(404);
			throw new Error("Order not found");
		}
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
});

async function sendSMS(message) {
	try {
		const accountSid = 'AC6e891ab3239d46c4b73c170bb93a63bc';
		const authToken = 'a24dedf9d5a1c334eb3a5d2c8ac4cecb'; 
		const client = twilio(accountSid, authToken);

		const adminPhoneNumber = '+918220534711'; 

		await client.messages.create({
			body: message,
			from: '+13016855032', 
			to: adminPhoneNumber
		});

		console.log("SMS sent to admin successfully!");
	} 
	catch (error) {
		console.error("Error sending SMS to admin:", error);
	}
}

// async function sendEmail(message) {
//     try {
//         sgMail.setApiKey('apikey'); //your send grid api key

//         const msg = {
//             to: '',
//             from: '',
//             subject: 'Order Paid Notification',
//             text: message,
//         };

//         await sgMail.send(msg);
//         console.log("Email sent successfully!");
//     } 
// 	catch (error) {
//         console.error("Error sending email to", error);
//     }
// }

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({user: req.user._id});
	res.json(orders);
});

// @desc    Get profit data
// @route   GET /api/orders/chart-data
// @access  Private
const getChartData = asyncHandler(async (req, res) => {
	try {
		const orderTotalsByDay = await Order.aggregate([
		  {
			$group: {
			  _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
			  total: { $sum: '$totalPrice' }
			}
		  },
		  {
			$sort: { '_id': 1 }
		  }
		]);
	
		console.log(orderTotalsByDay);
		res.json(orderTotalsByDay);
	  } catch (error) {
		console.error(error);
	  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate("user", "id name avatar");
	res.json(orders);
});

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
	getChartData
};
