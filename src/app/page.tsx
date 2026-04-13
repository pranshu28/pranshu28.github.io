import { redirect } from "next/navigation";

/** Dev and preview: `/` has no `[locale]` segment; production root uses `out/index.html` from the build script. */
export default function RootPage() {
  redirect("/en/");
}
