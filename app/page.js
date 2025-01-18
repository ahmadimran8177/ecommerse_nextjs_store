import Banner from "./components/banner/Banner";
import Wrapper from "./components/wrapper/Wrapper";
import ProductCard from "./components/productCard/ProductCard";
// import { staticFetchDataFromApi } from "@/utils/api";
// import { DevUrl } from "@/utils/urls";
import prisma from "@/app/lib/prisma";

const Home = async () => {
  // const data = await fetch(`${DevUrl}/api/products`);
  // const { products } = await data.json();
  // const products = await staticFetchDataFromApi("/api/products?populate=*&pagination[start]=0&pagination[limit]=6");

  async function getProducts() {
    const res = await prisma.product.findMany({ take: 6 });
    return res;
  }

  const products = await getProducts();
  // console.log(products);

  return (
    <main>
      <Banner />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.map((item) => {
            return <ProductCard key={item?.id} product={item} />;
          })}
        </div>
        {/* products grid end */}
      </Wrapper>
    </main>
  );
};

export default Home;
