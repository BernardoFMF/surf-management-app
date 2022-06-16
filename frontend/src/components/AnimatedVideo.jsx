import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
};

const AnimatedVideo = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ ease: "easeOut", duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedVideo;