import Link from "next/link";

import { sectionHeadingClass } from "@/lib/page-typography";

interface ContactProps {
  emailUrl: string;
  contactLabel?: string;
  getInTouch?: string;
  contactDescription?: string;
  viaEmail?: string;
}

export default function Contact({
  emailUrl,
  contactLabel = "",
  getInTouch = "Contact",
  contactDescription = "",
  viaEmail = "Email",
}: ContactProps) {
  const label = contactLabel?.trim();
  const description = contactDescription?.trim();

  return (
    <div className="mx-auto max-w-lg space-y-4 text-center">
      {label ? (
        <p className="text-muted-foreground font-sans text-xs font-medium tracking-[0.2em] uppercase">
          {label}
        </p>
      ) : null}
      <h2 className={sectionHeadingClass}>{getInTouch}</h2>
      {description ? (
        <p className="text-muted-foreground font-sans text-center text-sm leading-relaxed md:text-base">
          {description}{" "}
          <Link
            href={emailUrl}
            className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
          >
            {viaEmail}
          </Link>
          .
        </p>
      ) : (
        <p className="text-muted-foreground font-sans text-sm md:text-base">
          <Link
            href={emailUrl}
            className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
          >
            {viaEmail}
          </Link>
        </p>
      )}
    </div>
  );
}
