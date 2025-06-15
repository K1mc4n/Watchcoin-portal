import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";

type Article = {
  title: string;
  url: string;
  source: string;
  sentiment: string;
  image: string | null;
};

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sdk.actions.ready();

    fetch("https://cryptopanic.com/api/developer/v2/posts/?auth_token=e6bc9cb5897a7964bef35e975108cc7f4c36bdb1")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.results)) {
          const mapped = data.results.map((item: any) => ({
            title: item.title ?? "Untitled",
            url: item.url ?? "#",
            source: item.source?.title ?? "Unknown",
            sentiment: item.sentiment ?? "neutral",
            image: item.metadata?.image ?? null,
          }));
          setArticles(mapped);
        } else {
          setError("Unexpected response format.");
        }
      })
      .catch(() => {
        setError("Failed to fetch articles.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === "bullish") return "text-green-400";
    if (sentiment === "bearish") return "text-red-400";
    return "text-gray-400";
  };

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📰 Watchcoin - Crypto News</h1>

      {loading && <p className="text-gray-400">Loading news...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="space-y-6">
        {articles.map((article, idx) => (
          <div key={idx} className="bg-gray-800 rounded-xl p-4 shadow">
            {article.image && (
              <img src={article.image} alt="thumbnail" className="rounded mb-4 w-full max-h-48 object-cover" />
            )}
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <div className="text-sm mt-1 flex justify-between text-gray-400">
              <span>Source: {article.source}</span>
              <span className={getSentimentColor(article.sentiment)}>
                {article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
              </span>
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-blue-400 hover:underline"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
