import { getSiteSettings, getStudios } from "@/src/sanity/lib/queries";
import Cemetery from "./Cemetery";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [studios, settings] = await Promise.all([getStudios(), getSiteSettings()]);
  return <Cemetery studios={studios} settings={settings} />;
}
