import * as Error from '../utils/error.utils.js'

const vendorAStock = async (req, res, next) => {
  try {
    let data = [
      { id: 'A001', name: 'Keyboard', quantity: Math.floor(Math.random() * 100) + 1 },
      { id: 'A002', name: 'Mouse', quantity: Math.floor(Math.random() * 50) + 1 },
      { id: 'A003', name: 'Monitor', quantity: Math.floor(Math.random() * 20) + 1 }
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
      { id: 'B101', name: 'Phone', quantity: Math.floor(Math.random() * 200) + 1 },
      { id: 'B102', name: 'Tablet', quantity: Math.floor(Math.random() * 150) + 1 },
      { id: 'B103', name: 'Charger', quantity: Math.floor(Math.random() * 300) + 1 }
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

export { vendorAStock, vendorBStock }