import Image from "next/image";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

/** Internal hrefs use trailing slash for static export (trailingSlash: true). */
function MarkdownLink({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  if (!href) {
    return <span>{children}</span>;
  }
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:");
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2"
      >
        {children}
      </a>
    );
  }
  let path = href;
  if (path !== "/" && !path.endsWith("/")) {
    path = `${path}/`;
  }
  return (
    <a href={path} className="underline underline-offset-2 hover:no-underline">
      {children}
    </a>
  );
}

interface CustomReactMarkdownProps {
  children: string;
  className?: string;
  /** Avoid wrapping in <p> (e.g. inside <li>) */
  inline?: boolean;
}

// Custom Image component that uses Next.js Image or native img for shields.io
function CustomImage({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null;

  // Use native img tag for shields.io URLs
  if (typeof src === 'string' && src.includes('img.shields.io')) {
    return (
      <img
        src={src as string}
        alt={alt || ""}
        className="object-contain"
      />
    );
  }

  return (
    <Image
      src={src as string}
      alt={alt || ""}
      width={800}
      height={600}
      sizes="(max-width: 768px) 100vw, 768px"
      className="object-contain"
    />
  );
}

const baseComponents: Components = {
  img: CustomImage,
  a: MarkdownLink,
};

export function CustomReactMarkdown({
  children,
  className,
  inline = false,
}: CustomReactMarkdownProps) {
  const components: Components = inline
    ? {
        ...baseComponents,
        p: ({ children: c }) => <span className="inline">{c}</span>,
      }
    : baseComponents;

  return (
    <div className={className}>
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </div>
  );
}
