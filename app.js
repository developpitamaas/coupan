const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = 3000;

// Function to calculate the final discounted price and discount percentage
function calculateFinalPrice(price1, price2, finalPrice) {
    let originalPrice = price1 + price2;
    let discountAmount = originalPrice - finalPrice;
    let discountPercentage = 0;
    
    // Calculate discount percentage
    if (price1 < price2) {
      discountPercentage = (discountAmount / price2) * 100;
    } else {
      discountPercentage = (discountAmount / price1) * 100;
    }
    
    let discountedPrice = originalPrice - discountAmount;

    // Log the details (optional)
    console.log(`Original Price (before discount): ₹${originalPrice}`);
    console.log(`Discount Applied: ₹${discountAmount.toFixed(2)}`);
    console.log(`Discount Percentage: ${discountPercentage.toFixed(2)}%`);
    console.log(`Final Price after Discount: ₹${discountedPrice.toFixed(2)}`);

    // Return both the discounted price and the discount percentage
    return { discountedPrice, discountPercentage };
}

app.get('/calculate', (req, res) => {
    // Extract price1, price2, finalPrice from query parameters
    const { price1, price2, finalPrice } = req.query;
  
    // Ensure that all parameters are provided and are numbers
    if (!price1 || !price2 || !finalPrice) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
  
    // Convert them to numbers
    const price1Num = parseFloat(price1);
    const price2Num = parseFloat(price2);
    const finalPriceNum = parseFloat(finalPrice);
  
    // Validate the parameters
    if (isNaN(price1Num) || isNaN(price2Num) || isNaN(finalPriceNum)) {
      return res.status(400).json({ error: "Parameters must be valid numbers" });
    }
  
    // Calculate the final price and discount percentage
    const { discountedPrice, discountPercentage } = calculateFinalPrice(price1Num, price2Num, finalPriceNum);
  
    // Return the details as a response
    res.json({
      originalPrice: price1Num + price2Num,
      discountApplied: (price1Num + price2Num) - finalPriceNum,
      finalPrice: discountedPrice,
      discountPercentage: discountPercentage.toFixed(2)  // Returning the discount percentage as a formatted string
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
