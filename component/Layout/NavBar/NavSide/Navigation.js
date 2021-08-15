// @ts-ignore
import styles from "./style.module.css";
import Link from "next/link";
import { useNavBarState } from "../NavBarContext";
import { useTransition, animated } from "react-spring";

const littleLinkList = "about us// contact us// feedback".split("//");

const Navigation = ({
  mainMenu,
  headers,
  title,
  index,
  visible,
  updateSideBar,
  regression,
  sideBarLocation,
}) => {
  const { sideBarIsOpen, toggleNavBar } = useNavBarState();

  console.log(
    `here it is ${title} and I am ${visible ? "visible" : "not visible"}`
  );

  const animate = useTransition(visible, {
    from: {
      transform: "translateX(100%)",
    },
    enter: { transform: "translateX(0%)" },
    leave: { transform: "translateX(100%)" },
  });

  return animate(
    (_styles, visible) => visible && <animated.div
      className={`${styles.navigation} vertical-flex container no-shrink`}
      style={_styles}
    >
      <div className={`${styles.headerSection} flex align-center`}>
        {!mainMenu && (
          <div
            className={`${styles.backArrow} flex center-children`}
            onClick={() => regression()}
          ></div>
        )}

        <h1 className="flex-center">{title}</h1>
        {mainMenu && (
          <div
            className={`${styles.croxSection} flex center-children pointer`}
            onClick={() => toggleNavBar()}
          >
            <div
              className={`${styles.burger} ${sideBarIsOpen && styles.open}`}
            ></div>
          </div>
        )}
      </div>

      <div className={`${styles.linkSection}`}>
        {headers.map(({ label, hasDescendant }) =>
          hasDescendant ? (
            <div
              key={label}
              onClick={() => updateSideBar(label,index)}
              className={`max-width flex pointer align-center ${styles.linkContainer}`}
            >
              {label}
            </div>
          ) : (
            <Link
              key={label}
              href={`/explore?categories=${sideBarLocation
                .slice(1)
                .join("&&")}+${label}`}
            >
              <div
                className={`max-width flex pointer align-center ${styles.linkContainer}`}
              >
                {label}
              </div>
            </Link>
          )
        )}
      </div>

      <div className={styles.footer}>
        <ul>
          {littleLinkList.map((element) => (
            <Link key={element} href="">
              <li>
                <a>{element}</a>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </animated.div>
  );
};

export default Navigation;