import mongoose from "mongoose";

const clientsSchema = new mongoose.Schema({
  client_type: { type: String, required: true },
  client_name: { type: String, required: true },
  client_address: String,
  client_phoneNumber: Number,
  car_model: String,
  car_make: Number,
  car_year: Number,
  car_chassisNumber: String,
  car_engineNumber: String,
  car_plateNumber: String,
});

const ClientsModel = mongoose.model("Clients", clientsSchema);

export default ClientsModel;
