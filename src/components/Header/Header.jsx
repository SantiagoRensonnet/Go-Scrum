//Libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
//Styles
import "./Header.styles.css";
export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsVisible(false);
    navigate("/", { replace: true });
  };
  return (
    isVisible && (
      <AnimatePresence>
        <motion.div
          className="Header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span>Go Scrum</span>
          <div className="header--close-btn" onClick={handleLogout}>
            x
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
