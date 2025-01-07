import Header from "../components/Header";
import PageHero from "../components/Page-Hero";
import ShopFilter from "../components/Shop-Filter";

export default function Shop() {
    return (
        <div>
             <Header/>
             <PageHero title="Shop"/>
             <ShopFilter/>
        </div>
       
    )
}