import cityVid from "../../assets/city-video.mp4";
import styles from "./EnergyPage.module.scss";

const EnergyPage = () => {
  return (
    <>
      <video autoPlay muted loop className={styles.video}>
        <source src={cityVid} type="video/mp4"></source>
      </video>
      <div className={styles.container}>
        <div className={styles.box}>
          <p className={styles.title}>
            <span className={styles.bold}>Energy</span>Consumption
          </p>
          <p className={styles.info}>...Under Construction...</p>
        </div>
      </div>
    </>
  );
};
export default EnergyPage;
