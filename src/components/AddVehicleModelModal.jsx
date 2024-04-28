import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import vehicleModelStore from '../stores/VehicleModelStore';
import vehicleMakeStore from '../stores/VehicleMakeStore';
import { toJS } from 'mobx';

function AddVehicleModelModal({ isOpen, setIsOpen, refetchPaginatedVehicleModels }) {

    const [name, setName] = useState()
    const [abrv, setAbrv] = useState()
    const [makeId, setMakeId] = useState(1)

    useEffect(()=>{
        vehicleMakeStore.getAllVehicleMakes()
    },[])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding: "30px",
            transform: 'translate(-50%, -50%)',
        },
    };

    const onSave = () => {
        vehicleModelStore.createVehicleModel(name, abrv, makeId)
        refetchPaginatedVehicleModels()
        setIsOpen(false)
        setName("")
        setAbrv("")
    }

    const onCancel = () => {
        setName("")
        setAbrv("")
        setIsOpen(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
        >
            <div className='mb-3'>Type in the informations of the new Vehicle Model</div>

            <div className='mb-3'>
                <div className='text-gray-400'> Name:</div>
                <input
                    type="text"
                    className='w-[200px] h-[50px] border border-gray-400 p-2 pl-4 rounded-[6px]'
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className='mb-6'>
                <div className='text-gray-400'> Abreviation:</div>
                <input
                    type="text"
                    className='w-[200px] h-[50px] border border-gray-400 p-2 pl-4 rounded-[6px]'
                    onChange={(e) => setAbrv(e.target.value)}
                />
            </div>

            <div className='mb-6'>
                <div className='text-gray-400'> Vehicle Make:</div>
               <select name="" id="" className='w-[250px] h-[50px] border border-gray-400 rounded-[4px] pl-2' onChange={(e)=>setMakeId(e.target.value)}>
                        {toJS(vehicleMakeStore).vehicleMakes?.data?.map((make,index)=>(
                             <option value={make.Id} key={make.Id}>{make.Name}</option>
                        ))}
                    </select>
            </div>

            <div className='w-full flex gap-x-2'>
                <button
                    disabled={!name || !abrv}
                    className={`h-[50px] grow text-white ${(!name || !abrv) ? 'bg-gray-400' : 'bg-green-400 hover:bg-green-500'}`}
                    onClick={onSave}>
                    Add
                </button>
                <button
                    className='h-[50px] grow text-white bg-red-400 hover:bg-red-500'
                    onClick={onCancel}
                >
                    Cancel
                </button>

            </div>





        </Modal>
    );
}

export default AddVehicleModelModal;