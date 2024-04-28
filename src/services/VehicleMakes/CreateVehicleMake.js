import axios from "axios";

const CreateVehicleMake = async (Name, Abrv) => {
    return await axios.post('https://localhost:44304/api/VehicleMakes', {
        Name: Name,
        Abrv: Abrv
    })
};

export default CreateVehicleMake;
