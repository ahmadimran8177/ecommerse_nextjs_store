// "use client"
import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
// import {staticFetchDataFromApi} from '@/utils/api';


const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/pages/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/pages/contact" },
];

// const subMenuData = [
//     { id: 1, name: "Jordan", doc_count: 11 },
//     { id: 2, name: "Sneakers", doc_count: 8 },
//     { id: 3, name: "Running shoes", doc_count: 64 },
//     { id: 4, name: "Football shoes", doc_count: 107 },
// ];

const MenuMobile = ({
    showCatMenu,
    setShowCatMenu,
    setMobileMenu,
    categories
}) => {
    // const { data } = await staticFetchDataFromApi("/api/categories?populate=*");
    const cat = categories;

    return (
        <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
            {data.map((item) => {
                return (
                    <React.Fragment key={item.id}>
                        {!!item?.subMenu ? (
                            <li
                                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                            >
                                <div className="flex justify-between items-center"
                                    onClick={() => {
                                        // console.log(showCatMenu);
                                        setShowCatMenu(!showCatMenu);
                                        // console.log(showCatMenu);
                                    }}
                                >
                                    {item.name}
                                    <BsChevronDown size={14} />
                                </div>

                                {showCatMenu && (
                                    <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                                        {cat?.map(
                                            (item) => {
                                                return (
                                                    <Link
                                                        key={item?.id}
                                                        href={`/pages/category/${item?.slug}`}
                                                        onClick={() => {
                                                            setShowCatMenu(
                                                                false
                                                            );
                                                            setMobileMenu(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        <li className="py-4 px-8 border-t flex justify-between">
                                                            {item?.name}
                                                            <span className="opacity-50 text-sm">
                                                                {`(${item?.relationwithproduct?.length})`}
                                                            </span>
                                                        </li>
                                                    </Link>
                                                );
                                            }
                                        )}
                                    </ul>
                                )}
                            </li>
                        ) : (
                            <li className="py-4 px-5 border-b">
                                <Link
                                    href={item?.url}
                                    onClick={() => setMobileMenu(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        )}
                    </React.Fragment>
                );
            })}
        </ul>
    );
};

export default MenuMobile;