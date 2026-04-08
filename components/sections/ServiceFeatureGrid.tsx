interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ServiceFeatureGridProps {
  features: readonly Feature[];
}

export function ServiceFeatureGrid({ features }: ServiceFeatureGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="border-armstrong-grey-3 rounded-xl border bg-white p-6 shadow-sm"
        >
          <span className="mb-4 block text-3xl" aria-hidden="true">
            {feature.icon}
          </span>
          <h3 className="text-armstrong-dark-blue mb-2 font-semibold">{feature.title}</h3>
          <p className="text-armstrong-grey-1 text-sm leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
