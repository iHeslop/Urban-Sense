import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p>Home Page</p>
      </div>
      <p className={styles.copyright}>&copy; / 2024</p>
    </div>
  );
};
export default HomePage;
