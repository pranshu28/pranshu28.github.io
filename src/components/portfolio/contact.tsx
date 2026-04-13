import Link from "next/link";

interface ContactProps {
  emailUrl: string;
  contactLabel?: string;
  getInTouch?: string;
  contactDescription?: string;
  viaEmail?: string;
}

export default function Contact({
  emailUrl,
  contactLabel = "Contact",
  getInTouch = "Get in Touch",
  contactDescription = "Want to chat? Feel free to reach out",
  viaEmail = "via email",
}: ContactProps) {
  return (
    <div className="mx-auto max-w-lg space-y-4 text-center">
      <p className="text-muted-foreground font-sans text-xs font-medium tracking-[0.2em] uppercase">
        {contactLabel}
      </p>
      <h2 className="font-page-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        {getInTouch}
      </h2>
      <p className="text-muted-foreground font-sans text-center text-sm leading-relaxed md:text-base">
        {contactDescription}{" "}
        <Link
          href={emailUrl}
          className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
        >
          {viaEmail}
        </Link>
        .
      </p>
    </div>
  );
}
