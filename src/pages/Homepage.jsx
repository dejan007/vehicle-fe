import React, { useEffect, useState } from 'react';
import vehicleMakeStore from '../stores/VehicleMakeStore';
import { observer } from "mobx-react"
import { toJS } from 'mobx';
import VehicleMakeCard from '../components/VehicleMakeCard';
import AddVehicleMakeModal from '../components/AddVehicleMakeModal';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    console.log(toJS(vehicleMakeStore))
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [filterString, setFilterString] = useState()
    const [filterActive, setFilterActive] = useState(false)
    const [flag, setFlag] = useState(true)
    const [makesToRender, setMakesToRender] = useState(toJS(vehicleMakeStore.vehicleMakes))

    const navigate = useNavigate()

    const onFilterChange = (e) => {
        setFilterString(e.target.value.toLowerCase())

        if (e.target.value) {
            setFilterActive(true)
        } else {
            setFilterActive(false)
        }
    }

    const onSortingChange = (e) => {
        if (e.target.value == 1) {
            const sortedData = [...makesToRender].sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            setMakesToRender(sortedData)

        } else if (e.target.value == 2) {
            const sortedData = [...makesToRender].sort((a, b) => {
                return a.abrv.localeCompare(b.abrv);
            });
            setMakesToRender(sortedData)

        }
    }

    useEffect(()=>{
        setMakesToRender(toJS(vehicleMakeStore).vehicleMakes)
    },[flag])

    return (
        <div className='w-full max-w-[1400px] mx-auto mt-10'>
            <div className='flex justify-between mr-10'>
                <div className='text-[35px] font-semibold ml-10'>This is our Vehicle Brands collection</div>

                <button
                    className='w-[300px] h-[50px] rounded-[8px] text-[25px] uppercase bg-[#C02A1B] hover:bg-[#843333] text-white'
                    onClick={() => navigate('/vehicle-models')}>
                    Go to Vehicle Models
                </button>
            </div>

            <div className='mt-10  text-[25px] font-semibold ml-10 uppercase text-gray-600 underline'>
                We currently have {vehicleMakeStore.getVehicleMakesNumber} brands
            </div>

            <div
                className='mb-10 ml-10 mt-4 p-2 py-3 border border-green-400 text-green-400 w-[250px]  rounded-[6px] cursor-pointer hover:text-white hover:bg-green-400 transition-all duration-500'
                onClick={() => setAddModalOpen(true)}
            >
                + Add new
            </div>
            <AddVehicleMakeModal isOpen={addModalOpen} setIsOpen={setAddModalOpen} flag={flag} setFlag={setFlag}/>

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
                        <select name="" id="" onChange={(e) => onSortingChange(e)} className='w-[250px] h-[50px] border border-gray-400 rounded-[4px]'>
                            <option hidden >Select Sorting parameter</option>
                            <option value="1">Name</option>
                            <option value="2">Abreviation</option>
                        </select>
                    </div>
                </div>
            </div>



            <div className='mt-10 ml-10 flex flex-col gap-y-5'>
                {!filterActive &&
                    makesToRender && makesToRender.map((brand, index) => (
                        <VehicleMakeCard brand={brand} key={brand.id} flag={flag} setFlag={setFlag}/>
                    ))
                }

                {filterActive &&
                    makesToRender && makesToRender.filter((make) => make.name.toLowerCase().includes(filterString)).map((brand, index) => (
                        <VehicleMakeCard brand={brand} key={brand.id} flag={flag} setFlag={setFlag}/>
                    ))
                }

            </div>


        </div>
    );
}
const HomepageObserver = observer(Homepage)
export default HomepageObserver;