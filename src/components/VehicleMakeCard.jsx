import React, { useState } from 'react';
import vehicleMakeStore from '../stores/VehicleMakeStore';
import { observer } from "mobx-react"
import { toJS } from 'mobx';

function VehicleMakeCard({ brand, flag, setFlag }) {

    const [editingMode, setEditingMode] = useState(false)
    const [newName, setNewName] = useState(brand.name)
    const [newAbrv, setNewAbrv] = useState(brand.abrv)


    const editVehicleCard = () =>{
        vehicleMakeStore.editOne(brand.id, newName, newAbrv)
        setEditingMode(false)
        setFlag(!flag)
    }

    return (
        <div className='w-[400px] h-[100px] p-3 border border-gray-400 shadow-md hover:shadow-lg rounded-[5px] flex justify-between' key={brand.id}>
            {!editingMode &&
                <>

                    <div>
                        <div className='text-[20px] font-medium'>{brand.name}</div>
                        <div className='text-[30px] uppercase text-gray-500'>{brand.abrv}</div>
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        <button
                            onClick={() => setEditingMode(true)}
                            className='border border-yellow-400 rounded-[4px] p-1 px-2 text-yellow-400 hover:text-white hover:bg-yellow-400 transition-all duration-500'
                        >
                            Edit
                        </button>
                        <button
                            className='border border-red-700 rounded-[4px] p-1 px-2 text-red-700 hover:text-white hover:bg-red-700 transition-all duration-500'
                            onClick={() => {
                                vehicleMakeStore.deleteOne(brand.id);
                                setFlag(!flag)
                            }}
                        >
                            Delete
                        </button>

                    </div>
                </>
            }

            {editingMode &&
                <>
                    <div>
                        <input
                         type="text"
                         className="border border-gray-400 rounded-[4px] p-1 pl-2 mb-1"
                         defaultValue={brand.name}
                         onChange={(e)=>setNewName(e.target.value)}
                          />
                        <input
                         type="text"
                         className="border border-gray-400 rounded-[4px] p-1 pl-2"
                         defaultValue={brand.abrv}
                         onChange={(e)=>setNewAbrv(e.target.value)} />
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        <button
                         className='border border-yellow-400 rounded-[4px] p-1 px-2 text-yellow-400 hover:text-white hover:bg-yellow-400 transition-all duration-500'
                         onClick={editVehicleCard}
                         >
                            Save
                        </button>
                        <button
                            className='border border-gray-500 rounded-[4px] p-1 px-2 text-gray-500 hover:text-white hover:bg-gray-500 transition-all duration-500'
                            onClick={() => setEditingMode(false)}
                        >Back
                        </button>

                    </div>


                </>

            }


        </div>
    );
}

const VehicleMakeCardObserver = observer(VehicleMakeCard)

export default VehicleMakeCardObserver;