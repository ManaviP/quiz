"use client";
import { useState, useEffect } from "react";
import "../styles/quiz.css";
import Navbar from "./Navbar";
import Results from "./Results";

const Quiz = () => {
  const questionsSet1 = [
    {
      question: "What is the capital of India?",
      question_hindi: "भारत की राजधानी क्या है?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      options_hindi: ["मुंबई", "दिल्ली", "कोलकाता", "चेन्नई"],
      answer: 1,
    },
    {
      question: "What is the national animal of India?",
      question_hindi: "भारत का राष्ट्रीय जानवर क्या है?",
      options: ["Lion", "Tiger", "Elephant", "Peacock"],
      options_hindi: ["शेर", "बाघ", "हाथी", "मोर"],
      answer: 1,
    },
    {
      question: "What is 2 + 2?",
      question_hindi: "2 + 2 क्या है?",
      options: ["3", "4", "5", "6"],
      options_hindi: ["3", "4", "5", "6"],
      answer: 1,
    },
  ];

  const questionsSet2 = [
    {
      question: "What is the capital of France?",
      question_hindi: "फ्रांस की राजधानी क्या है?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      options_hindi: ["बर्लिन", "मेड्रिड", "पेरिस", "लिस्बन"],
      answer: 2,
    },
    {
      question: "Who wrote 'Macbeth'?",
      question_hindi: "'मैकबेथ' कौन लिखे थे?",
      options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
      options_hindi: ["चार्ल्स डिकेन्स", "विलियम शेक्सपियर", "लियो टॉल्सटॉय", "मार्क ट्वेन"],
      answer: 1,
    },
    {
      question: "What is 3 + 3?",
      question_hindi: "3 + 3 क्या है?",
      options: ["6", "7", "5", "8"],
      options_hindi: ["6", "7", "5", "8"],
      answer: 0,
    },
  ];

  const [currentSet, setCurrentSet] = useState(1);
  const [questions, setQuestions] = useState(questionsSet1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [darkMode, setDarkMode] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [language, setLanguage] = useState("english");
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    if (isStarted && timer > 0 && !isSubmitted) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsSubmitted(true);
    }
  }, [timer, isSubmitted, isStarted]);

  const handleStartQuiz = () => {
    setIsStarted(true);
  };

  const handleSubmit = () => {
    const confirmation = window.confirm("Are you sure you want to submit?");
    if (confirmation) {
      setIsSubmitted(true);
    }
  };

  const handleOptionChange = (optionIndex) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestion] = optionIndex;
    setSelectedOptions(updatedSelections);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSetChange = (setNumber) => {
    setCurrentSet(setNumber);
    setQuestions(setNumber === 1 ? questionsSet1 : questionsSet2);
    setCurrentQuestion(0);
    setSelectedOptions(Array(questions.length).fill(null));
    setIsSubmitted(false);
    setTimer(60);
  };

  const calculateResults = () => {
    const correctAnswers = selectedOptions.filter((selected, i) => selected === questions[i].answer).length;
    const attempted = selectedOptions.filter((option) => option !== null).length;
    return { correct: correctAnswers, incorrect: attempted - correctAnswers, unattempted: questions.length - attempted };
  };

  const { correct, incorrect, unattempted } = calculateResults();

  const getCircleClass = (index) => {
    if (index === currentQuestion) {
      return "active";
    } else if (selectedOptions[index] !== null) {
      return "selected";
    } else if (selectedOptions[index] === null && index < currentQuestion) {
      return "visited";
    } else {
      return "unvisited";
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "hindi" : "english");
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: "Quiz App",
        url,
      });
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const handleReportSubmit = () => {
    const reportContent = window.confirm("Do you want to report this question?");
    if (confirmation) {
    setShowReport(true); 
    }
  };

  const handleReportCancel = () => {
    setShowReport(false);
  };

  const toggleReport = () => {
    setShowReport(!showReport);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar isStarted={isStarted} isSubmitted={isSubmitted} timer={timer} />

      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)} className="theme-btn">
          {darkMode ? "🌞" : "🌙 "}
        </button>
      </div>

      {!isStarted ? (
        <div className="start-screen">
          <h1>Good Luck!</h1>
          <p>Are you ready to start the quiz?</p>
          <button onClick={handleStartQuiz}>Start</button>
        </div>
      ) : isSubmitted ? (
        <Results
          correct={correct}
          incorrect={incorrect}
          unattempted={unattempted}
          showAnswers={showAnswers}
          toggleShowAnswers={() => setShowAnswers(!showAnswers)}
          questions={questions}
          selectedOptions={selectedOptions}
          darkMode={darkMode}
        />
      ) : (
        <div className="quiz-container">
          <div className="set-options">
            <button onClick={() => handleSetChange(1)}>Set 1</button>
            <button onClick={() => handleSetChange(2)}>Set 2</button>
          </div>

          <div className="share-toggle">
            <button onClick={handleShare} className="share-btn">
              <img src="/share-icon.png" alt="Share" style={{ width: "30px", height: "30px" }} />
            </button>
          </div>

          <div className="language-toggle">
            <button onClick={toggleLanguage} className="language-btn">
              <img
                src={language === "english" ? "/english-icon.png" : "/hindi-icon.png"}
                alt={language === "english" ? "English" : "Hindi"}
                style={{ width: "35px", height: "35px" }}
              />
            </button>
          </div>

          <div className="report-toggle">
            <button onClick={toggleReport} className="report-btn">
              <img src="/report-icon.png" alt="Report" style={{ width: "30px", height: "30px" }} />
            </button>
          </div>

          {!isSubmitted && (
            <div className="progress-bar">
              {questions.map((_, index) => (
                <div key={index} className={`circle ${getCircleClass(index)}`}>
                  <div className="circle-inner">
                    {getCircleClass(index) === "active" && <div className="loading"></div>}
                    {getCircleClass(index) === "selected" && <span className="tick">✔</span>}
                    {getCircleClass(index) === "visited" && <div className="inner-orange"></div>}
                    {getCircleClass(index) === "unvisited" && <div className="inner-grey"></div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {showReport && (
            <div className="report-popup">
              <div className="popup-content">
                <h2>Report this Question</h2>
                <textarea placeholder="Please provide details..." />
                <button onClick={handleReportSubmit}>Submit</button>
                <button onClick={handleReportCancel}>Cancel</button>
              </div>
            </div>
          )}

          <div className="quiz-wrapper">
            <div className="question-container">
              <div className="q"><p>{language === "english" ? questions[currentQuestion].question : questions[currentQuestion].question_hindi}</p></div>
              <div className="options-container">
                {language === "english"
                  ? questions[currentQuestion].options.map((option, index) => (
                      <div
                        key={index}
                        className={`option ${selectedOptions[currentQuestion] === index ? "selected" : ""}`}
                        onClick={() => handleOptionChange(index)}
                        
                      ><span className="circle-label">{String.fromCharCode(65 + index)}</span>
                        {option}
                      </div>
                    ))
                  : questions[currentQuestion].options_hindi.map((option, index) => (
                      <div
                        key={index}
                        className={`option ${selectedOptions[currentQuestion] === index ? "selected" : ""}`}
                        onClick={() => handleOptionChange(index)}
                      ><span className="circle-label">{String.fromCharCode(65 + index)}</span>
                        {option}
                      </div>
                    ))}
              </div>
            </div>

            <div className="navigation">
              <button onClick={handlePrev}>Previous</button>
              <button onClick={handleNext}>Next</button>
              </div><div className="submit">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
