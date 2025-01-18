"use client"
import React, { useState, useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/app/components/wrapper/Wrapper";
import ProductDetailsCarousel from "@/app/components/productDetailsCarousel/ProductDetailsCarousel";
import RelatedProducts from '@/app/components/relatedProducts/RelatedProducts';
import { getDiscountedPricePercentage } from '@/utils/helper';
// import ReactMarkdown from "react-markdown";
// import { fetchDataFromApi } from '@/utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SingleProduct = ({ data, extrapro }) => {
    const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);
    const [products, setProducts] = useState();
    const dispatch = useDispatch();


    const getData = () => {
        const extraprofilter = extrapro.filter((item) => item.id !== data[0]?.id);
        setProducts(extraprofilter);
    }
    useEffect(() => {
        getData();
    }, [])

    // console.log(products);

    const notify = () =>
        toast.success('Success. Check your Cart!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });


    return (
        <div className="w-full md:py-10">
            <ToastContainer />
            <Wrapper>
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    {/* left column start */}
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                        <ProductDetailsCarousel imgs={data[0]} />
                    </div>
                    {/* left column end */}

                    {/* right column start */}
                    <div className="flex-[1] py-3">
                        {/* PRODUCT TITLE */}
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            {data[0]?.name}
                        </div>

                        {/* PRODUCT SUBTITLE */}
                        <div className="text-lg font-semibold mb-5">
                            {data[0]?.subtitle}
                        </div>

                        {/* PRODUCT PRICE */}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                MRP : Rs{data[0]?.price}
                            </p>
                            {/* <p className="text-base  font-medium line-through">
                                        Rs456
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        30% off
                                    </p> */}
                            {/* {data?.data[0].attributes?.original_price && ( */}
                            <>
                                <p className="text-base  font-medium line-through">
                                    Rs{data[0]?.originalprice}
                                </p>
                                <p className="ml-auto text-base font-medium text-green-500">
                                    {getDiscountedPricePercentage(
                                        data[0]?.originalprice,
                                        data[0]?.price
                                    )}
                                    % off
                                </p>
                            </>
                            {/* )} */}
                        </div>

                        <div className="text-md font-medium text-black/[0.5]">
                            incl. of taxes
                        </div>
                        <div className="text-md font-medium text-black/[0.5] mb-10">
                            {`(Also includes all applicable duties)`}
                        </div>

                        {/* PRODUCT SIZE RANGE START */}
                        <div className="mb-10">
                            {/* HEADING START */}
                            <div className="flex justify-between mb-2">
                                <div className="text-md font-semibold">
                                    Select Size
                                </div>
                                {/* <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                            Select Guide
                                        </div> */}
                            </div>
                            {/* HEADING END */}

                            {/* SIZE START */}
                            <div
                                id="sizesGrid"
                                className="grid grid-cols-3 gap-2"
                            >
                                {data[0]?.size?.data?.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`border rounded-md text-center py-3 font-medium ${item.enabled
                                            ? "hover:border-black cursor-pointer"
                                            : "cursor-not-allowed bg-black/[0.1] opacity-50"
                                            } ${selectedSize === item.size
                                                ? "border-black"
                                                : ""
                                            }`}
                                        onClick={() => {
                                            setSelectedSize(item.size);
                                            setShowError(false);
                                        }}>
                                        {item?.size}
                                    </div>
                                ))}

                            </div>
                            {/* SIZE END */}

                            {/* SHOW ERROR START */}
                            {showError && (
                                <div className="text-red-600 mt-1">
                                    Size selection is required
                                </div>
                            )}
                            {/* SHOW ERROR END */}
                        </div>
                        {/* PRODUCT SIZE RANGE END */}

                        {/* ADD TO CART BUTTON START */}
                        <button
                            className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75" onClick={() => {
                                if (!selectedSize) {
                                    setShowError(true);
                                    document
                                        .getElementById("sizesGrid")
                                        .scrollIntoView({
                                            block: "center",
                                            behavior: "smooth",
                                        });
                                } else {
                                    dispatch(addToCart({
                                        ...data[0], selectedSize, oneQuantityPrice: data[0]?.price
                                    }));
                                    notify();
                                }
                            }}
                        >

                            Add to Cart
                        </button>
                        {/* ADD TO CART BUTTON END */}

                        {/* WHISHLIST BUTTON START */}
                        <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                            Whishlist
                            <IoMdHeartEmpty size={20} />
                        </button>
                        {/* WHISHLIST BUTTON END */}

                        <div>
                            <div className="text-lg font-bold mb-5">
                                Product Details
                            </div>
                            <div className="markdown text-md mb-5">
                                {data[0]?.description}
                            </div>
                        </div>
                    </div>
                    {/* right column end */}
                </div>

                <RelatedProducts products={products} />
            </Wrapper >
        </div >
        // <div></div>
    );
};

export default SingleProduct;
