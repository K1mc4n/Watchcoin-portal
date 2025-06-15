import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: "What is the maximum supply of Bitcoin?",
    options: ["21 million", "100 million", "50 million", "Unlimited"],
    answer: "21 million",
  },
  {
    question: "What does DeFi stand for?",
    options: [
      "Decentralized Finance",
      "Defined Finance",
      "Digital Fund",
      "Default Finance",
    ],
    answer: "Decentralized Finance",
  },
  {
    question: "Who created Bitcoin?",
    options: [
      "Vitalik Buterin",
      "Elon Musk",
      "Satoshi Nakamoto",
      "Brian Armstrong",
    ],
    answer: "Satoshi Nakamoto",
  },
  {
    question: "Which blockchain is Ethereum built on?",
    options: ["Ethereum", "Bitcoin", "Solana", "Polygon"],
    answer: "Ethereum",
  },
  {
    question: "What is Farcaster?",
    options: [
      "A web hosting service",
      "A decentralized social protocol",
      "A crypto wallet",
      "An NFT marketplace",
    ],
    answer: "A decentralized social protocol",
  },
  {
    question: "What token is used to pay gas fees on Ethereum?",
    options: ["ETH", "BTC", "USDT", "SOL"],
    answer: "ETH",
  },
  {
    question: "What is a Frame in Farcaster?",
    options: [
      "An image container",
      "An interactive post",
      "A Farcaster wallet",
      "A block explorer",
    ],
    answer: "An interactive post",
  },
  {
    question: "Which protocol does Farcaster use for identity?",
    options: ["ENS", "DID", "Lens", "FID"],
    answer: "FID",
  },
  {
    question: "What does a crypto wallet store?",
    options: [
      "Cryptocurrency balances",
      "Private and public keys",
      "Usernames",
      "Social posts",
    ],
    answer: "Private and public keys",
  },
  {
    question: "Which language is commonly used to write Ethereum smart contracts?",
    options: ["Rust", "Go", "Solidity", "Python"],
    answer: "Solidity",
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
      <h1 className="text-2xl font-bold mb-6">🧠 Crypto & Farcaster Quiz</h1>

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
            Play Again
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
                  className={`w-full text-left px-4 py-2 rounded ${getOptionClass(
                    option
                  )}`}
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
