import { createFileRoute } from "@tanstack/react-router";
import { JournalPage } from "@/components/site/journal-page";

export const Route = createFileRoute("/en/journal")({
  component: JournalPage,
  head: () => ({ meta: [{ title: "Journal — int_design" }, { name: "description", content: "Field notes from the int_design studio." }] }),
});
