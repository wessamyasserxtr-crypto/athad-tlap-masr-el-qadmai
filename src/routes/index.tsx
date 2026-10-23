import { createFileRoute } from "@tanstack/react-router";
import { Platform } from "@/components/platform";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Platform />;
}
