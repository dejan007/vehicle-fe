import axios from "axios";

const DeleteVehicleModel = async (id) => {
  const res = await axios.delete(
    `https://localhost:44304/api/VehicleModels/${id}`
  );
  return res;
};

export default DeleteVehicleModel;
