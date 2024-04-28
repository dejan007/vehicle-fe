import axios from "axios";

const GetPaginatedVehicleMakes = async (Order, PageNumber,Name) => {
  const res = await axios.get(
    `https://localhost:44304/api/PagedVehicleMakes`, {params:{PageNumber:PageNumber, Order:Order, Name:Name}}
  );
  return res;
};

export default GetPaginatedVehicleMakes;
