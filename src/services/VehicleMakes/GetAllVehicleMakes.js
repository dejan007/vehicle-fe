import axios from "axios";

const GetAllVehicleMakes = async () => {
  const res = await axios.get(
    `https://localhost:44304/api/VehicleMakes`
  );
  return res;
};

export default GetAllVehicleMakes;
