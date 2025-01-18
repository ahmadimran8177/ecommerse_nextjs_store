"use client"
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { DevUrl } from '@/utils/urls';

const ProductDetailsCarousel = ({ imgs }) => {
    return (
        <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
                {imgs?.image?.map((item, i) => (
                    <img key={i} src={item} alt="Product Detail Images" />
                ))}
            </Carousel>
        </div>
    );
};

export default ProductDetailsCarousel;