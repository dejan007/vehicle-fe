import axios from "axios";

const DeleteVehicleMake = async (id) => {
  const res = await axios.delete(
    `https://localhost:44304/api/VehicleMakes/${id}`
  );
  return res;
};

export default DeleteVehicleMake;
