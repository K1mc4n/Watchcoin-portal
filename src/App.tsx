import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: "What is the capital of Indonesia?",
    options: ["Bandung", "Surabaya", "Jakarta", "Medan"],
    answer: "Jakarta",
  },
  {
    question: "Who created Ethereum?",
    options: ["Vitalik Buterin", "Satoshi Nakamoto", "Elon Musk", "Brian Armstrong"],
    answer: "Vitalik Buterin",
  },
  {
    question: "What does 'BTC' stand for?",
    options: ["BitConnect", "BitCoin", "Blockchain Coin", "Bitcoin"],
    answer: "Bitcoin",
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS",
  },
  {
    question: "Which company owns YouTube?",
    options: ["Facebook", "Twitter", "Google", "Microsoft"],
    answer: "Google",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "Which year was Bitcoin launched?",
    options: ["2005", "2009", "2011", "2015"],
    answer: "2009",
  },
  {
    question: "Which HTML tag is used to define an image?",
    options: ["<image>", "<img>", "<src>", "<pic>"],
    answer: "<img>",
  },
  {
    question: "What is React primarily used for?",
    options: ["Database design", "Backend APIs", "UI building", "Data encryption"],
    answer: "UI building",
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Protocol Interface",
      "Applied Program Internet",
      "Automatic Processing Integration",
    ],
    answer: "Application Programming Interface",
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      const next = current + 1;
      if (next < questions.length) {
        setCurrent(next);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 800);
  };

  const getOptionClass = (option: string) => {
    if (!selected) return "bg-gray-800 hover:bg-gray-700";
    if (option === questions[current].answer) return "bg-green-600";
    if (option === selected) return "bg-red-600";
    return "bg-gray-800";
  };

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🧠 QuizTime</h1>

      {showResult ? (
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">
            Your Score: {score} / {questions.length}
          </h2>
          <button
            className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setSelected(null);
              setShowResult(false);
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {questions[current].question}
          </h2>
          <ul className="space-y-3">
            {questions[current].options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-2 rounded ${getOptionClass(option)}`}
                  disabled={!!selected}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-400">
            Question {current + 1} of {questions.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
