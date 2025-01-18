"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { DevUrl } from '@/utils/urls';
import { getDiscountedPricePercentage } from '@/utils/helper';
const ProductCard = ({ product }) => {
    const onclick = () => {
        window.scrollTo(0, 0);
    }
    return (
        <Link
            href={`/pages/product/${product?.slug}`}
            className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
        >
            <div
                onClick={onclick}
            >
                <Image
                    width={500}
                    height={500}
                    src={product?.thumbnail}
                    alt={product?.name}
                />
                <div className="p-4 text-black/[0.9]">
                    <h2 className="text-lg font-medium">{product?.name}</h2>
                    <div className="flex items-center text-black/[0.5]">
                        <p className="mr-2 text-lg font-semibold">
                            Rs{product?.price}
                        </p>
                        {product?.originalprice && (
                            <>
                                <p className="text-base  font-medium line-through">
                                    Rs{product?.originalprice}
                                </p>
                                <p className="ml-auto text-base font-medium text-green-500">
                                    {getDiscountedPricePercentage(
                                        product?.originalprice,
                                        product?.price
                                    )}
                                    % off
                                </p>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;