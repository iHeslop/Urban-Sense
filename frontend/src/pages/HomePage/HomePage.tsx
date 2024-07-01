import styles from "./HomePage.module.scss";
import ResultsGraphLoader from "../../components/GraphLoader/GraphLoader";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p>Home Page</p>
        <ResultsGraphLoader dataType="Sydney"/>
      </div>
      <p className={styles.copyright}>&copy; / 2024</p>
    </div>
  );
};
export default HomePage;
