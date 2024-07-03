import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import logo from "../../assets/UrbanLogoSquare.png";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box_title}>
        <img src={logo} alt="logo" className={styles.image}></img>
        <NavLink to="/" className={styles.title}>
          <span className={styles.bold}>Urban</span>Sense
        </NavLink>
      </div>
      <div className={styles.box}>
        <NavLink
          to="/traffic"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          TRAFFIC DATA
        </NavLink>
        <NavLink
          to="/pollution"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          AIR QUALITY
        </NavLink>
        {/* <NavLink
          to="/water"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          WATER USAGE
        </NavLink>
        <NavLink
          to="/energy"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          ENERGY CONSUMPTION
        </NavLink> */}
      </div>
    </div>
  );
};

export default NavBar;
