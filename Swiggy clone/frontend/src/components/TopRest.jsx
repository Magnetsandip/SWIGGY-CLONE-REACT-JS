import React, { useEffect, useState, useRef } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Card } from './Card';

export const TopRest = () => {
    const [slide, setSlide] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ref to measure card width
    const cardRef = useRef(null);

    const fetchTopRestaurant = async () => {
        try {
            const response = await fetch('http://localhost:5000/top-restaurant-chains');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const apiData = await response.json();
            setData(apiData);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch top restaurant chains");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTopRestaurant();
    }, []);

    // Calculate the width of the card dynamically
    const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 283;
    const maxSlide = data.length - 4;

    const nextSlide = () => {
        if (slide < maxSlide) {
            setSlide(slide + 1);
        }
    }

    const prevSlide = () => {
        if (slide > 0) {
            setSlide(slide - 1);
        }
    }

    return (
        <div className='max-w-[1200px] mx-auto px-2'>
            <div className='flex my-5 items-center justify-between'>
                <div className='text-[25px] font-bold'>Top restaurant chains in Lucknow</div>
                <div className='flex'>
                    <div
                        className={`cursor-pointer flex justify-center items-center w-[30px] h-[30px] 
                        rounded-full mx-2 ${slide === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#e2e2e7]'}`}
                        onClick={prevSlide}
                    >
                        <FaArrowLeft />
                    </div>
                    <div
                        className={`cursor-pointer flex justify-center items-center w-[30px] h-[30px] 
                        rounded-full mx-2 ${slide === maxSlide ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#e2e2e7]'}`}
                        onClick={nextSlide}
                    >
                        <FaArrowRight />
                    </div>
                </div>
            </div>

            {/* Loading and Error Handling */}
            {loading && <div className='text-center my-10 text-xl'>Loading...</div>}
            {error && <div className='text-center my-10 text-red-500 text-xl'>{error}</div>}

            <div className='overflow-hidden'>
                <div className='flex gap-5 transition-transform duration-300 ease-in-out'
                    style={{ transform: `translateX(-${slide * (cardWidth + 20)}px)` }}>
                    {
                        data.map((d, i) => (
                            <div ref={cardRef} key={i} className='w-[283px] shrink-0'>
                                <Card width="w-full md:w-[273px]" {...d} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <hr className='my-4 border-[1px]' />
        </div>
    )
}
