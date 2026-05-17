import { Metadata } from "next";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/components/NotesClient/NotesClient";

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tagFromUrl = params.slug?.[0] || "All";

  return {
    title: `Notes filtered by: ${tagFromUrl} — NoteHub`,
    description: `Browse notes filtered by ${tagFromUrl}`,
  };
}

export default async function Page({ params }: Props) {
  const tagFromUrl = params.slug?.[0] === "All" ? "" : params.slug?.[0] || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tagFromUrl],
    queryFn: () => fetchNotes("", 1, tagFromUrl),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tagFromUrl} />
    </HydrationBoundary>
  );
}
