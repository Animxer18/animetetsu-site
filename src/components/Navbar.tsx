import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <h1 className="text-xl md:text-3xl text-center pt-6 pb-1 font-bold select-none">
        <Link to="/" title="Animetetsu">
          アニメテツ
        </Link>
      </h1>
      <p className="text-sm xs:text-base sm:text-lg md:text-xl text-center pb-6 text-gray-400">
        All your favourites are here...
      </p>
    </>
  );
}
