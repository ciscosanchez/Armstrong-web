'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArmstrongIcon } from '@/components/ui/ArmstrongIcon';
import type { ArmstrongIconName } from '@/components/ui/ArmstrongIcon';

interface ServiceList {
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
  services: ServiceList[];
  ctaLabel: string;
}

const TABS: Tab[] = [
  {
    id: 'office',
    label: 'Office & Facility Moving',
    icon: 'buildings',
    headline:
      'The Armstrong Company plans, coordinates, and manages every move down to the last detail, ensuring you can get from one space to the next without missing a beat.',
    body: [
      'Whether you need to move a single department or an entire campus, our commercial moving professionals deliver a seamless experience with minimal downtime. We work around your schedule to keep your operation running.',
      'From smaller retail spaces to large industrial warehouses, we have a wide variety of services to keep you organized and keep business going as usual.',
    ],
    image: '/images/biz-office.jpg',
    imageAlt: 'Armstrong commercial mover assembling office furniture',
    services: [
      {
        label: 'Commercial Moving Services',
        items: [
          'Office & corporate relocation',
          'Retail & showroom moves',
          'Laboratory & healthcare moving',
          'Industrial & manufacturing moves',
          'Hospitality & hotel moves',
          'Government & institutional moving',
          'School & campus relocation',
          'Decommissioning services',
        ],
      },
      {
        label: 'Project Services',
        items: [
          'Pre-move planning & consultation',
          'Space planning assistance',
          'Furniture disassembly & reassembly',
          'Asset tagging & inventory',
          'After-hours & weekend moves',
          'Secure document handling',
          'Debris removal & disposal',
          'Post-move support',
        ],
      },
    ],
    ctaLabel: 'Get a Commercial Quote',
  },
  {
    id: 'ffe',
    label: 'FF&E Installation',
    icon: 'boxes',
    headline:
      'When your company gets ready to relocate, you want your new space to feel like home. Our Armstrong team of moving professionals has been helping clients do that for decades.',
    body: [
      'Armstrong handles furniture, fixtures, and equipment installation for corporate offices, hotels, healthcare facilities, and retail locations nationwide. We coordinate delivery, placement, and assembly so your team can focus on business.',
      'Our FF&E crews are trained across all major furniture systems and work with facilities managers and project coordinators to meet tight timelines.',
    ],
    image: '/images/biz-movers.jpg',
    imageAlt: 'Armstrong movers unloading commercial furniture from truck',
    services: [
      {
        label: 'FF&E Services',
        items: [
          'Furniture systems installation',
          'Reception & common area setup',
          'Workstation configuration',
          'Conference room setup',
          'Healthcare & clinical furniture',
          'Hospitality FF&E',
          'Retail fixture installation',
          'White-glove delivery',
        ],
      },
      {
        label: 'Technology Services',
        items: [
          'IT equipment disconnect & reconnect',
          'Server & data center relocation',
          'AV systems coordination',
          'Network equipment handling',
          'Cable management',
          'Equipment labeling & inventory',
        ],
      },
    ],
    ctaLabel: 'Get an FF&E Quote',
  },
  {
    id: 'warehouse',
    label: 'Warehouse & Distribution',
    icon: 'forklift',
    headline:
      'From smaller retail spaces to large industrial warehouses, we have a wide variety of services to keep you organized and keep business going as usual.',
    body: [
      "Armstrong's warehouse and distribution services support commercial clients with short- and long-term storage, asset management, and logistics coordination. Our facilities are secure, climate-controlled, and equipped for inventory management.",
      'We combine physical warehouse capabilities with real-time inventory systems to give you full visibility into your assets at all times.',
    ],
    image: '/images/biz-warehousing.png',
    imageAlt: 'Armstrong commercial warehousing and distribution facility',
    services: [
      {
        label: 'Warehouse Solutions',
        items: [
          'Short & long-term storage',
          'Climate-controlled facilities',
          'Inventory management',
          'Asset tagging & tracking',
          'Secure trailer yards',
          'Dock receiving',
          'Pick, pack & ship',
          'Crossdocking / transloading',
        ],
      },
      {
        label: 'Distribution Services',
        items: [
          'Just-in-time deliveries',
          'Last-mile delivery',
          'Food-grade & chemical storage',
          'Asset liquidation & disposal',
          'Online asset catalog',
          'Order fulfillment',
        ],
      },
    ],
    ctaLabel: 'Get a Warehousing Quote',
  },
];

export function BusinessMovingTabs() {
  const [activeId, setActiveId] = useState('office');

  return (
    <div>
      {/* Tab bar */}
      <div className="bg-white shadow-sm" role="tablist" aria-label="Commercial moving services">
        <div className="container-armstrong flex gap-2 overflow-x-auto py-3">
          {TABS.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`biz-panel-${tab.id}`}
                id={`biz-tab-${tab.id}`}
                onClick={() => setActiveId(tab.id)}
                className={[
                  'flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all',
                  isActive
                    ? 'bg-armstrong-dark-blue text-white shadow'
                    : 'text-armstrong-dark-blue border-armstrong-grey-3 hover:border-armstrong-blue border bg-white',
                ].join(' ')}
              >
                <ArmstrongIcon name={tab.icon} className="h-5 w-5 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab panels */}
      {TABS.map((tab) => (
        <div
          key={tab.id}
          id={`biz-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`biz-tab-${tab.id}`}
          hidden={tab.id !== activeId}
        >
          <section className="py-20">
            <div className="container-armstrong">
              <div className="grid items-start gap-12 lg:grid-cols-2">
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
                    href={`/get-moving-with-armstrong?type=commercial&service=${tab.id}`}
                    className="bg-armstrong-blue hover:bg-armstrong-blue-hover mt-4 inline-block rounded-full px-8 py-3.5 font-semibold text-white transition-colors"
                  >
                    {tab.ctaLabel}
                  </Link>
                </div>
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
                  <div className={`grid gap-6 ${tab.services.length > 1 ? 'sm:grid-cols-2' : ''}`}>
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
    </div>
  );
}
