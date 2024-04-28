import React from 'react';
import vehicleMakeStore from '../stores/VehicleMakeStore';

function Pagination({ paginationData, setPageNumber }) {

    const onPageClick = (pageNumber) => {
        setPageNumber(pageNumber)
    }

    return (
        <>
            {!(vehicleMakeStore.getVehicleMakesNumber < 10 && paginationData.CurrentPage == 1) &&
                <div className='flex flex-row gap-x-3 h-10 ml-10 mt-20 mb-20'>
                    {[...Array(paginationData.TotalPages).keys()].map((page, index) => (

                        <div
                            key={index}
                            className={`text-white rounded-[4px] w-10 h-10 flex justify-center items-center  ${paginationData.CurrentPage == index + 1 ? 'bg-gray-500' : 'bg-gray-300'}
                    hover:border-gray-900 hover:border-[3px] cursor-pointer `}
                            onClick={() => onPageClick(index + 1)}
                        >
                            {index + 1}
                        </div>
                    ))
                    }
                </div>
            }

        </>


    );
}

export default Pagination;