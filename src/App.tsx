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

    fetch("https://newsdata.io/api/1/latest?apikey=pub_26b2c8f1c1854675a583e2ce97569c6b&q=Crypto")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.results)) {
          const mappedArticles = data.results.map((item: any) => ({
            title: item.title || "No title",
            description: item.description || "No description",
            link: item.link || "#",
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
