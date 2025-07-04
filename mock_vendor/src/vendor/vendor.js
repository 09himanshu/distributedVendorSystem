import * as Error from '../utils/error.utils.js'

const vendorAStock = async (req, res, next) => {
  try {
    let data = [
      { id: 'A001', name: 'Keyboard', quantity: Math.floor(Math.random() * 100) + 1 },
      { id: 'A002', name: 'Mouse', quantity: Math.floor(Math.random() * 50) + 1 },
      { id: 'A003', name: 'Monitor', quantity: Math.floor(Math.random() * 20) + 1 },
      { id: 'A004', name: 'Webcam', quantity: Math.floor(Math.random() * 30) + 1 },
      { id: 'A005', name: 'Headphones', quantity: Math.floor(Math.random() * 40) + 1 },
      { id: 'A006', name: 'Speakers', quantity: Math.floor(Math.random() * 25) + 1 },
      { id: 'A007', name: 'Microphone', quantity: Math.floor(Math.random() * 15) + 1 },
      { id: 'A008', name: 'USB Cable', quantity: Math.floor(Math.random() * 80) + 1 },
      { id: 'A009', name: 'Power Adapter', quantity: Math.floor(Math.random() * 35) + 1 },
      { id: 'A010', name: 'External Hard Drive', quantity: Math.floor(Math.random() * 22) + 1 },
    ];
    res.status(200).send({
      status: true,
      message: "Vendor A stock retrieved successfully",
      data
    })
  } catch (err) {
    next(new Error.InternalServerError("Failed to get Vendor A stock"))
  }
}


const vendorBStock = async (req, res, next) => {
  try {
    let data = [
      { id: 'B101', name: 'Phone', quantity: Math.floor(Math.random() * 100) + 1 },
      { id: 'B102', name: 'Tablet', quantity: Math.floor(Math.random() * 75) + 1 },
      { id: 'B103', name: 'Charger', quantity: Math.floor(Math.random() * 30) + 1 },
      { id: 'B104', name: 'Smartwatch', quantity: Math.floor(Math.random() * 80) + 1 },
      { id: 'B105', name: 'Bluetooth Speaker', quantity: Math.floor(Math.random() * 80) + 1 },
      { id: 'B106', name: 'Power Bank', quantity: Math.floor(Math.random() * 70) + 1 },
      { id: 'B107', name: 'Wireless Earbuds', quantity: Math.floor(Math.random() * 90) + 1 },
      { id: 'B108', name: 'Laptop Stand', quantity: Math.floor(Math.random() * 60) + 1 },
      { id: 'B109', name: 'HDMI Cable', quantity: Math.floor(Math.random() * 70) + 1 },
      { id: 'B110', name: 'USB Hub', quantity: Math.floor(Math.random() * 50) + 1 }
    ];
    res.status(200).send({
      status: true,
      message: "Vendor B stock retrieved successfully",
      data
    })
  } catch (err) {
    next(new Error.InternalServerError("Failed to get Vendor A stock"))
  }
}

export { vendorAStock, vendorBStock }