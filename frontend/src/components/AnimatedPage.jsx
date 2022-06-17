import { motion, AnimatePresence } from "framer-motion";

const animations = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AnimatedPage = ({ children }) => {
  return (
    <AnimatePresence>
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
    </AnimatePresence>
    
  );
};

export default AnimatedPage;