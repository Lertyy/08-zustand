import NotesClient from "@/components/NotesClient/NotesClient";
import { fetchNotes } from "@/lib/api";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const tagFromUrl = params.slug?.[0] ?? "";

  // отримуємо дані тільки для стартового SSR (якщо тобі це ще потрібно)
  const initialData = await fetchNotes("", 1, tagFromUrl);

  return <NotesClient tag={tagFromUrl} />;
}
