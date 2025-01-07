import Header from "./components/Header";
import Hero from "./components/Hero";
import Range from "./components/Range";
import Products from "./components/Products";
import RoomInspiration from './components/RoomInspiration';
import FuniroFurniture from "./components/FuniroFurniture";

export default function Home() {
  return (
   <div>
    <Header/>
    <Hero/>
    <Range/>
    <Products/>
    <RoomInspiration />
    <FuniroFurniture/>
   </div>
  );
}
