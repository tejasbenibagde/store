import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

import sofa from "../static/media/sofa.jpg";
import jwellery from "../static/media/jwellery.jpg";
import pc from "../static/media/pc.jpg";

import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaArrowDown } from "react-icons/fa";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      <div className="h-screen w-screen relative flex mt-[12vh] px-7 justify-between gap-5">
        <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden">
          <div className="absolute h-full w-full z-10 p-7 flex flex-col justify-between">
            <div>
              <h1 className="text-black opacity-[0.8] text-md">MORE OFFERS</h1>
              <h1 className="text-black opacity-[0.9] text-7xl mt-7 font-semibold leading-[4.2rem]">
                Their is <br />
                something else
                <br />
                for you
              </h1>
            </div>
            <div className="w-1/3 h-[10vh] bg-black rounded-2xl px-5 py-3 flex items-center justify-between cursor-pointer">
              <div className="w-2/3 h-full flex justify-center flex-col border-r-[1px] border-[#ffffff34]">
                <h1 className="text-[0.7vw] opacity-[0.9]">SHOP</h1>
                <h1 className="text-[1.4vw] opacity-[0.9]">All Products</h1>
              </div>
              <div>
                <HiOutlineShoppingCart size={35} />
              </div>
            </div>
          </div>
          <div className="w-full h-full relative flex items-center justify-center z-[1]">
            <img src={sofa} alt="sofa" className="w-full" />
          </div>
        </div>
        <div className="w-full h-[80vh] flex flex-col gap-5">
          <div className="relative overflow-hidden flex justify-center items-center w-full h-full bg-pink-200 rounded-2xl">
            <img src={pc} alt="sofa" className="w-full" />
            <div className="absolute w-full h-full z-10 p-5">
              <div className="flex justify-between">
                <h1 className="text-md opacity-[0.9]">The world of Infinity</h1>
                <div className="rotate-[-135deg]">
                  <FaArrowDown size={25} />
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-full flex gap-5">
            <div className="relative w-full h-full bg-red-200 rounded-2xl flex items-center justify-center overflow-hidden">
              <img src={jwellery} alt="jwellery" className="w-full absolute" />
            </div>
            <div className="relative w-full h-full bg-red-200 rounded-2xl flex items-center justify-center overflow-hidden">
              <img src={jwellery} alt="jwellery" className="w-full absolute" />
            </div>
          </div>
        </div>
      </div>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
