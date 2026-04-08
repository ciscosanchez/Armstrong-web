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
    id: 'local',
    label: 'Local Moving',
    icon: 'house',
    headline: 'The Armstrong Company ensures an effortless local move with award-winning service.',
    body: [
      'Our local moving crews are experienced, background-checked, and trained to handle your belongings with care. We work on your timeline — whether you need to be out by the end of the week or the end of the month.',
      'Local moves are priced by the hour with no hidden fees. You get a dedicated crew, padded truck, and all the supplies needed for a smooth move.',
    ],
    image: '/images/res-local.jpg',
    imageAlt: 'Armstrong movers with residential boxes',
    services: [
      {
        label: 'Local Moving Services',
        items: [
          'Full-service packing & unpacking',
          'Furniture disassembly & reassembly',
          'Appliance moving',
          'Piano & specialty item moving',
          'Same-day & last-minute moves',
          'Apartment & condo moves',
          'Senior moving services',
          'Storage solutions',
        ],
      },
      {
        label: "What's Included",
        items: [
          'Trained, background-checked crew',
          'Padded moving truck',
          'Moving blankets & pads',
          'Dollies & equipment',
          'Full liability coverage',
          'No hidden fees',
        ],
      },
    ],
    ctaLabel: 'Get a Local Moving Quote',
  },
  {
    id: 'long-distance',
    label: 'Long-Distance Moving',
    icon: 'truck-2',
    headline: "Armstrong's nationwide professional team ensures an easy long-distance move.",
    body: [
      'Moving across state lines requires a team with the reach, resources, and experience to get your belongings there safely and on time. Armstrong operates in 33+ locations across the country — we know every route.',
      'We provide binding estimates, dedicated move coordinators, and real-time shipment tracking so you always know where your belongings are.',
    ],
    image: '/images/res-longdist.jpg',
    imageAlt: 'Armstrong movers carrying furniture for long-distance move',
    services: [
      {
        label: 'Long-Distance Services',
        items: [
          'Interstate moving',
          'Cross-country relocation',
          'Binding price estimates',
          'Dedicated move coordinator',
          'Full-value protection',
          'Storage-in-transit',
          'Auto transportation',
          'Military & government moves',
        ],
      },
      {
        label: 'Long-Distance Resources',
        items: [
          'Shipment tracking portal',
          'Moving timeline planning',
          'Packing guides & checklists',
          'Financing available',
          'Virtual survey option',
          'Ballpark estimate tool',
        ],
      },
    ],
    ctaLabel: 'Get a Long-Distance Quote',
  },
  {
    id: 'international',
    label: 'International Moving',
    icon: 'globe',
    headline: 'Trust Armstrong to manage your international move for a smooth experience.',
    body: [
      'International moves require expertise in customs regulations, documentation, and global logistics. Armstrong is a certified international mover with memberships in FIDI, IAMX, LACMA, and Worldwide ERC — meaning your move meets the highest global standards.',
      'Our international coordinators handle every detail from origin to destination, including customs clearance, door-to-door delivery, and full packing services.',
    ],
    image: '/images/res-storage.jpg',
    imageAlt: 'Armstrong storage and international moving facilities',
    services: [
      {
        label: 'International Services',
        items: [
          'Door-to-door international moves',
          'Air & ocean freight',
          'Customs clearance & compliance',
          'Export packing & crating',
          'Pet relocation coordination',
          'Temporary storage abroad',
          'Vehicle transportation',
          'Destination services',
        ],
      },
      {
        label: 'Certifications',
        items: [
          'FIDI certified',
          'IAMX member',
          'LACMA member',
          'Worldwide ERC member',
          'CTPAT certified',
          'FAIM accredited',
          'ISO 9001 certified',
        ],
      },
    ],
    ctaLabel: 'Get an International Quote',
  },
  {
    id: 'employee-relocation',
    label: 'Employee Relocation',
    icon: 'heads',
    headline: "Armstrong's expert employee relocation services move your talent worldwide.",
    body: [
      'When your business needs to move employees — whether across town or across the globe — Armstrong provides seamless relocation services that take care of your people so they can focus on their new role.',
      'We work directly with HR teams and relocation management companies to deliver a consistent, stress-free experience for relocating employees and their families.',
    ],
    image: '/images/res-movers.jpg',
    imageAlt: 'Armstrong movers providing employee relocation services',
    services: [
      {
        label: 'Relocation Services',
        items: [
          'Household goods moving',
          'International employee relocation',
          'Lump sum program management',
          'Policy & benefits counseling',
          'Destination services',
          'Temporary housing coordination',
          'School & community orientation',
          'Spouse/partner career support',
        ],
      },
      {
        label: 'Corporate Programs',
        items: [
          'Group move management',
          'RMC direct billing',
          'Online move management portal',
          'Reporting & analytics',
          'Dedicated account team',
          'Expense management',
        ],
      },
    ],
    ctaLabel: 'Talk to a Relocation Expert',
  },
];

export function ResidentialMovingTabs() {
  const [activeId, setActiveId] = useState('local');

  return (
    <div>
      {/* Tab bar */}
      <div className="bg-white shadow-sm" role="tablist" aria-label="Residential moving services">
        <div className="container-armstrong flex gap-2 overflow-x-auto py-3">
          {TABS.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`res-panel-${tab.id}`}
                id={`res-tab-${tab.id}`}
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
          id={`res-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`res-tab-${tab.id}`}
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
                    href={`/get-moving-with-armstrong?type=residential&service=${tab.id}`}
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
