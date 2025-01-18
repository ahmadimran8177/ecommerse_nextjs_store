import React from 'react'
import { revalidatePath } from "next/cache";
import SingleProduct from '@/app/components/singleProduct/SingleProduct';
import prisma from '@/app/lib/prisma';
// import { DevUrl } from '@/utils/urls';


const ExtraProPage = async ({ product, slug, extraproslug }) => {
    // const data = await fetch(`${DevUrl}/api/relatedproduct/${extraproslug}`);
    // const { relatedproduct } = await data.json();

    async function getRelatedProduct() {
        const res = await prisma.product.findMany({
            where: {
                relationslug: extraproslug,
            },
        });
        revalidatePath(`/pages/product/${slug}`);
        return res;
    }
    const relatedproduct = await getRelatedProduct();

    return (
        <SingleProduct data={product} slug={slug}
            extrapro={relatedproduct}
        />
    )
}

export default ExtraProPage