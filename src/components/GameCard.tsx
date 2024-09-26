import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";
import EyeIcon from "@components/EyeIcon";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"games">["data"] & { views?: number };
  secHeading?: boolean;
}

export default function GameCard({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, coverImage } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
        {coverImage && (
          <img src={coverImage} alt={title} className="my-4 w-full h-auto max-h-64 object-cover" />
        )}
      </a>
      <p>{description}</p>
      <div className="flex items-center mt-2">
        <EyeIcon />
        <span className="ml-1">{frontmatter.views} views</span>
      </div>
    </li>
  );
}