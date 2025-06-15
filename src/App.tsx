import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";

type Article = {
  title: string;
  url: string;
  source: string;
  image: string | null;
};

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sdk.actions.ready();

    fetch("https://api.coinstats.app/public/v1/news?skip=0&limit=10&category=cryptocurrency")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.news)) {
          const mapped = data.news.map((item: any) => ({
            title: item.title,
            url: item.link,
            source: item.source || "Unknown",
            image: item.imgURL || null,
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

  return (
    <div className="bg-white text-black min-h-screen px-4 py-6 font-sans">
      <header className="flex items-center justify-between border-b pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-400 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
            W
          </div>
          <h1 className="text-xl font-bold">WATCHCOIN</h1>
        </div>
        <nav className="space-x-4 text-sm">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">News</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </header>

      <section className="mb-8">
        <h2 className="text-4xl font-bold leading-snug">Read News While Earning</h2>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Explore
        </button>
      </section>

      {loading && <p className="text-gray-500">Loading news...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article, idx) => (
          <div key={idx} className="border rounded p-4 flex space-x-4 items-start hover:shadow-md transition">
            <div className="w-16 h-16 bg-gray-200 flex-shrink-0 overflow-hidden rounded">
              {article.image ? (
                <img src={article.image} alt="thumbnail" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">📰</div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{article.title}</h3>
              <p className="text-sm text-gray-600">Source: {article.source}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline mt-1 inline-block"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
