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
          const mapped = data.results.map((item: any) => {
            const url =
              item.metadata?.original_url ||
              item.domain_link ||
              item.url ||
              "#";
            return {
              title: item.title ?? "Untitled",
              url: url.startsWith("http") ? url : "#",
              source: item.source?.title ?? "Unknown",
              sentiment: item.sentiment ?? "neutral",
              image: item.metadata?.image ?? null,
            };
          });
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-400 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">W</div>
          <span className="text-lg font-bold">WATCHCOIN</span>
        </div>
        <nav className="space-x-6 text-sm font-medium">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">News</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Read News While Earning</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Explore
        </button>
      </section>

      {/* Articles */}
      <main className="px-4 md:px-8 pb-10">
        {loading && <p className="text-gray-500 text-center">Loading news...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border rounded-xl p-4 hover:shadow-lg transition flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                {article.image ? (
                  <img src={article.image} alt="thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-gray-400 text-xl">📰</div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-lg leading-tight">{article.title}</h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  Source: {article.source}
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
