"use client";
import Article from "@/types/Article";
import Image from "next/image";
import { useState, FormEvent, useEffect } from "react";
import { useLazyGetSummaryQuery } from "@/services/article";

export default function Demo() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  const [article, setArticle] = useState<Article>({
    url: "",
    summary: "",
  });

  const [getSummary, { isFetching, error }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const localArticles = localStorage.getItem("articles");
    if (localArticles) {
      setAllArticles(JSON.parse(localArticles));
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={(e) => onSubmit(e)}
        >
          <Image
            src="/link.svg"
            alt="link"
            width={20}
            height={20}
            className="absolute left-0 my-2 ml-3 w-5 h-auto"
          />
          <input
            type="url"
            name="url"
            id="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            Go
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.length > 0 &&
            allArticles.map((item) => (
              <div
                key={`link-${item.url}`}
                onClick={() => setArticle(item)}
                className="link_card"
              >
                <div
                  className="copy_btn"
                  onClick={() => navigator.clipboard.writeText(item.url)}
                >
                  <Image
                    src="/copy.svg"
                    alt="copy"
                    className="w-[40%] h-[40%] object-contain"
                    width={10}
                    height={10}
                  />
                </div>
                <p className="flex-1 font-medium text-sm truncate text-blue-600">
                  {item.url}
                </p>
              </div>
            ))}
        </div>

        {/* Display Results */}
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <Image
              src="/loader.svg"
              alt="loading..."
              width={80}
              height={80}
              className="object-contain"
            />
          ) : error ? (
            <p className="font-bold text-black text-center">
              Well, That was not supposed to happen...
              <br />
              <span className="font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-bold text-gray-600">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="text-sm font-medium text-gray-700">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
