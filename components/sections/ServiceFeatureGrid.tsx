import { ArmstrongIcon } from '@/components/ui/ArmstrongIcon';
import type { ArmstrongIconName } from '@/components/ui/ArmstrongIcon';

interface Feature {
  icon: ArmstrongIconName;
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
          <ArmstrongIcon
            name={feature.icon}
            className="text-armstrong-blue mb-4 h-10 w-10"
            aria-hidden="true"
          />
          <h3 className="text-armstrong-dark-blue mb-2 font-semibold">{feature.title}</h3>
          <p className="text-armstrong-grey-1 text-sm leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
