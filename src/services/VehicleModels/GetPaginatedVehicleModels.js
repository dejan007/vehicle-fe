import axios from "axios";

const GetPaginatedVehicleModels = async (MakeId,Order,PageNumber,Name) => {
  const res = await axios.get(
    `https://localhost:44304/api/PagedVehicleModels`, {params:{PageNumber:PageNumber, Order:Order, MakeId:MakeId, Name:Name}}
  );
  return res;
};

export default GetPaginatedVehicleModels;
