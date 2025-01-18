"use client"
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { DevUrl } from '@/utils/urls'
import { useDispatch } from 'react-redux';
import { changeSize, changeQuantity, removeItem } from '@/app/redux/cartSlice';
const CartItem = ({ data }) => {

    const dispatch = useDispatch();

    const handleSize = (e) => {
        let payload = {
            id: data?.id,
            size: e.target.value,
        };
        dispatch(changeSize(payload));
    };

    const handleQuantity = (e) => {
        let payload = {
            id: data?.id,
            quantity: e.target.value,
        };
        dispatch(changeQuantity(payload));
    };

    const handleRemove = () => {
        let payload = {
            id: data?.id,
        };
        dispatch(removeItem(payload));
    }

    return (
        <div className="flex py-5 gap-3 md:gap-5 border-b">
            {/* IMAGE START */}
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <Image
                    src={data?.thumbnail}
                    alt={data?.attributes?.name}
                    width={120}
                    height={120}
                />
            </div>
            {/* IMAGE END */}

            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* PRODUCT TITLE */}
                    <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                        {data?.name}
                    </div>

                    {/* PRODUCT SUBTITLE */}
                    <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                        {data?.subtitle}
                    </div>

                    {/* PRODUCT PRICE */}
                    <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                        MRP : Rs{data?.price}
                    </div>
                </div>

                {/* PRODUCT SUBTITLE */}
                <div className="text-md font-medium text-black/[0.5] hidden md:block">
                    {data?.subtitle}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Size:</div>
                            <select className="hover:text-black" onChange={(e) => handleSize(e)} >
                                {data?.size?.data?.map((item, i) => (
                                    <option
                                        value={item?.size}
                                        key={i}
                                        disabled={!item?.enabled ? true : false}
                                        selected={data?.selectedSize === item.size}
                                    >{item?.size}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Quantity:</div>
                            <select
                                className="hover:text-black"
                                onChange={(e) => handleQuantity(e)}
                            >
                                {Array.from({ length: 10 }, (_, i) => i++).map((q, i) => (
                                    <option value={q} selected={data?.quantity === q} key={i}>{q} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <RiDeleteBin6Line
                        onClick={() => { handleRemove() }}
                        className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
                    />
                </div>
            </div>
        </div >
    );
};

export default CartItem;