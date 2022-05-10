import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const Collapsible = (props) => {
  const { title = "click me", children } = props;
  const [isVisible, setVisible] = useState(false);
  const handleVisible = () => setVisible(!isVisible);
  return (
    <>
      <div onClick={handleVisible} >
        {title}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
          animate={{ y: 100 }}
          transition={{ ease: "easeOut", duration: 2 }}
          style={{overflow:"hidden", height:50}}
          >
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Collapsible;
