import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  const commonMessages = (await import(`./messages/${locale}/common.json`))
    .default;
  const personalMessages = (await import(`./messages/${locale}/personal.json`))
    .default;
  const collectionsMessages = (
    await import(`./messages/${locale}/collections.json`)
  ).default;
  return {
    locale,
    messages: {
      ...commonMessages,
      ...personalMessages,
      ...collectionsMessages,
    },
  };
});
