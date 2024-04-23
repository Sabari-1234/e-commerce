import React from "react";

const Header = () => {
  return (
    <div className=" bg-[#26303f] py-3 px-6 flex items-center justify-between sticky top-0">
      <div>
        <img src="./images/logo.png" alt="" className="  w-36" />
      </div>

      <div className=" flex ">
        <input type="text" className=" w-[400px] rounded-l-lg h-8" />
        <div className=" bg-[#f4b362] p-2 w-fit h-fit rounded-r-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
            className=" bg-[#f4b362] "
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
      </div>
      <div className=" flex items-center">
        <button className=" bg-[#f4b362] py-1 px-5 rounded-lg me-3">
          Login
        </button>
        <p className=" text-white font-[500] me-1">Cart</p>
        <p className=" bg-[#f4b362] w-fit px-1 rounded-md  h-fit">2</p>
      </div>
    </div>
  );
};

export default Header;
