import React, { useState } from 'react';
import Modal from 'react-modal';
import vehicleMakeStore from '../stores/VehicleMakeStore';
import { toJS } from 'mobx';

function AddVehicleMakeModal({ isOpen, setIsOpen, flag, setFlag, refetchPaginatedVehicleMakes }) {

    const [name, setName] = useState()
    const [abrv, setAbrv] = useState()

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
        vehicleMakeStore.createVehicleMake(name, abrv)
        refetchPaginatedVehicleMakes()
        setName("")
        setAbrv("")
        setIsOpen(false)
        setFlag(!flag)
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
            <div className='mb-3'>Type in the informations of the Vehicle make you want to create</div>

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

export default AddVehicleMakeModal;