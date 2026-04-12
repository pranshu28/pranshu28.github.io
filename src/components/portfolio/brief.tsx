import Image from "next/image";

export default function Brief({
  name,
  firstName,
  surname,
  subtitle,
  description,
  avatarUrl,
  className = "",
  locale,
}: {
  name: string;
  firstName?: string;
  surname?: string;
  subtitle: string;
  description: string;
  avatarUrl: string;
  className?: string;
  locale?: string;
}) {
  // For Chinese locale, display surname first (姓在前)
  const isChinese = locale === "zh";

  return (
    <div
      className={`flex flex-col-reverse items-center justify-center gap-6 sm:flex-row sm:justify-between md:gap-8 lg:gap-10 ${className || ""}`}
    >
      <div className="flex flex-1 flex-col items-center space-y-1.5 text-center sm:items-start sm:text-left">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          {firstName && surname ? (
            isChinese ? (
              `${surname}${firstName}`
            ) : (
              <>
                <span>{firstName}</span>{" "}
                <span className="inline-block w-1"></span>
                <span>{surname}</span>
              </>
            )
          ) : (
            name
          )}
        </h1>
        {subtitle ? (
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        ) : null}
        <p className="max-w-[600px] whitespace-pre-line md:text-xl">
          {description}
        </p>
      </div>
      <div className="relative isolate w-full shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm sm:max-w-[min(100%,22rem)] md:max-w-[min(100%,26rem)] h-[min(48svh,420px)] sm:h-[min(52svh,440px)]">
        <Image
          src={avatarUrl}
          alt={name}
          fill
          priority
          className="object-cover object-[center_25%]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 360px, 416px"
        />
      </div>
    </div>
  );
}
