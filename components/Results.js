import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/results.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Results = ({ correct, incorrect, unattempted, showAnswers, toggleShowAnswers, questions, selectedOptions, darkMode }) => {
  const totalQuestions = correct + incorrect + unattempted;
  const positiveScore = correct * 1;
  const negativeScore = incorrect * -0.66;
  const totalScore = positiveScore + negativeScore;

  const data = {
    labels: ["Correct", "Incorrect", "Unattempted"],
    datasets: [
      {
        label: "Quiz Results",
        data: [correct, incorrect, unattempted],
        backgroundColor: ["#4CAF50", "#FF6B6B", "#B0B0B0"],
        hoverOffset: 6,
        cutout: "70%",
      },
    ],
  };

  return (
    <div className={`results-page ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h2>Quiz Results</h2>
      <div className="pie-chart">
        <Pie data={data} />
        <div className="score-overlay">
          <p>Score: {totalScore.toFixed(2)}</p>
        </div>
      </div>
      <div className="score-details">
        <div className="score-item">
          <p>Positive:</p>
          <p>{positiveScore}</p>
        </div>
        <div className="score-item">
          <p>Negative:</p>
          <p>{negativeScore}</p>
        </div>
        <div className="score-item">
          <p>Total:</p>
          <p>{totalScore.toFixed(2)}</p>
        </div>
      </div>
      <div className="button-group">
        <button 
          className={`prev-button ${darkMode ? "dark-mode" : "light-mode"}`} 
          onClick={toggleShowAnswers} 
          style={{ backgroundColor: 'grey', color: 'black' }}
        >
          {showAnswers ? "Hide Answers" : "Answers"}
        </button>
        <button 
          className={`next-button ${darkMode ? "dark-mode" : "light-mode"}`} 
          onClick={() => window.location.reload()} 
          style={{ backgroundColor: 'grey', color: 'black' }}
        >
          Retry Quiz
        </button>
      </div>

      {showAnswers && (
        <ul className="answers-list">
          {questions.map((q, index) => (
            <li key={index}>
              <p>Q: {q.question}</p>
              <p>Correct Answer: {q.options[q.answer]}</p>
              <p>Your Answer: {selectedOptions[index] !== null ? q.options[selectedOptions[index]] : "Not Answered"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
