import axios from "axios";

const EditVehicleMake = async (id, Name, Abrv) => {
    return await axios.put(`https://localhost:44304/api/VehicleMakes/${id}`, {
        Name: Name,
        Abrv: Abrv
    })
};

export default EditVehicleMake;
