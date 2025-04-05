import CarList from "../../components/CarList/CarList.jsx";
import FilterForm from "../../components/FilterForm/FilterForm.jsx";
import Header from "../../components/Header/Header.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

export default function CatalogPage() {
  return (
    <>
      <Header />
      <section>
        <FilterForm />
        <CarList />
        <LoadMoreBtn />
      </section>
    </>
  );
}
