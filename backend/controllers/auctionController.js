const AuctionItem = require('../models/AuctionItem');
const Bid = require('../models/Bid');

const getAuctions = async (req, res) => {
  try {
    const auctions = await AuctionItem.find({})
      .populate('seller', 'name')
      .populate('highestBidder', 'name')
      .sort({ createdAt: -1 });
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuctionById = async (req, res) => {
  try {
    const auction = await AuctionItem.findById(req.params.id)
      .populate('seller', 'name')
      .populate('highestBidder', 'name');
    
    if (auction) {
      const bids = await Bid.find({ auctionItem: req.params.id })
        .populate('user', 'name')
        .sort({ amount: -1 });
      
      res.json({ ...auction._doc, bids });
    } else {
      res.status(404).json({ message: 'Auction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAuction = async (req, res) => {
  const { title, description, origin, roastLevel, startingPrice, endTime } = req.body;
  const imageUrl = req.body.imageUrl || '';

  try {
    const auction = new AuctionItem({
      title,
      description,
      origin,
      roastLevel,
      startingPrice,
      endTime,
      imageUrl,
      seller: req.user._id,
    });

    const createdAuction = await auction.save();
    res.status(201).json(createdAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const auction = await AuctionItem.findById(req.params.id);
    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    
    auction.isPaid = true;
    auction.status = 'completed';
    await auction.save();
    
    res.json({ message: 'Payment updated successfully', auction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBids = async (req, res) => {
  try {
    // Find all unique auctions where the user has placed a bid
    const bids = await Bid.find({ user: req.user._id }).distinct('auctionItem');
    const auctions = await AuctionItem.find({ _id: { $in: bids } })
      .populate('seller', 'name')
      .populate('highestBidder', 'name')
      .sort({ updatedAt: -1 });
    
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAuctions, getAuctionById, createAuction, updatePaymentStatus, getMyBids };
