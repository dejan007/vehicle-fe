import axios from "axios";

const EditVehicleModel = async (id, Name, Abrv, MakeId) => {
    return await axios.put(`https://localhost:44304/api/VehicleModels/${id}`, {
        Name: Name,
        Abrv: Abrv,
        MakeId:MakeId
    })
};

export default EditVehicleModel;
