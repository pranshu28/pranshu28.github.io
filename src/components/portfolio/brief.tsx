import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Brief({
  name,
  firstName,
  surname,
  initials,
  subtitle,
  description,
  avatarUrl,
  className = "",
  locale,
}: {
  name: string;
  firstName?: string;
  surname?: string;
  initials: string;
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
        <h1 className="font-page-heading text-3xl font-semibold tracking-tight sm:text-5xl xl:text-6xl/none">
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
          <p className="text-muted-foreground font-sans text-sm font-medium tracking-wide uppercase sm:text-base">
            {subtitle}
          </p>
        ) : null}
        <p className="max-w-[600px] font-sans whitespace-pre-line text-base leading-snug md:text-lg md:leading-snug">
          {description}
        </p>
      </div>
      <Avatar className="bg-muted size-24 border sm:size-28 md:size-32 lg:size-36">
        <AvatarImage
          alt={name}
          src={avatarUrl}
          objectFit="cover"
          objectPosition="center 28%"
          priority
        />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
