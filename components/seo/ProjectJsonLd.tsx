import type { GeneratedSchemaData } from "@/scripts/content-engine/types";

type Props = { schema: GeneratedSchemaData };

export default function ProjectJsonLd({ schema }: Props) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
