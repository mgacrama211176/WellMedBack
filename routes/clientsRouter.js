import express from "express";
import newClients from "../models/ClientsModel.js";
const router = express.Router();

/* Adding of products */
router.post("/", async (request, response) => {
  const clientData = request.body;
  const newClient = new newClients(clientData);
  await newClient.save();
  response.status(201).json(newClient);
});

router.get("/", async (request, response) => {
  const Data = await newClients.find({});
  response.status(200).json(Data);
});

//search by ID
// router.get("/:id", async (request, response) => {
//   try {
//     const getID = await newProducts.findById(request.params.id);
//     response.status(200).json({ message: getID });
//   } catch (err) {
//     response.status(500).json(err);
//   }
// });

//Update Products
// router.put("/update/:id", async (request, response) => {
//   try {
//     const update = await newProducts.findByIdAndUpdate(
//       request.params.id,
//       {
//         $set: request.body,
//       },
//       { new: true }
//     );
//     response.status(200).json({ message: "Product Updated" });
//   } catch (err) {
//     response.status(500).json(err);
//   }
// });

//Deleting of product
// router.delete("/delete/:id", async (request, response) => {
//   try {
//     const deleteProduct = await newProducts.findByIdAndDelete(
//       request.params.id
//     );
//     response.status(200).json({ message: `product has been deleted` });
//   } catch (e) {
//     response.status(500).json(err);
//   }
// });

export default router;
