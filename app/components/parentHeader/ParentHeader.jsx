import React from 'react'
import Header from '@/app/components/header/Header';
// import { DevUrl } from '@/utils/urls';
// import { staticFetchDataFromApi } from "@/utils/api";
import prisma from '@/app/lib/prisma';

async function getCategories() {
    const res = await prisma.category.findMany({
        include: {
            relationwithproduct: true,
        },
    });
    return res;
}


const ParentHeader = async () => {
    // const { data } = await staticFetchDataFromApi("/api/categories?populate=*");
    // const data = await fetch(`${DevUrl}/api/categories`);
    // const categories = await data.json();
    const categories = await getCategories();
    return (
        <Header categoryData={categories}
        />
    )
}

export default ParentHeader;

export const revalidate = 60;