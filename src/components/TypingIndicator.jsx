
import { motion } from "motion/react";
const TypingIndicator = () => {
  const colors = ["#555", "#999", "#bbb", "#999", "#555"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        borderRadius: "18px",
        width: "fit-content",
      }}
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={`dots${index}`}
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#888",
            borderRadius: "50%",
            margin: "0 2px",
          }}
          animate={{
            backgroundColor: colors,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: index * 0.3,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
export default TypingIndicator;
