import express from "express";
import newClients from "../models/ClientsModel.js";
const router = express.Router();

/* Adding of products */
router.post("/", async (request, response) => {
  const clientData = request.body;
  try {
    const newClient = new newClients(clientData);
    await newClient.save();
    response.status(201).json(newClient);
  } catch (err) {
    response.status(500).json(err);
  }
});

router.get("/", async (request, response) => {
  try {
    const Data = await newClients.find({});
    response.status(200).json(Data);
  } catch (err) {
    response.status(500).json(err);
  }
});

router.put("/:id", async (request, response) => {
  try {
    const updateClient = await newClients.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );
    response.status(200).json(updateClient);
  } catch (err) {
    response.status(500).json(err);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const removeClient = await newClients.findByIdAndDelete(request.params.id);
    response.status(200).json(removeClient);
  } catch (err) {
    response.status(500).json(err);
  }
});

export default router;
