import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss";
import cityVid from "../../assets/city-video.mp4";

const HomePage = () => {
  return (
    <>
      <video autoPlay muted loop className={styles.video}>
        <source src={cityVid} type="video/mp4"></source>
      </video>
      <div className={styles.container}>
        <div className={styles.box}>
          <p className={styles.title}>
            Welcome to <span className={styles.bold}>Urban</span>Sense
          </p>
          <p className={styles.desc}>
            Urban Sense is your comprehensive platform for analyzing and
            understanding the critical factors that affect urban living across
            major Australian cities. The goal is to provide you with real-time
            data and insightful analysis on traffic, pollution, and water
            quality, empowering you to make informed decisions and improve your
            quality of life.
          </p>
        </div>
        <div className={styles.list}>
          <div className={styles.section}>
            <Link to="/traffic" className={styles.link}>
              <p className={styles.section_title}>
                <span className={styles.bold}>Traffic </span>Data
              </p>
            </Link>
            <p className={styles.info}>
              Stay ahead of the congestion with our detailed traffic data
              analysis. Urban Sense tracks traffic speeds, levels, and trends to
              help you navigate the city more efficiently. Whether you're
              planning your daily commute or managing logistics, our traffic
              insights ensure you have the information you need to avoid delays
              and optimize routes.
            </p>
          </div>
          <div className={styles.section}>
            <Link to="/pollution" className={styles.link}>
              <p className={styles.section_title}>
                <span className={styles.bold}>Air </span>Pollution
              </p>
            </Link>
            <p className={styles.info}>
              Monitor the air quality in your city with Urban Sense's pollution
              data. We provide up-to-date information on various pollutants,
              helping you understand the environmental impact on health and
              well-being. Use this data to stay informed about pollution levels
              and take necessary precautions to protect yourself and your loved
              ones.
            </p>
          </div>
          <div className={styles.section}>
            <Link to="/water" className={styles.link}>
              <p className={styles.section_title}>
                <span className={styles.bold}>Water </span>Quality
              </p>
            </Link>
            <p className={styles.info}>
              Ensure the safety and quality of your water supply with our water
              data analysis. Urban Sense tracks water quality metrics, including
              contamination levels and overall safety. Stay informed about the
              water you use for drinking, cooking, and bathing, and make
              informed decisions to ensure your health and safety.
            </p>
          </div>
          <div className={styles.section}>
            <Link to="/energy" className={styles.link}>
              <p className={styles.section_title}>
                <span className={styles.bold}>Energy </span>Consumption
              </p>
            </Link>
            <p className={styles.info}>
              Understand your city's energy consumption patterns with Urban
              Sense's comprehensive energy data. We provide insights into energy
              usage trends, helping you make informed decisions about energy
              efficiency and conservation. Use this data to optimize your energy
              consumption and contribute to a sustainable future.
            </p>
          </div>
        </div>
      </div>
      <p className={styles.copyright}>&copy; iHeslop / 2024</p>
    </>
  );
};
export default HomePage;
