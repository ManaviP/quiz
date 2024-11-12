import React from "react";
import { useTheme } from "next-themes";

const Navbar = ({ isStarted, isSubmitted, timer }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <nav
      className={theme === "dark" ? "dark" : "light"}
      style={styles.nav}
    >
      <h2 style={styles.brand}>Quiz 20</h2>
      <div style={styles.timerContainer}>
        <span style={styles.timer}>
          {isStarted && !isSubmitted ? `${timer}s` : "⏰"}
        </span>
      </div>
    </nav>
    
  );
};

const styles = {
  
  nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    position: "relative",
    backgroundColor: "#333", // Set greyish black background
    color: "#fff", // White text for contrast
  },
  brand: {
    fontSize: "2rem",
    position: "absolute",
    left: "10px",
  },
  timerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1px",
    borderRadius: "5px", // Rounded corners for the box
    backgroundColor: "#fff", // White background for the timer box
    width: "30px", // Width of the timer box
    height: "30px", // Height of the timer box
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Optional shadow effect for depth
  },
  timer: {
    fontSize: "15px",
    textAlign: "center",
    color: "#333", // Dark text for contrast inside the white box
  },
  toggleButton: {
    marginLeft: "10px",
    padding: "0.5rem 1rem",
    border: "1px solid currentColor",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "1.2rem",
    transition: "background-color 0.3s ease, color 0.3s ease",
    zIndex: 10,
    pointerEvents: "auto",
  },
};
const mediaStyles = `
  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem; // Adjust font size for smaller screens
      left: 5px;
    }
    .timerContainer {
      width: 100px;
      height: 45px;
    }
    .toggleButton {
      font-size: 0.9rem;
      padding: 0.3rem 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .nav {
      flex-direction: column;
      align-items: center;
    }
    h2 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      position: static;
    }
    .timerContainer {
      width: 90px;
      height: 40px;
    }
    .toggleButton {
      font-size: 0.8rem;
      padding: 0.2rem 0.6rem;
    }
  }
`;

export default Navbar;
