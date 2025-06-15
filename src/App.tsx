import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";

type Article = {
  title: string;
  description?: string;
  link: string;
  image?: string;
};

function App() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    sdk.actions.ready();

    fetch("https://cryptopanic.com/api/developer/v2/posts/?auth_token=e6bc9cb5897a7964bef35e975108cc7f4c36bdb1")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.results)) {
          const mappedArticles = data.results.map((item: any) => ({
            title: item.title || "No title",
            description: item.summary || item.domain || "No description",
            link: item.url || "#",
            image: item.thumbnail || "", // optional image
          }));
          setArticles(mappedArticles);
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((err) => console.error("Fetch articles error:", err));
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans text-black">
      {/* Navigation */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-400 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">W</div>
          <span className="font-bold text-lg">WATCHCOIN</span>
        </div>
        <nav className="space-x-6 font-medium text-gray-700">
          <a href="#" className="hover:text-black">Home</a>
          <a href="#" className="hover:text-black">News</a>
          <a href="#" className="hover:text-black">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-10 px-4">
        <h1 className="text-4xl font-bold mb-4">Read News While Earning</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Explore</button>
      </section>

      {/* News Grid */}
      <section className="px-4 pb-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {articles.map((article, idx) => (
          <div key={idx} className="border rounded-lg p-4 flex space-x-4 hover:shadow transition">
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center overflow-hidden rounded">
              {article.image ? (
                <img src={article.image} alt="thumb" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">💰</span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{article.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{article.description}</p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm mt-2 inline-block hover:underline"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
