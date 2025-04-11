import Header from "../../components/Header/Header.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <section className={styles.home}>
        <Hero />
      </section>
    </>
  );
}
