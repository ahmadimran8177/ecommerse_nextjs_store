import React from 'react'
import Wrapper from '@/app/components/wrapper/Wrapper'

const CategorySkeleton = () => {
    return (
        <div className='min-h-[400px] flex items-center'>
            <Wrapper>
                <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                        Loading ...
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default CategorySkeleton