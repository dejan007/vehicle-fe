import axios from "axios";

const GetAllVehicleModels = async () => {
  const res = await axios.get(
    `https://localhost:44304/api/VehicleModels`
  );
  return res;
};

export default GetAllVehicleModels;
