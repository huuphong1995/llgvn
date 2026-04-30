interface ServiceCardProps {
  title: string;
  description: string;
  items: string[];
}

export function ServiceCard({ title, description, items }: ServiceCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
      <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
