/**
 * Server component to inject JSON-LD schema in <head> safely.
 * Use as: <JsonLd data={organizationSchema()} />
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // schema.org JSON is safe to inject — no user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
