import Image from "next/image";

export default function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={112}
          height={112}
          className="w-28 h-auto object-contain"
        />
        <a
          type="button"
          href="https://github.com/Avaneesh-Chopdekar"
          className="black_btn"
        >
          Github
        </a>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT Model</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with this, This is an open source article
        summarizer that transforms lengthy articles to clear and concise
        summaries.
      </h2>
    </header>
  );
}
