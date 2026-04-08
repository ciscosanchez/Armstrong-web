interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: Stat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-armstrong-blue py-10" aria-label="Company statistics">
      <div className="container-armstrong">
        <dl className="grid grid-cols-2 gap-6 text-center text-white md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="mb-1 text-3xl font-bold">{stat.value}</dt>
              <dd className="text-sm font-medium text-white/80">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
