import { makeObservable, observable, computed, toJS, action } from "mobx"
import GetAllVehicleModels from "../services/VehicleModels/GetAllVehicleModels";
import CreateVehicleModel from "../services/VehicleModels/CreateVehicleModel";
import EditVehicleModel from "../services/VehicleModels/EditVehicleModel";
import DeleteVehicleModel from "../services/VehicleModels/DeleteVehicleModel";
import GetPaginatedVehicleModels from "../services/VehicleModels/GetPaginatedVehicleModels";

class VehicleModelStore {

    vehicleModels = []

    constructor () {
        makeObservable( this, {
            vehicleModels: observable,
            getVehicleModelsNumber: computed
        })  
    }

    getAllVehicleModels () {
        GetAllVehicleModels().then((res)=>{
            this.vehicleModels.replace(res.data)
        })
    }

    getPaginatedVehicleModels (MakeId,order,pageNumber,Name) {
        GetPaginatedVehicleModels(MakeId,order,pageNumber, Name).then((res)=>{
            this.vehicleModels=res
        })
    }

    get getVehicleModelsNumber () {
        return this.vehicleModels.data?.length;
    }

    deleteOneVehicleModel (id) {
        DeleteVehicleModel(id)
    }

    editOneVehicleModel(id, name, abrv,makeId) {
        EditVehicleModel(id,name,abrv,makeId)
    }

    createVehicleModel (name, abrv, makeId) {
        CreateVehicleModel(name,abrv,makeId)
    }



}

const vehicleModelStore = new VehicleModelStore()

export default vehicleModelStore;