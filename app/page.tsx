import { getStudios } from "@/src/sanity/lib/queries";
import Cemetery from "./Cemetery";

export const dynamic = "force-dynamic";

export default async function Home() {
  const studios = await getStudios();
  return <Cemetery studios={studios} />;
}
