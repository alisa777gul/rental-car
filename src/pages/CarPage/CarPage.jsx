import CarList from "../../components/CarList/CarList.jsx";
import Header from "../../components/Header/Header.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

export default function CarPage() {
  return (
    <>
      <Header />
      <section>
        <CarList />
        <LoadMoreBtn />
      </section>
    </>
  );
}
