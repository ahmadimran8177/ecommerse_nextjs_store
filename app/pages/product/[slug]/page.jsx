import React from 'react';
// import { DevUrl } from '@/utils/urls';
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
// import { serverFetchDataFromApi } from '@/utils/api';
import ExtraProPage from '@/app/components/extrapropage/ExtraProPage'



const SingleProductPage = async ({ params: { slug } }) => {
    // const { data } = await serverFetchDataFromApi(`/api/products?populate=*&[filters][slug][$eq]=${slug}`);
    // const data = await fetch(`${DevUrl}/api/singleproduct/${slug}`);
    // const { product } = await data.json();

    async function getProduct() {
        const res = await prisma.product.findMany({
            where: {
                slug: slug,
            },
        });
        revalidatePath(`/pages/product/${slug}`);
        return res;
    }

    const product = await getProduct();
    const extraproslug = product[0]?.relationslug;
    return (
        <ExtraProPage
            product={product} slug={slug} extraproslug={extraproslug}
        />
    )
}

export default SingleProductPage