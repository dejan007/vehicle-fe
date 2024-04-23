import { makeObservable, observable, computed, toJS, action } from "mobx"

class VehicleModelStore {

    vehicleModels = [{id:1,makeId:2,name:'Golf',abrv:'G5'},{id:2,makeId:1,name:'A4',abrv:'A4'},{id:3,makeId:1,name:'A3',abrv:'A3'}]

    constructor () {
        makeObservable( this, {
            vehicleModels: observable,
            vehicleModelsNumber: computed
        })  
    }

    get vehicleModelsNumber () {
        return this.vehicleModels.length;
    }

    deleteOne (id) {
        this.vehicleModels = this.vehicleModels.filter((vehicle)=>vehicle.id!==id)
    }

    editOne (id, name, abrv) {
        let tempVehicleModels = []

        this.vehicleModels.forEach((vehicleMake, index)=>{
            if(vehicleMake.id!==id) {
                tempVehicleModels.push(vehicleMake)
            } else {
                tempVehicleModels.push({id:id, name: name, abrv: abrv})
            }
        })
        this.vehicleModels=[...tempVehicleModels]
    }

    createOne (name, abrv) {
        this.vehicleModels.unshift({id:Math.random(), name:name, abrv:abrv})
    }



}

const vehicleModelStore = new VehicleModelStore()

export default vehicleModelStore;