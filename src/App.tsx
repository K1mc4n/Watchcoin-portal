import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";

// Tipe untuk artikel
type Article = {
  title: string;
  description?: string;
  link: string;
};

function App() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    sdk.actions.ready();

    fetch("https://cryptopanic.com/api/v1/posts/?auth_token=e6bc9cb5897a7964bef35e975108cc7f4c36bdb1&filter=important&currencies=BTC,ETH")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.results)) {
          const mappedArticles = data.results.map((item: any) => ({
            title: item.title || "No title",
            description: item.domain || item.source?.title || "No description",
            link: item.url || "#",
          }));
          setArticles(mappedArticles);
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((err) => console.error("Fetch articles error:", err));
  }, []);

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📰 Watchcoin - Crypto News</h1>

      <div className="space-y-4">
        {articles.map((article, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-gray-800 shadow">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-sm mt-2">{article.description}</p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-blue-400 hover:underline"
            >
              Baca selengkapnya
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
