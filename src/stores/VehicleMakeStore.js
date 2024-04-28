import { makeObservable, observable, computed } from "mobx"
import GetAllVehicleMakes from "../services/VehicleMakes/GetAllVehicleMakes";
import DeleteVehicleMake from "../services/VehicleMakes/DeleteVehicleMake";
import EditVehicleMake from "../services/VehicleMakes/EditVehicleMake";
import CreateVehicleMake from "../services/VehicleMakes/CreateVehicleMake";
import GetPaginatedVehicleMakes from "../services/VehicleMakes/GetPaginatedVehicleMakes";

class VehicleMakeStore {

    vehicleMakes = []

    constructor () {
        makeObservable( this, {
            vehicleMakes: observable,
            getVehicleMakesNumber: computed
        })  
    }

    get getVehicleMakesNumber () {
        return this.vehicleMakes.data?.length;
    }

    getPaginatedVehicleMakes (Order,PageNumber, name) {
        GetPaginatedVehicleMakes(Order,PageNumber, name).then((res)=>{
            this.vehicleMakes=res
        })
    }

    getAllVehicleMakes () {
        GetAllVehicleMakes().then((res)=>{
            this.vehicleMakes=res
        })
    }

    deleteOneVehicleMake (id) {
        DeleteVehicleMake(id)
    }

    editOneVehicleMake (id, name, abrv) {
        EditVehicleMake(id,name,abrv)
    }

    createVehicleMake (name, abrv) {
        CreateVehicleMake(name, abrv)
    }
}

const vehicleMakeStore = new VehicleMakeStore();

export default vehicleMakeStore;