import { useContext } from "react";
import { Context } from "./Context"
import Header from "./Header";
import Trends from "./Trends";
import AddPopup from "./AddPopup";

function App() {
  const { isPopupVisible } = useContext(Context)

  return (
    <>
      <div className="h-full relative w-full bg-gray-700">
        <Header  />
    
        <div className="flex lg:flex-col lg:items-center px-4 pb-4 h-full pt-24">
          <div className="flex-grow mr-4 lg:ml-4 ml-14 lg:mb-16 h-max m-auto text-xl">
            <h1 className="text-4xl mb-3 font-semibold">Make your party fun!</h1>
            <p className="mb-8">Create your own custom playlist today.</p>

            <button className="border border-black bg-orange-500 py-2 px-3 rounded-lg m-auto">
              <span>Create playlist</span>
            </button>
          </div>

          <Trends  />
        </div>
      </div>

      {isPopupVisible &&
        <AddPopup />       
      }
    </>
  );
}

export default App;
