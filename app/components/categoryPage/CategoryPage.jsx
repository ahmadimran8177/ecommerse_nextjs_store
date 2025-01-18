"use client"
import React from 'react'
import { DevUrl } from '@/utils/urls';
import Wrapper from '@/app/components/wrapper/Wrapper';
import ProductCard from '@/app/components/productCard/ProductCard';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import prisma from '@/app/lib/prisma';
import { useEffect } from 'react';


const CategoryPage = ({ data1, data2, productsLength, data3, isLessData }) => {

    // console.log(data3);

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const handleClick = () => {
        const params = new URLSearchParams(searchParams);
        params.set('query', "more-results");
        replace(`${pathName}?${params.toString()}`);
    }

    return (
        <Wrapper>
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                    {data2[0]?.name}
                </div>
            </div>

            {/* products grid start */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                {/* {data1?.data?.data?.map((item) => ( */}
                {data1?.map((item) => (
                    <ProductCard key={item?.id} product={item} />
                ))}
                {isLessData && (data3?.map((item) => (
                    <ProductCard key={item?.id} product={item} />
                )))}
            </div>
            {/* products grid end */}
            {productsLength > 4 && (isLessData || (<div className='flex items-center justify-center mb-7'><button onClick={handleClick} className='rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500'>Show More</button></div>))}
        </Wrapper>
    )
}

export default CategoryPage;