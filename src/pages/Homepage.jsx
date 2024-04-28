import React, { useEffect, useState } from 'react';
import vehicleMakeStore from '../stores/VehicleMakeStore';
import { observer } from "mobx-react"
import { toJS } from 'mobx';
import VehicleMakeCard from '../components/VehicleMakeCard';
import AddVehicleMakeModal from '../components/AddVehicleMakeModal';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination';

function Homepage() {
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [flag, setFlag] = useState(true)
    const [pageNumber, setPageNumber] = useState(1)
    const [orderBy, setOrderBy] = useState("id")
    const [searchString, setSearchString] = useState("")


    const navigate = useNavigate()

    useEffect(()=>{
        vehicleMakeStore.getPaginatedVehicleMakes("id",pageNumber)
    },[])
    useEffect(()=>{
        vehicleMakeStore.getPaginatedVehicleMakes(orderBy,pageNumber, searchString)
    },[pageNumber])

    const refetchPaginatedVehicleMakes= () => {
        setTimeout(()=>{
             vehicleMakeStore.getPaginatedVehicleMakes(orderBy,pageNumber, searchString)
        },100)
       
    }

    const onFilterChange = (e) => {
        
        if (e.target.value) {
            vehicleMakeStore.getPaginatedVehicleMakes(orderBy,pageNumber,e.target.value)
            setSearchString(e.target.value)
        } else {
            vehicleMakeStore.getPaginatedVehicleMakes(orderBy,pageNumber)
            setSearchString(e.target.value)
        }
    }

    const onSortingChange = (e) => {
        if (e.target.value == 1) {
           vehicleMakeStore.getPaginatedVehicleMakes('name', pageNumber, searchString)
           setOrderBy('name')
        } else if (e.target.value == 2) {
           vehicleMakeStore.getPaginatedVehicleMakes('id', pageNumber, searchString)
           setOrderBy('id')
        }
    }
    return (
        <div className='w-full max-w-[1400px] mx-auto mt-10'>
            <div className='flex justify-between mr-10'>
                <div className='text-[35px] font-semibold ml-10'>This is our Vehicle Brands collection</div>

                <button
                    className='w-[300px] h-[50px] rounded-[8px] text-[25px] uppercase bg-blue-400 hover:bg-blue-500 text-white'
                    onClick={() => navigate('/vehicle-models')}>
                    Go to Vehicle Models
                </button>
            </div>


            <div
                className='mb-10 ml-10 mt-10 p-2 py-3 border border-green-400 text-green-400 w-[250px]  rounded-[6px] cursor-pointer hover:text-white hover:bg-green-400 transition-all duration-500'
                onClick={() => setAddModalOpen(true)}
            >
                + Add new
            </div>
            <AddVehicleMakeModal isOpen={addModalOpen} setIsOpen={setAddModalOpen} flag={flag} setFlag={setFlag} refetchPaginatedVehicleMakes={refetchPaginatedVehicleMakes}/>

            <div className='flex gap-x-5'>
                <div>
                    <div className='ml-10 mt-2'>Type in Vehicle Make:</div>
                    <input
                        type="text"
                        className='w-[250px] h-[50px] border border-gray-400 rounded-[4px] ml-10 mt-2 pl-4'
                        onChange={(e) => onFilterChange(e)}
                    />
                </div>
                <div>
                    <div className='mt-2'>
                        <div className='mb-2'>Sort by</div>
                        <select name="" id="" onChange={(e) => onSortingChange(e)} className='w-[250px] h-[50px] pl-2 border border-gray-400 rounded-[4px]'>
                            <option hidden >Select Sorting parameter</option>
                            <option value="1">Name</option>
                            <option value="2">Id</option>
                        </select>
                    </div>
                </div>
            </div>



            <div className='mt-10 ml-10 flex flex-col gap-y-5'>
                {
                    toJS(vehicleMakeStore).vehicleMakes?.data?.map((brand, index) => (
                        <VehicleMakeCard brand={brand} key={brand.Id} refetchPaginatedVehicleMakes={refetchPaginatedVehicleMakes}/>
                    ))
                }

            </div>


            {/* Pagination */}
            {
                (vehicleMakeStore.getVehicleMakesNumber!=undefined && vehicleMakeStore.getVehicleMakesNumber !==0) && (vehicleMakeStore.vehicleMakes.headers["x-pagination"] != undefined) &&
                <Pagination
                 paginationData={JSON.parse(vehicleMakeStore.vehicleMakes.headers["x-pagination"])}
                 setPageNumber={setPageNumber}/>
            }

        </div>
    );
}
const HomepageObserver = observer(Homepage)
export default HomepageObserver;