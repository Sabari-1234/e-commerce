import React from "react";

const ProductCard = () => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="    w-64 h-[29rem]   border-2  rounded-lg p-5 me-5 mb-5 flex flex-col justify-between">
      <img src="./images/products/1.jpg" alt="" className=" h-44" />
      <p className="   text-[1.1rem] font-[600] text-zinc-700 my-2 ">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
        optio dicta laudantium sed
      </p>
      <div className="flex ">
        {stars.map((star) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-star"
            viewBox="0 0 16 16"
            className=" text-yellow-400"
          >
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
          </svg>
        ))}
        <p className=" text-[0.75rem] text-zinc-500  ms-2">(5 Reviews)</p>
      </div>

      <button className=" bg-[#f4b362] py-1 rounded-lg w-full mt-2">
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
