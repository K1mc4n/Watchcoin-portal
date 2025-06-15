import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { createClient } from "@supabase/supabase-js";

// --- Supabase setup ---
const supabaseUrl = "https://eimssxysdgftbtpfnsns.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // <-- amankan di .env nanti
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Tipe artikel dari API ---
type Article = {
  title: string;
  description?: string;
  link: string;
};

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [leaderboard, setLeaderboard] = useState<{ [key: string]: number }>({});
  const { address } = useAccount();

  useEffect(() => {
    sdk.actions.ready();

    fetch("https://newsdata.io/api/1/latest?apikey=pub_26b2c8f1c1854675a583e2ce97569c6b&q=Crypto")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results as Article[];
        setArticles(results);
      })
      .catch((err) => console.error(err));

    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("address, reads")
      .order("reads", { ascending: false });

    if (data) {
      const map: { [key: string]: number } = {};
      data.forEach((item) => {
        map[item.address] = item.reads;
      });
      setLeaderboard(map);
    } else {
      console.error(error);
    }
  };

  const handleRead = async (url: string) => {
    if (!address) return;

    const newReads = (leaderboard[address] || 0) + 1;
    await supabase.from("leaderboard").upsert({ address, reads: newReads });
    fetchLeaderboard();
    window.open(url, "_blank");
  };

  const sortedLeaderboard = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📰 Watchcoin - Read to Earn</h1>
      <ConnectMenu />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">🔥 Leaderboard</h2>
        <ul className="space-y-1 text-sm">
          {sortedLeaderboard.map(([addr, count], idx) => (
            <li key={addr}>
              #{idx + 1} {addr.slice(0, 6)}...{addr.slice(-4)} — {count} reads
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-y-4">
        {articles.map((article, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-gray-800 shadow">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-sm mt-2">{article.description || "Tidak ada deskripsi."}</p>
            <button
              onClick={() => handleRead(article.link)}
              className="mt-2 text-blue-400 hover:underline"
            >
              Baca selengkapnya
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return <div className="text-green-400">Connected: {address}</div>;
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      className="px-4 py-2 bg-blue-600 text-white rounded-xl"
    >
      Connect Wallet
    </button>
  );
}

export default App;
