import { useContext } from "react";
import { ApiContext } from "../context/ContextProvider";

function Halves() {
  const { assetUrl } = useContext(ApiContext);

  return (
    <div
      className="
        flex flex-col 
        md:flex-row md:overflow-x-auto 
        lg:overflow-x-hidden 
        my-25 w-full h-fit
      "
    >
      <div className="flex-shrink-0 w-full md:w-[70vw] lg:w-[50vw] h-full relative">
        <img
          src={assetUrl("/images/runaway1.jpg")}
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute w-fit bottom-20 left-1/3">
          <h2 className="text-white text-xl">BESTSELLER</h2>
          <div className="w-fit pt-2">
            <p className="text-center text-white">Shop Now</p>
            <div className="h-0.5 bg-white"></div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 w-full md:w-[70vw] lg:w-[50vw] h-full relative border-l lg:border-l">
        <img
          src={assetUrl("/images/runaway2.jpg")}
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute w-fit bottom-20 left-1/3">
          <h2 className="text-white text-xl">TOPS</h2>
          <div className="w-fit pt-2">
            <p className="text-center text-white">Shop Now</p>
            <div className="h-0.5 bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Halves;
