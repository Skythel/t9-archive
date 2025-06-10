import { motion } from "motion/react";
const TypingIndicator = ({ typers }) => {
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
      &nbsp;
      <span style={{ color: "#404040", textAlign: "left" }}>
        {typers.map((t, index) => {
          if (index === 0) return t;
          return index === typers.length - 1 ? ` and ${t}` : `, ${t}`;
        })}
        {typers.length > 1 ? " are " : " is "}
        typing...
      </span>
    </div>
  );
};
export default TypingIndicator;
