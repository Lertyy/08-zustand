import { Metadata } from "next";
import NotesClient from "@/components/NotesClient/NotesClient";

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tagFromUrl = params.slug?.[0] || "All";

  const title = `Notes filtered by: ${tagFromUrl} — NoteHub`;
  const description = `Browse your notes filtered by "${tagFromUrl}" in NoteHub. Quickly find the ideas and tasks you need.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-five-drab.vercel.app/notes/filter/${tagFromUrl}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${tagFromUrl}`,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const tagFromUrl = params.slug?.[0] === "All" ? "" : params.slug?.[0] || "";

  return <NotesClient tag={tagFromUrl} />;
}
