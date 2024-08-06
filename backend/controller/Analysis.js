const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// Tổng số đơn hàng
router.get('/total-orders', async (req, res) => {
  try {
    const ordersCount = await Order.countDocuments();
    res.json({ ordersCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Doanh thu
router.get('/revenue', async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
    ]);
    res.json(revenue[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sản phẩm bán chạy
router.get('/top-products', async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: '$products' },
      { $group: { _id: '$products.productId', totalSold: { $sum: '$products.quantity' } } },
      { $sort: { totalSold: -1 } },
      { $limit: 10 }
    ]);
    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
