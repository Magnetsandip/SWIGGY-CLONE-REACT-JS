import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export const Category = () => {
    const [slide, setSlide] = useState(0);
    const [categories, setCategory] = useState([]);

    const fetchCategory = async () => {
        try {
            const response = await fetch("http://localhost:5000/categories");
            const data = await response.json();
            setCategory(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    // Number of items visible at once
    const itemsPerPage = 8;

    const nextSlide = () => {
        if (slide < categories.length - itemsPerPage) {
            setSlide(slide + 3); // Move 3 items per click
        }
    };

    const prevSlide = () => {
        if (slide > 0) {
            setSlide(slide - 3);
        }
    };

    return (
        <div className='max-w-[1200px] mx-auto px-2'>
            <div className='flex my-5 items-center justify-between'>
                <div className='text-[25px] font-bold'>What's on your mind?</div>
                <div className='flex'>
                    <div className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2' onClick={prevSlide}>
                        <FaArrowLeft />
                    </div>
                    <div className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2' onClick={nextSlide}>
                        <FaArrowRight />
                    </div>
                </div>
            </div>

            <div className='overflow-hidden'>
                <div className='flex duration-500' style={{ transform: `translateX(-${slide * 150}px)` }}>
                    {
                        categories.map((cat, index) => (
                            <div key={index} className='w-[150px] shrink-0 p-2'>
                                <img
                                    src={`http://localhost:5000/images/${cat.image}`}
                                    alt={cat.name || `Category ${index + 1}`}
                                    className='w-full rounded-md object-cover'
                                />
                            </div>
                        ))
                    }
                </div>
            </div>

            <hr className='my-6 border-[1px]' />
        </div>
    );
}
