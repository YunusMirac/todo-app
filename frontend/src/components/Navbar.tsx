import { Link } from "react-router-dom";

function HomePageNavbar() {
  return (
    <nav className="bg-stone-50 m-5 p-3 shadow sticky top-0 z-50 rounded-xl container mx-auto max-w-5xl">
      <div className="flex justify-between items-center">
        <Link 
          to={"/"} 
          className="text-2xl font-bold text-slate-700 hover:text-slate-800 transition">
          MY-TODO
        </Link>
        <Link 
          to="/form"
          className="text-lg font-medium text-slate-600 hover:text-slate-800 transition">
          Neues Todo
        </Link>
      </div>
    </nav>
  );
}

export default HomePageNavbar;