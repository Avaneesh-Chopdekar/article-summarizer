"use client";
import ArticleInput from "@/types/ArticleInput";
import Image from "next/image";
import { useState, FormEvent } from "react";

export default function Demo() {
  const [article, setArticle] = useState<ArticleInput>({
    url: "",
    summary: "",
  });
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Submitted");
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
      </div>
    </section>
  );
}
