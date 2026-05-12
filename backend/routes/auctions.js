const express = require('express');
const router = express.Router();
const { getAuctions, getAuctionById, createAuction, updatePaymentStatus, getMyBids } = require('../controllers/auctionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAuctions)
  .post(protect, createAuction);

router.route('/my-bids')
  .get(protect, getMyBids);

router.route('/:id')
  .get(getAuctionById);

router.route('/:id/pay')
  .put(protect, updatePaymentStatus);

module.exports = router;
