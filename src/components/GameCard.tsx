import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";
import EyeIcon from "@components/EyeIcon";
import Datetime from "./Datetime";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"games">["data"] & { views?: number };
  secHeading?: boolean;
}

export default function GameCard({ href, frontmatter, secHeading = true }: Props) {
  const { title, updateDatetime, description, coverImage } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="flex items-start justify-between"
      >
        {/* Left side: Datetime and description */}
        <div className="flex-1 mr-4">
          {secHeading ? (
            <h2 {...headerProps} className="text-lg font-medium text-skin-accent">
              {title}
            </h2>
          ) : (
            <h3 {...headerProps} className="text-lg font-medium text-skin-accent">
              {title}
            </h3>
          )}
          <Datetime showTime={false} pubDatetime={updateDatetime} modDatetime={undefined} />
          <p className="mt-2">{description}</p>
        </div>
  
        {/* Right side: Image */}
        {coverImage && (
          <img
            src={coverImage}
            alt={title}
            className="w-1/3 h-auto object-cover max-h-64"
          />
        )}
      </a>
    </li>
  );
}