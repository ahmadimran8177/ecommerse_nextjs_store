import React from 'react'
import { revalidatePath } from "next/cache";
import CategoryPage from '@/app/components/categoryPage/CategoryPage';
// import { DevUrl } from '@/utils/urls';
import prisma from "@/app/lib/prisma";



const CategoriesPage = async ({ params: { slug }, searchParams }) => {

    // const data2 = await serverFetchDataFromApi(`/api/categories?populate=*&[filters][slug][$eq]=${slug}`);
    // const data1 = await serverFetchDataFromApi(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[start]=0&pagination[limit]=6`);
    // const data3 = await serverFetchDataFromApi(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[start]=6&pagination[withCount]=true`);
    // const products = await Promise.all([data2, data1, data3]);
    const params = searchParams?.query || false;

    async function catnamefetch() {
        const res = await prisma.category.findMany({
            where: {
                slug: slug,
            },
            include: {
                relationwithproduct: true,
            },
        });
        revalidatePath(`/pages/category/${slug}`);
        return res;
    }
    async function pronamefetch() {
        const res = await prisma.product.findMany({
            take: 4,
            where: {
                relationslug: slug,
            },
        });
        revalidatePath(`/pages/category/${slug}`);
        return res;
    }
    async function morepronamefetch() {
        const res = await prisma.product.findMany({
            skip: 4,
            where: {
                relationslug: slug,
            },
        });
        revalidatePath(`/pages/category/${slug}`);
        return res;
    }

    const catname = await catnamefetch();
    const proname = await pronamefetch();
    const moreproname = await morepronamefetch();
    const [categoryData, productData, moreproductData] = await Promise.all([catname, proname, moreproname])
    // const { category } = await categoryData.json();
    // const { product } = await productData.json();
    // const { moreproduct } = await moreproductData.json();
    // console.log(categoryData);
    return (
        <CategoryPage data2={categoryData} data1={productData} slug={slug} data3={params && moreproductData} isLessData={params && true} productsLength={categoryData[0]?.relationwithproduct?.length}
        />
    )
}

export default CategoriesPage