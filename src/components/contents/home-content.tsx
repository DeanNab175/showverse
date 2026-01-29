import Link from "next/link";
import { Button } from "../ui/button";
import HomeIllustration from "../illustrations/home-illustration";

function HomeContent() {
  return (
    <section className="grid grid-cols-[minmax(45%,_1fr)_minmax(55%,_1fr)]">
      <article className="content">
        <h6>Hello I'm</h6>
        <h1>Donald Smith</h1>
        <h2>Freelance Web & UI/UX Designer</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at
          porta turpis.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/portfolio" className="menu-nav-link">
            View Portfolio
          </Link>
        </Button>
      </article>
      <article className="image">
        <HomeIllustration className="w-full h-auto" />
      </article>
    </section>
  );
}

export default HomeContent;
