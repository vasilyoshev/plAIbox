import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import { selectIsInitialLoad, toggleOffIsInitialLoad } from "slices";
import { AnimatedOutlet } from "utils";
import { initialAnimationDelay } from "consts";
import { useMotionStyle } from "hooks";
import styles from "./ContainerRoute.module.scss";

// eslint-disable-next-line max-len
// https://stackoverflow.com/questions/74190609/exit-animations-with-animatepresence-framer-motion-and-createbrowserrouter-r
// TODO describe how this handles animated transitions between routes in README
export const ContainerRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isInitialLoad = useSelector(selectIsInitialLoad);
  const titleMarginTop = useMotionValue("30px");
  const titleLeft = useMotionValue("50%");
  const titleTransform = useMotionValue("translate(-50%, 0)");
  const titleFontSize = useMotionValue("90px");
  const titleColor = useMotionValue("rgba(255, 255, 255, 1)");
  const initialOpacity = 0;
  const finalOpacity = 1;
  const routeTransitionDuration = 0.3;
  // +0.2 in order to not overlap with background gradient animation
  const initialRouteDelay = initialAnimationDelay + 0.2;
  const transitionRouteDelay = 0.1;
  const titleOpacity = useMotionValue(initialOpacity);
  const regularTextOpacity = useMotionValue(1);
  const { motionStyle } = useMotionStyle();

  const titleStyle = {
    marginTop: titleMarginTop,
    left: titleLeft,
    transform: titleTransform,
    fontSize: titleFontSize,
    opacity: titleOpacity,
    color: titleColor,
  };

  const regularTextStyle = {
    opacity: regularTextOpacity,
  };

  const fancyTextStyle = {
    color: motionStyle.color,
  };

  const variants = {
    hidden: { opacity: initialOpacity, transition: { duration: routeTransitionDuration } },
    // and 0.1 for smooth transition between routes, since 0 sometimes doesn't animate transition
    visible: {
      opacity: finalOpacity,
      transition: {
        duration: routeTransitionDuration,
        delay: isInitialLoad ? initialRouteDelay : transitionRouteDelay,
      },
    },
  };

  useEffect(() => {
    if (isInitialLoad) {
      dispatch(toggleOffIsInitialLoad());
      animate(titleOpacity, finalOpacity, {
        duration: routeTransitionDuration,
        delay: initialRouteDelay,
      });
    }
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/find-the-differences":
        animate(titleMarginTop, "0px", { duration: 0.5 });
        animate(titleLeft, "100%", { duration: 0.5 });
        animate(titleTransform, "translate(-60%, 0)", { duration: 0.5 });
        animate(titleFontSize, "37px", { duration: 0.5 });
        animate(regularTextOpacity, 0, { duration: 0.5 });
        break;
      default:
        animate(titleMarginTop, "30px", { duration: 0.5 });
        animate(titleLeft, "50%", { duration: 0.5 });
        animate(titleTransform, "translate(-50%, 0)", { duration: 0.5 });
        animate(titleFontSize, "70px", { duration: 0.5 });
        animate(titleColor, "white", { duration: 0.5 });
        animate(regularTextOpacity, 1, { duration: 0.5, delay: 0.5 });
    }
  }, [location.pathname]);

  return (
    <>
      {/* TODO describe name transition logic in readme, both for title and pages overall */}
      <motion.span className={styles.name} style={titleStyle}>
        <motion.span style={regularTextStyle}>pl</motion.span>
        <Link to="/" className={styles.homeLink}>
          <motion.span style={fancyTextStyle}>AI</motion.span>
        </Link>
        <motion.span style={regularTextStyle}>box</motion.span>
      </motion.span>
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.outletWrapper} // TODO direct children have common css, extract to parent
          style={{ color: motionStyle.color }}
          key={location.pathname}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <AnimatedOutlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
};
