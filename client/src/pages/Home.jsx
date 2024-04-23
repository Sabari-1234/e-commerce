import React from "react";
import ProductCard from "../components/ProductCard";
import MetaData from "../components/layouts/MetaData";

function Home() {
  const products = [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <MetaData title={"home"} />
      <p className=" text-4xl font-bold m-4"> Latest Products</p>
      <div className=" flex px-44  justify-center   flex-wrap">
        {products.map((product) => (
          <ProductCard />
        ))}
      </div>
    </>
  );
}

export default Home;
