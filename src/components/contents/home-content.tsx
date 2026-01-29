import Link from "next/link";
import { Button } from "../ui/button";
import HomeIllustration from "../illustrations/home-illustration";

function HomeContent() {
  return (
    <div className="h-full flex flex-col justify-center">
      <section className="grid grid-cols-[minmax(0,9fr)_minmax(0,11fr)] gap-4 items-center">
        <article className="content">
          <div className="max-w-9/12">
            <h6 className="text-xs">Hello I'm</h6>
            <h1 className="text-4xl -ml-0.5 mb-4 text-primary">Donald Smith</h1>
            <h2 className="text-base mb-1.5">
              Freelance Web & UI/
              <br />
              UX Designer
            </h2>
            <p className="text-xs mb-7">
              Who builds digital experiences that work beautifully and feel
              effortless.
            </p>
            <Button variant="secondary" asChild>
              <Link href="/portfolio" className="menu-nav-link">
                View Portfolio
              </Link>
            </Button>
          </div>
        </article>
        <article className="image">
          <HomeIllustration className="w-full h-auto" />
        </article>
      </section>
    </div>
  );
}

export default HomeContent;
