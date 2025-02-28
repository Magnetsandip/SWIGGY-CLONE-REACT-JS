import React, { useState, useEffect, useRef } from 'react';
import { Card } from './Card';

export const OnlineDelivery = () => {
    const [data, setData] = useState([]);
    const [isAtTop, setIsTop] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const componentsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsTop(!entry.isIntersecting);
            },
            { root: null, threshold: 0, rootMargin: "-50px" }
        );

        if (componentsRef.current) {
            observer.observe(componentsRef.current);
        }

        return () => {
            if (componentsRef.current) {
                observer.unobserve(componentsRef.current);
            }
        };
    }, []);

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
    };

    useEffect(() => {
        fetchTopRestaurant();
    }, []);

    return (
        <div className='max-w-[1200px] mx-auto px-2' ref={componentsRef}>
            <div className='flex my-5 items-center justify-between'>
                <div className='text-[25px] font-bold'>Restaurants with online food delivery in Lucknow</div>
            </div>

            {/* Sticky Header */}
            <div className={`transition-all duration-300 ${isAtTop ? 'shadow-md' : ''}`}>
                <div className='max-w-[1200px] mx-auto flex gap-5 py-3 px-4 text-xl'>
                    <div className='p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-100'>Filter</div>
                    <div className='p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-100'>Sort By</div>
                    <div className='p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-100'>10 Mins Delivery</div>
                </div>
            </div>


            {/* Loading and Error Handling */}
            {loading && <div className='text-center my-10 text-xl'>Loading...</div>}
            {error && <div className='text-center my-10 text-red-500 text-xl'>{error}</div>}

            {/* Grid of Restaurant Cards */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                {
                    data.map((d, i) => (
                        <Card {...d} key={i} />
                    ))
                }
            </div>
        </div>
    );
}
