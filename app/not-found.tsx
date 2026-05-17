import type { Metadata } from "next";
import NotFoundUseClient from "./not-found-use-client";

export const metadata: Metadata = {
  title: "404 | Not Found",
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return <NotFoundUseClient />;
}