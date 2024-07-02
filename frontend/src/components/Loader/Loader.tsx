import styles from "./Loader.module.scss";
import failedImg from "../../assets/failedLoad.png";
import loadImg from "../../assets/loading.gif";
import dataImg from "../../assets/nodata.png";

interface loaderProps {
  fetchStatus: string;
}

const Loader = ({ fetchStatus }: loaderProps) => {
  return (
    <>
      {fetchStatus === "SUCCESS" && (
        <div className={styles.container}>
          <img src={dataImg} alt="logo" className={styles.image_2}></img>
          <p className={styles.text}>...NO DATA...</p>
        </div>
      )}
      {fetchStatus === "LOADING" && (
        <div className={styles.container}>
          <img src={loadImg} alt="logo" className={styles.image}></img>
          <p className={styles.text}>...LOADING...</p>
        </div>
      )}
      {fetchStatus === "FAILED" && (
        <div className={styles.container}>
          <img src={failedImg} alt="logo"></img>
          <p className={styles.text}>...FAILED TO LOAD...</p>
        </div>
      )}
    </>
  );
};

export default Loader;
