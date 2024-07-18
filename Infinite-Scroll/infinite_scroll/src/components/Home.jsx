import React from "react";
import useImgInfo from "../contexts/ImgContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { query, setQuery, setLoading } = useImgInfo();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-transparent bg-clip-text bg-custom-gradient text-7xl mb-24">
        Scroll infinitely watching what you wish{" "}
      </h1>
      <form
        className="w-full px-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          navigate("/images");
          // console.log(query);
        }}
      >
        <div className="w-full h-screen bg-neutral-800 flex flex-col gap-y-3 p-4">
          <div className="text-4xl mb-5 translate-x-1/3 font-semibold text-orange-600">
            What do you like to see now?
          </div>
          <input
            type="text"
            value={query}
            placeholder=" Enter your wish"
            className="rounded-xl h-8 w-1/4 ml-96 "
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default Home;
