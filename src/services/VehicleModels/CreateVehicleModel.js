import axios from "axios";

const CreateVehicleModel = async (Name, Abrv, MakeId) => {
    return await axios.post('https://localhost:44304/api/VehicleModels', {
        Name: Name,
        Abrv: Abrv,
        MakeId: MakeId
    })
};

export default CreateVehicleModel;
