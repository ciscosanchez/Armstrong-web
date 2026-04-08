'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArmstrongIcon } from '@/components/ui/ArmstrongIcon';
import type { ArmstrongIconName } from '@/components/ui/ArmstrongIcon';

interface ServiceItem {
  label: string;
  items: readonly string[];
}

interface Tab {
  id: string;
  label: string;
  icon: ArmstrongIconName;
  headline: string;
  body: string[];
  image: string;
  imageAlt: string;
  services: ServiceItem[];
  ctaLabel: string;
}

const TABS: Tab[] = [
  {
    id: 'distribution',
    label: 'Distribution Services',
    icon: 'forklift',
    headline:
      'Spend less time on your storage and pick and pack needs. Let Armstrong manage your goods and where they need to go.',
    body: [
      'If your company relies heavily on fulfilling and shipping orders, you know how essential it is to have your team focused on quality. We have the resources, real-time inventory software, and experience in asset management and order fulfillment to manage this process.',
      'Give your company more time to focus on growing your business. By outsourcing your fulfillment needs to Armstrong, you can minimize your management of orders and inventory, and real estate costs.',
    ],
    image: '/images/sc-distribution.jpg',
    imageAlt: 'Armstrong forklift operator loading truck at distribution dock',
    services: [
      {
        label: 'Distribution Solutions',
        items: [
          'Inventory management',
          'Asset tagging',
          'Barcode scanning',
          'Dock receiving',
          'Client access',
          'Just-in-time deliveries',
          'Crossdocking / transloading',
          'Long & short-term storage',
          'Packing / custom crating',
          'Pick, pack & ship',
          'Security with badge access & cameras',
          'Secure trailer yards',
          'Food-grade & chemical options',
        ],
      },
      {
        label: 'Asset Management',
        items: [
          'Project management',
          'Inventory management & control',
          'Global storage & transportation',
          'Asset inventory & security',
          'Receiving, consolidation & storage',
          'Online asset catalog',
          'Order tracking',
          'Installation',
          'Asset liquidation & disposal',
          'Electronic destruction',
          'Redeployment',
        ],
      },
    ],
    ctaLabel: 'Get a Distribution Quote',
  },
  {
    id: 'transportation',
    label: 'Transportation Management',
    icon: 'truck',
    headline: 'Partner with Armstrong for scalable and efficient freight solutions.',
    body: [
      'When shipping demands become more complex, long-term agility becomes essential. Armstrong can help you build a supply chain solution tailored to your business, regardless of size or complexity.',
      'We make logistics easier by providing access to our extensive national carrier network, real-time product visibility, advanced technology, and Armstrong-owned assets. With carefully vetted service partners, we deliver a reliable solution designed to meet your specific needs.',
    ],
    image: '/images/sc-transportation.png',
    imageAlt: 'Armstrong semi truck on open highway through green hills',
    services: [
      {
        label: 'Transportation Solutions',
        items: [
          'Truckload (FTL)',
          'Less than truckload (LTL)',
          'Flatbed',
          'Refrigerated',
          'Intermodal — ocean & rail',
          'Port drayage',
          'Dedicated transportation capacity',
          'Transloading & cross-docking',
          'International air transportation',
        ],
      },
      {
        label: 'First & Final Mile',
        items: [
          'Receiving',
          'Storing',
          'Delivering',
          'Installing',
          'Debris removal',
          'Unpacking & repacking',
          'Quality review / touch-up',
          'Real-time proof of delivery',
        ],
      },
    ],
    ctaLabel: 'Get a Transportation Quote',
  },
  {
    id: 'engineering',
    label: 'Engineering Services',
    icon: 'gear-and-arrow',
    headline:
      "The expertise and resources you need to compete in today's dynamic supply chain environment.",
    body: [
      "Whether you need a full overhaul of your supply chain network or simply need additional bandwidth to get projects across the goal line, Armstrong's got you covered.",
      "Armstrong's Engineering Services team partners with each shipper to understand goals and objectives and provide solutions that move businesses forward. Shippers who leverage Armstrong's supply chain expertise, industry-leading technology and engineering resources experience results that reduce cost and improve service.",
    ],
    image: '/images/sc-engineering.jpg',
    imageAlt: 'Supply chain warehouse forklift operator',
    services: [
      {
        label: 'Engineering Solutions',
        items: [
          'Supply chain analysis & project support',
          'Network optimization & cost reduction alternatives',
          'RFP / Bid management services',
        ],
      },
    ],
    ctaLabel: 'Talk to an Engineer',
  },
];

export function SupplyChainTabs() {
  const [activeId, setActiveId] = useState('distribution');

  return (
    <div>
      {/* ── Tab bar ───────────────────────────────────────────────── */}
      <div className="bg-white shadow-sm" role="tablist" aria-label="Supply chain services">
        <div className="container-armstrong flex gap-2 overflow-x-auto py-3">
          {TABS.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveId(tab.id)}
                className={[
                  'flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all',
                  isActive
                    ? 'bg-armstrong-dark-blue text-white shadow'
                    : 'text-armstrong-dark-blue border-armstrong-grey-3 hover:border-armstrong-blue border bg-white hover:bg-white',
                ].join(' ')}
              >
                <ArmstrongIcon name={tab.icon} className="h-5 w-5 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab panels ───────────────────────────────────────────── */}
      {TABS.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeId}
        >
          <section className="py-20">
            <div className="container-armstrong">
              <div className="grid items-start gap-12 lg:grid-cols-2">
                {/* Left — text */}
                <div>
                  <h2 className="text-armstrong-dark-blue mb-6 text-3xl leading-snug font-semibold lg:text-4xl">
                    {tab.headline}
                  </h2>
                  {tab.body.map((para, i) => (
                    <p key={i} className="text-armstrong-grey-1 mb-4 text-base leading-relaxed">
                      {para}
                    </p>
                  ))}
                  <Link
                    href={`/get-moving-with-armstrong?type=supply-chain&service=${tab.id}`}
                    className="bg-armstrong-blue hover:bg-armstrong-blue-hover mt-4 inline-block rounded-full px-8 py-3.5 font-semibold text-white transition-colors"
                  >
                    {tab.ctaLabel}
                  </Link>
                </div>

                {/* Right — image + service lists */}
                <div className="flex flex-col gap-8">
                  <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-md">
                    <Image
                      src={tab.image}
                      alt={tab.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div
                    className={`grid gap-6 ${tab.services.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}
                  >
                    {tab.services.map((svc) => (
                      <div key={svc.label}>
                        <h4 className="text-armstrong-dark-blue mb-3 text-sm font-semibold tracking-wide uppercase">
                          {svc.label}
                        </h4>
                        <ul className="space-y-2">
                          {svc.items.map((item) => (
                            <li
                              key={item}
                              className="text-armstrong-grey-1 flex items-start gap-2 text-sm"
                            >
                              <ArmstrongIcon
                                name="checkmark"
                                className="text-armstrong-blue mt-0.5 h-4 w-4 shrink-0"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}

      {/* ── Carrier advantages (transport tab only, shown always below) ── */}
      {activeId === 'transportation' && (
        <section className="bg-armstrong-dark-blue py-16 text-white">
          <div className="container-armstrong">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <ArmstrongIcon name="country" className="text-armstrong-blue mb-4 h-10 w-10" />
                <h3 className="mb-3 text-2xl font-semibold">Carrier Advantages</h3>
                <p className="text-armstrong-grey-2 mb-4 text-base leading-relaxed">
                  Armstrong is a logistics leader matching proven carriers with growing businesses
                  to move goods across the globe. Trust our carrier relations team to keep you top
                  of mind.
                </p>
                <a
                  href="mailto:carriers@goarmstrong.com"
                  className="text-armstrong-blue text-sm font-medium underline underline-offset-2"
                >
                  carriers@goarmstrong.com
                </a>
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 self-center">
                {CARRIER_ADVANTAGES.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <ArmstrongIcon
                      name="checkmark"
                      className="text-armstrong-blue h-4 w-4 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

const CARRIER_ADVANTAGES = [
  'Quick-pay options',
  'After-hours support',
  'Back-haul opportunities',
  'Easy fuel surcharges',
  'Multi-sized freight',
  'Dedicated freight options',
  'Technology-driven support',
  'Responsive freight specialist',
] as const;
