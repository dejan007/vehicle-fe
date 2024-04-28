import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vehicleModelStore from '../stores/VehicleModelStore';
import vehicleMakeStore from '../stores/VehicleMakeStore';
import { observer } from "mobx-react"
import { toJS } from 'mobx';
import AddVehicleModelModal from '../components/AddVehicleModelModal';
import VehicleModelCardObserver from '../components/VehicleModelCard';
import Pagination from '../components/Pagination';

function VehicleModels() {
    const navigate = useNavigate()

    const [addModalOpen, setAddModalOpen] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [makeId, setMakeId] = useState(1)
    const [orderBy, setOrderBy] = useState("id")
    const [searchString, setSearchString] = useState("")

    useEffect(()=>{
        vehicleModelStore.getPaginatedVehicleModels(makeId, "id", pageNumber, searchString);
        vehicleMakeStore.getAllVehicleMakes()
    },[])

    useEffect(()=>{
        vehicleModelStore.getPaginatedVehicleModels(makeId, orderBy, pageNumber, searchString)
    },[pageNumber])

    const refetchPaginatedVehicleModels= () => {
        setTimeout(()=>{
            vehicleModelStore.getPaginatedVehicleModels(makeId, orderBy, pageNumber, searchString);
        },100)
       
    }

    const onFilterChange = (e) => {
        setSearchString(e.target.value)

        if (e.target.value) {
            setSearchString(e.target.value)
            vehicleModelStore.getPaginatedVehicleModels(makeId, "id", pageNumber, e.target.value)
    
        } else {
            setSearchString(e.target.value)
            vehicleModelStore.getPaginatedVehicleModels(makeId, "id", pageNumber)
        }
    }

    const onSortingChange = (e) => {
        if(e.target.value==1) {
            vehicleModelStore.getPaginatedVehicleModels(makeId,"name",pageNumber, searchString);
            setOrderBy("name")
        } else if (e.target.value==2) {
            vehicleModelStore.getPaginatedVehicleModels(makeId,"id",pageNumber, searchString);
            setOrderBy("id")
        }
    }

    const changeMakeId = (e)=> {
        setMakeId(e.target.value)
        vehicleModelStore.getPaginatedVehicleModels(e.target.value, orderBy, pageNumber, searchString)
    }

    return (
        <div className='w-full max-w-[1400px] mx-auto mt-10'>
            <div className='flex justify-between mr-10'>
                <div className='text-[35px] font-semibold ml-10'>This is our Vehicle Models collection</div>

                <button
                    className='w-[300px] h-[50px] rounded-[8px] text-[25px] uppercase bg-blue-400 hover:bg-blue-500 text-white'
                    onClick={() => navigate('/')}>
                    Go to Vehicle Makes
                </button>
            </div>

            <div
                className='mb-10 ml-10 mt-14 p-2 py-3 border border-green-400 text-green-400 w-[250px]  rounded-[6px] cursor-pointer hover:text-white hover:bg-green-400 transition-all duration-500'
                onClick={() => setAddModalOpen(true)}
            >
                + Add new
            </div>
            <AddVehicleModelModal isOpen={addModalOpen} setIsOpen={setAddModalOpen} refetchPaginatedVehicleModels={refetchPaginatedVehicleModels}/>

            <div className='flex gap-x-10'>
                <div>
                    <div className='ml-10 mt-2'>Type in Vehicle Model:</div>
                    <input
                        type="text"
                        className='w-[250px] h-[50px] border border-gray-400 rounded-[4px] ml-10 mt-2 pl-4'
                        onChange={(e) => onFilterChange(e)}
                    />
                </div>

                <div className='mt-2'>
                    <div className='mb-2'>Sort by</div>
                    <select name="" id="" onChange={(e)=>onSortingChange(e)} className='w-[250px] h-[50px] pl-2 border border-gray-400 rounded-[4px]'>
                        <option hidden >Select Sorting parameter</option>
                        <option value="1">Name</option>
                        <option value="2">Id</option>
                    </select>
                </div>

                <div className='mt-2'>
                    <div className='mb-2'>Show only:</div>
                    <select name="" id="" className='w-[250px] h-[50px] pl-2 border border-gray-400 rounded-[4px]' onChange={(e)=>changeMakeId(e)}>
                        {toJS(vehicleMakeStore).vehicleMakes?.data?.map((make,index)=>(
                             <option value={make.Id} key={make.Id}>{make.Name}</option>
                        ))}
                    </select>

                </div>

            </div>



            <div className='mt-10 ml-10 flex flex-col gap-y-5'>
                {
                    toJS(vehicleModelStore).vehicleModels && toJS(vehicleModelStore).vehicleModels?.data?.map((model, index) => (
                        <VehicleModelCardObserver model={model} key={model.Id} refetchPaginatedVehicleModels={refetchPaginatedVehicleModels}/>
                    ))
                }

      
            </div>

               {/* Pagination */}
               {
                (vehicleModelStore.getVehicleModelsNumber!=undefined && vehicleModelStore.getVehicleMakesNumber !==0) && (vehicleModelStore.vehicleModels.headers["x-pagination"] != undefined) &&
                <Pagination
                 paginationData={JSON.parse(vehicleModelStore.vehicleModels.headers["x-pagination"])}
                 setPageNumber={setPageNumber}/>
            }


        </div>
    );
}

const VehicleModelsObserver = observer(VehicleModels)

export default VehicleModelsObserver;