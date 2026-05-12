const AuctionItem = require('../models/AuctionItem');
const Bid = require('../models/Bid');

module.exports = (io, socket) => {
  socket.on('joinAuction', (auctionId) => {
    socket.join(auctionId);
    console.log(`User ${socket.id} joined auction ${auctionId}`);
  });

  socket.on('placeBid', async (data) => {
    const { auctionId, userId, amount } = data;

    try {
      const auction = await AuctionItem.findById(auctionId);
      
      if (!auction || auction.status !== 'active') {
        return socket.emit('bidError', { message: 'Auction not active or found' });
      }

      if (new Date() > new Date(auction.endTime)) {
        auction.status = 'completed';
        await auction.save();
        io.to(auctionId).emit('auctionEnd', { message: 'Auction has ended', winner: auction.highestBidder });
        return;
      }

      if (amount <= auction.currentBid) {
        return socket.emit('bidError', { message: 'Bid must be higher than current bid' });
      }

      // Create new bid
      const bid = new Bid({
        user: userId,
        auctionItem: auctionId,
        amount
      });
      await bid.save();

      // Update auction
      auction.currentBid = amount;
      auction.highestBidder = userId;
      await auction.save();

      // Populate highest bidder details
      const updatedAuction = await AuctionItem.findById(auctionId).populate('highestBidder', 'name');

      // Broadcast new bid
      io.to(auctionId).emit('bidUpdate', {
        currentBid: amount,
        highestBidder: updatedAuction.highestBidder,
        timestamp: new Date()
      });

    } catch (error) {
      console.error('Bid error:', error);
      socket.emit('bidError', { message: 'An error occurred while placing bid' });
    }
  });

  socket.on('leaveAuction', (auctionId) => {
    socket.leave(auctionId);
    console.log(`User ${socket.id} left auction ${auctionId}`);
  });
};
