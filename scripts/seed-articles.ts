/**
 * One-time seed script — imports all static resource articles into Sanity.
 *
 * Usage (from project root):
 *   npx tsx scripts/seed-articles.ts
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local (a token with write access).
 * Run once. Re-running is safe — it uses createOrReplace with stable _id values.
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2025-04-07',
  token: process.env.SANITY_API_WRITE_TOKEN ?? '',
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let keyCounter = 0;
function key() {
  return `k${(++keyCounter).toString(36).padStart(6, '0')}`;
}

/** Convert a paragraph string to a Portable Text block.
 *  Handles "**Bold text.** rest of paragraph" patterns. */
function paragraph(text: string) {
  // Check for leading bold segment: **text.**
  const boldMatch = text.match(/^\*\*(.+?)\.\*\*\s?(.*)/s);
  if (boldMatch) {
    const children = [
      {
        _type: 'span' as const,
        _key: key(),
        marks: ['strong'],
        text: boldMatch[1] + '.',
      },
    ];
    if (boldMatch[2]) {
      children.push({
        _type: 'span',
        _key: key(),
        marks: [] as string[],
        text: ' ' + boldMatch[2],
      });
    }
    return {
      _type: 'block',
      _key: key(),
      style: 'normal',
      marks: { annotationTypes: [], decorators: [] },
      children,
    };
  }
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    marks: { annotationTypes: [], decorators: [] },
    children: [{ _type: 'span', _key: key(), marks: [] as string[], text }],
  };
}

function body(paragraphs: string[]) {
  return paragraphs.map(paragraph);
}

// ---------------------------------------------------------------------------
// Article data
// ---------------------------------------------------------------------------

const ARTICLES = [
  // ---- Moving Tips (general) ----
  {
    _id: 'article-pack-long-distance',
    category: 'general',
    title: 'How to Pack for a Long-Distance Move',
    slug: 'how-to-pack-for-a-long-distance-move',
    publishedAt: '2025-03-01T00:00:00Z',
    excerpt:
      "Long-distance moves require a different packing strategy than local ones. Here's how to protect your things over hundreds of miles.",
    paragraphs: [
      'Long-distance moves put your belongings through a lot more stress than a local move. Items can be loaded onto a truck, transported over hundreds (or thousands) of miles, and unloaded days later. The packing standards that work fine across town often fall short over the long haul.',
      '**Start with the right boxes.** Double-wall corrugated boxes are worth the extra cost for anything fragile. Standard moving boxes are fine for books, linens, and clothes — but for dishes, glassware, and electronics, go heavier.',
      '**Use proper cushioning.** Paper is your friend. For every breakable item, wrap it individually in packing paper and add a layer of crumpled paper at the bottom of the box. Bubble wrap is great for extra-delicate items. Never pack breakables loose.',
      "**Label everything — on the sides, not the top.** When boxes are stacked, you can't see the top. Write the contents and destination room on at least two sides of every box.",
      "**Seal boxes properly.** Apply tape in an H-pattern on the top and bottom of every box. One strip of tape down the center isn't enough for a multi-day haul.",
      '**Disassemble furniture.** If it comes apart, take it apart. Secure all screws and hardware in labeled zip-lock bags taped to the furniture piece they belong to.',
      '**Pack heavier items in smaller boxes.** Heavy books in a large box will be impossible to lift safely. Use small boxes for books, tools, and canned goods.',
      "If any of this sounds like a lot of work — it is. That's why Armstrong's packing service exists. Our crews pack with long-distance standards on every move, regardless of the distance.",
    ],
  },
  {
    _id: 'article-diy-vs-pro',
    category: 'general',
    title: 'DIY vs. Professional Movers: When to Hire a Pro',
    slug: 'when-to-hire-professional-movers',
    publishedAt: '2025-02-01T00:00:00Z',
    excerpt:
      "The real cost of a DIY move is often higher than people think. We break down the math and help you decide what's right for your move.",
    paragraphs: [
      'The decision to hire professional movers or go DIY usually comes down to one thing: cost. But the real cost of a DIY move is often much higher than people expect.',
      '**What DIY actually costs.** Truck rental, gas, insurance, moving equipment (dollies, straps, blankets), packing materials, helpers (often friends who expect pizza and a favor in return), lost wages from taking time off work, and — the one people forget — the risk of damage to your belongings or your body.',
      '**When DIY makes sense.** A local move with minimal furniture, one or two able-bodied people doing the work, and flexible timing can be done cost-effectively on your own. Studio and one-bedroom apartments are the sweet spot for DIY.',
      "**When to hire professionals.** Long-distance moves, homes with 2+ bedrooms, any move involving stairs or an elevator, specialty items (piano, art, antiques), tight timelines, or situations where you just can't afford to have things go wrong.",
      "**The hidden value of professional movers.** Armstrong crews move furniture all day, every day. They know how to load a truck to prevent shifting, how to navigate tight corners, and how to protect your floors and walls. They're also insured — if something breaks, there's a claims process.",
      'The math usually works out closer than people think. Get a quote from Armstrong before deciding — you might be surprised.',
    ],
  },
  {
    _id: 'article-moving-with-kids',
    category: 'general',
    title: 'Moving with Kids: How to Make Relocation Easier on Your Family',
    slug: 'moving-with-kids',
    publishedAt: '2025-03-15T00:00:00Z',
    excerpt:
      "A move is stressful for adults. For kids, it can feel like the world is ending. Here's how to ease the transition at every age.",
    paragraphs: [
      "For adults, a move is a project to manage. For kids, it's the loss of their school, their friends, their bedroom, and the world they know. That difference in perspective is worth taking seriously — because how a family handles a move shapes how kids experience it for years.",
      "**Involve kids in the process early.** The worst thing you can do is spring a move on children at the last minute. Give them time to process. Explain why you're moving and, where possible, give them choices — which room they want, how they'd like to decorate it, what to keep versus donate.",
      "**Tailor your approach to their age.** Toddlers under three largely follow their parents' emotional lead — keep your own stress in check and maintain routines as much as possible. Elementary-age kids need honest information and lots of reassurance. Teenagers need their feelings acknowledged, even if they're angry about the move; forcing positivity backfires.",
      '**Visit the new home and neighborhood before the move.** If you can, take a trip to the new city, walk through the new school, find the nearest park. Familiarity is a powerful antidote to anxiety.',
      '**Let kids say proper goodbyes.** A farewell party with classmates, an exchange of contact info, a final visit to a favorite place — these rituals matter. Rushed departures without closure create emotional loose ends.',
      '**Keep familiar items accessible during the move.** Pack a "first night" box for each child with their most important comfort items — stuffed animals, a book, their pillow. Don\'t let these disappear into the truck for days.',
      "**Prioritize setting up their spaces first.** A child's bedroom being ready on day one sends a powerful message: this is your home now. If possible, unpack their rooms before tackling common areas.",
      "Armstrong's crews are trained to handle family moves with care and patience. If you'd like advice on scheduling, packing, or setting up for a family-friendly move day, talk to one of our residential specialists.",
    ],
  },
  {
    _id: 'article-choose-mover',
    category: 'general',
    title: 'How to Choose a Moving Company You Can Actually Trust',
    slug: 'how-to-choose-a-moving-company',
    publishedAt: '2025-01-10T00:00:00Z',
    excerpt:
      "Not all movers are created equal. Here's what to look for — and what to walk away from — when vetting a moving company.",
    paragraphs: [
      'Moving fraud is a real problem. The Federal Motor Carrier Safety Administration receives thousands of complaints each year about "rogue movers" — companies that give low estimates, then hold belongings hostage for inflated fees. Knowing how to vet a moving company properly is not optional.',
      '**Start with FMCSA registration.** Any interstate mover is legally required to be registered with the Federal Motor Carrier Safety Administration and have a valid USDOT number. You can look up any mover on the FMCSA website. No registration? Walk away.',
      "**Get at least three in-home or virtual estimates.** An estimate given over the phone with no visual assessment of your belongings is essentially meaningless. Reputable movers want to see what they're dealing with before committing to a price.",
      "**Understand the difference between binding and non-binding estimates.** A binding estimate locks in the price. A non-binding estimate can increase — sometimes significantly — by delivery. Know which you're getting and what the cap is on any increase.",
      "**Check the complaint ratio, not just the star rating.** Review platforms can be gamed. The FMCSA complaint database and your state's Attorney General consumer protection office are more reliable signals. A handful of complaints over many years is normal. A pattern of complaints is a red flag.",
      "**Ask about their crews.** Are movers employees or day-labor contractors? Employee crews are trained, accountable, and covered by the company's insurance. Contractor models create gaps in accountability.",
      '**Read the Bill of Lading before signing anything.** The Bill of Lading is your contract. Read it. Understand the valuation coverage terms, the delivery window, and the dispute resolution process. Never sign a blank or incomplete Bill of Lading.',
      "Armstrong has been in business since 1957. We're fully registered, fully insured, and transparent about pricing. We'd rather lose a bid by being honest than win one by being vague.",
    ],
  },
  {
    _id: 'article-moving-winter',
    category: 'general',
    title: 'Moving in Winter: What You Need to Know',
    slug: 'moving-in-winter',
    publishedAt: '2024-12-01T00:00:00Z',
    excerpt:
      "Cold weather, ice, and short daylight hours add real complexity to a winter move. Here's how to prepare and what to ask your mover.",
    paragraphs: [
      "Winter moves come with real advantages — lower demand means better availability and often lower prices from moving companies. But cold weather, ice, and short daylight hours add complexity that summer movers never deal with. Here's how to approach it.",
      "**Check the weather a week out and again 48 hours before.** You can't control the weather, but you can plan around it. If a major storm is possible on move day, talk to your moving company about contingency options. Good movers have protocols for weather delays.",
      '**Protect your floors.** Snow, salt, and mud will be tracked in on every trip. Lay down plastic runners or old cardboard on all high-traffic pathways before the crew arrives. This matters at both the origin and destination.',
      '**Keep pathways clear.** Salt and sand the driveway, walkway, and any exterior stairs before the crew arrives. If it snows overnight, clear it in the morning. Slipping while carrying a couch is how people get hurt.',
      "**Give electronics time to adjust.** Cold electronics shouldn't be powered on immediately after being in a freezing truck. Give TVs, computers, and other sensitive equipment at least two hours at room temperature before turning them on. Condensation inside the chassis can damage components.",
      '**Pack a winter day-of kit.** Extra gloves, hand warmers, a thermos of hot coffee or tea, and a change of socks. Moving in winter is physical work in brutal conditions. Take care of yourself and your crew.',
      "**Build extra time into your schedule.** Shorter days, icy roads, and the extra gear required to work in the cold all slow things down. Don't schedule a moving day dinner for 6pm in January.",
      'Armstrong moves year-round across all climates. Our crews are equipped and trained for cold-weather moves — if you have questions about winter moving in your specific area, call us.',
    ],
  },
  {
    _id: 'article-wont-move',
    category: 'general',
    title: "What Movers Won't Move — and What to Do About It",
    slug: 'what-movers-wont-move',
    publishedAt: '2024-11-01T00:00:00Z',
    excerpt:
      "There's a long list of items professional movers are prohibited from transporting. Knowing it in advance prevents surprises on move day.",
    paragraphs: [
      "Every professional moving company maintains a list of items they're prohibited from transporting. Some items are legally restricted. Others are excluded for safety reasons or because they require specialized handling beyond the scope of standard moving services. Knowing the list in advance prevents scrambles on move day.",
      '**Hazardous materials.** This is the big category. Flammable, corrosive, explosive, and toxic materials cannot go on a moving truck. That means: propane tanks, lighter fluid, gasoline, paint thinner, pool chemicals, certain cleaning solvents, batteries with acid leakage, and ammunition. Most of these need to be used up, properly disposed of, or transported in your own vehicle.',
      "**Perishable food.** Most movers won't transport open food or items that could spoil in transit. Eat it, donate it, or pack it in a cooler in your car for local moves.",
      "**Live plants.** Some states have agricultural restrictions on transporting plants across state lines. Even where it's legal, plants don't survive well in sealed moving trucks without light or temperature control. Most movers exclude them.",
      '**Pets.** Obviously — but worth saying. Pets travel with you, not in the truck.',
      '**Irreplaceable and high-value items.** Movers will transport jewelry and important documents, but most recommend keeping truly irreplaceable items — heirlooms, passports, financial documents, sentimental items — in your personal possession during the move.',
      "**What to do.** About two weeks before your move, walk through your home with this list in mind. Set aside anything that can't go on the truck and make a plan for each item. Your moving coordinator can walk you through the specifics for your move.",
    ],
  },

  // ---- Service Guides (service) ----
  {
    _id: 'article-office-checklist',
    category: 'service',
    title: 'The Ultimate Office Relocation Checklist',
    slug: 'office-relocation-checklist',
    publishedAt: '2025-01-01T00:00:00Z',
    excerpt:
      'Moving your business is a big undertaking. Use this step-by-step checklist to keep your team productive and your timeline on track.',
    paragraphs: [
      "Moving an office is fundamentally different from moving a home. You have employees to think about, systems to keep running, and a business that can't afford extended downtime. A well-organized checklist is the difference between a smooth transition and a chaotic week.",
      '**6 months out.** Appoint a relocation project manager. Audit your current lease and notify your landlord. Tour the new space and create a detailed floor plan. Get quotes from at least three commercial moving companies.',
      '**3 months out.** Notify vendors, clients, and service providers of your new address. Plan your IT infrastructure at the new location. Order new furniture, fixtures, and equipment if needed. Create a communication plan for employees.',
      '**1 month out.** Pack and label non-essential items early. Coordinate elevator reservations at both buildings. Confirm the move date and timeline with your moving company. Plan for equipment disconnection and reconnection.',
      '**1 week out.** Back up all data. Ship essential supplies to the new address. Brief employees on the move day schedule. Confirm parking and access at both locations.',
      '**Move day.** Have your project manager on-site at both locations. Keep a master inventory log. Do a final walkthrough at the old space before handing back keys. Test all systems at the new space before employees arrive.',
      "Armstrong's commercial moving team has managed hundreds of office relocations — from small startups to multi-floor corporate headquarters. We'll assign a dedicated project coordinator to your move and handle everything from FF&E to IT logistics.",
    ],
  },
  {
    _id: 'article-data-center',
    category: 'service',
    title: 'Data Center Migration: A Step-by-Step Guide',
    slug: 'data-center-migration-guide',
    publishedAt: '2024-12-15T00:00:00Z',
    excerpt:
      'Relocating a data center with zero downtime is possible — but it requires careful planning. Our specialists walk through the full process.',
    paragraphs: [
      "A data center migration is one of the most complex logistics challenges a business can undertake. Done wrong, it can mean hours or days of downtime. Done right, it's nearly invisible to end users.",
      '**Phase 1: Discovery and assessment.** Before a single server moves, document everything. Create a complete inventory of all hardware, including rack locations, cable routing, power requirements, and cooling dependencies. Identify critical systems that require zero downtime.',
      '**Phase 2: Planning the migration sequence.** Not everything moves at the same time. Group systems by criticality and interdependency. Plan your migration in waves, starting with non-critical systems and ending with production infrastructure.',
      '**Phase 3: Preparing the destination.** The new facility needs to be fully prepared before anything moves. Power, cooling, network connectivity, and rack layout should all be validated before day one of the actual migration.',
      '**Phase 4: Pilot migration.** Move a small set of non-critical systems first. Test everything rigorously. Identify any gaps in your planning and address them before the full migration begins.',
      "**Phase 5: Full migration execution.** Execute in pre-planned waves with a rollback plan for each wave. Armstrong's data center logistics team specializes in the physical handling of servers, storage arrays, and networking equipment — including custom crating and climate-controlled transport.",
      '**Phase 6: Validation and cutover.** After each system is physically moved and reconnected, validate its operation before relying on it. The final cutover to the new facility should only happen after full validation.',
      "Armstrong's data center logistics team brings specialized equipment, climate-controlled transport, and experienced crews who understand the sensitivity of the hardware they're handling.",
    ],
  },
  {
    _id: 'article-international',
    category: 'service',
    title: 'International Relocation: What to Expect When Moving Abroad',
    slug: 'international-relocation-guide',
    publishedAt: '2025-02-15T00:00:00Z',
    excerpt:
      "Moving to another country involves customs regulations, shipping timelines, and decisions you won't face in a domestic move. Here's a practical overview.",
    paragraphs: [
      "Moving internationally is a fundamentally different undertaking than a domestic move. You're navigating customs regulations, international shipping logistics, and relocation rules that vary by destination country — often with a hard deadline tied to a new job or visa.",
      "**Start earlier than you think you need to.** International moves require 8–12 weeks of lead time at minimum. Customs documentation, export declarations, shipping container booking, and destination-country import permits all take time. Starting late doesn't compress the timeline — it creates chaos.",
      "**Understand what can and can't cross the border.** Every country has its own restrictions on imported goods. Common restricted categories include food, plants, alcohol (quantity limits), firearms, and certain electronics. Your international moving coordinator can provide a destination-specific guide, but it's your responsibility to comply.",
      '**Know the difference between sea freight and air freight.** Sea freight is dramatically cheaper for large volumes but takes 4–8 weeks to arrive depending on the destination. Air freight is faster (days, not weeks) but costs significantly more per pound. Most international movers use a combination: air freight for what you need immediately, sea for the rest.',
      '**Consider what to ship versus what to store or sell.** Not everything is worth the cost of shipping internationally. High-value items with sentimental meaning: ship them. Bulky, low-value items that can be replaced locally: consider selling them before you leave. Armstrong can help you think through this calculus.',
      '**Customs documentation is critical.** A detailed household goods inventory is required for customs clearance in virtually every country. This list needs accurate descriptions and values for every item in every box. Vague descriptions cause delays and can trigger full inspections.',
      "**Plan for destination services.** Who meets the shipment when it arrives? Who navigates local customs on the receiving end? Armstrong's international relocation network includes destination agents in over 170 countries who handle the local side of your move.",
      "International moves are complex but entirely manageable with the right partner. If you're relocating abroad, call us early — the earlier we get involved, the smoother the process.",
    ],
  },
  {
    _id: 'article-specialty-items',
    category: 'service',
    title: 'Moving Specialty Items: Pianos, Art, Antiques & More',
    slug: 'specialty-items-moving-guide',
    publishedAt: '2025-01-20T00:00:00Z',
    excerpt:
      "Not everything fits in a standard moving box. Here's how professional movers handle the items that require special care, equipment, and expertise.",
    paragraphs: [
      'Most moving companies can handle furniture and boxes. Far fewer are equipped — or qualified — to move a Steinway grand piano, a museum-grade painting, an antique armoire, or a custom wine collection. Understanding what specialty moving actually involves helps you ask the right questions and hire the right team.',
      '**Pianos.** A full-size grand piano can weigh over 1,000 pounds and requires complete disassembly of the legs and lyre before it can be moved. The case must be padded and protected at every point of contact. Stairs, tight hallways, and narrow doorways require specialized dollies and piano boards — not furniture straps. After transport, pianos need time to acclimate before they should be tuned.',
      "**Fine art and antiques.** Valuable artwork and antique furniture require custom crating, climate-controlled transport, and handlers who understand the materials they're working with. Certain paintings shouldn't be wrapped in standard packing materials — paper and plastics can cause damage. Custom crating means building a box specifically sized and padded for each individual piece.",
      "**Wine collections.** Temperature variation is the enemy of fine wine. A collection that's been properly cellared can be destroyed by a single move in a non-climate-controlled truck on a hot day. Armstrong's specialty logistics team uses temperature-controlled vehicles for wine and can coordinate with climate-controlled storage facilities at the destination.",
      '**Safes.** Gun safes, fireproof safes, and floor safes are extremely heavy and often awkwardly shaped. The handling equipment required is different from standard furniture dollies. The weight can also create floor damage risk in homes without adequate structural support at doorways and stairwells.',
      '**What to ask your mover.** For any specialty item, ask specifically: Have you moved items like this before? What equipment do you use? Are your crews trained specifically for this item type? What valuation coverage do you offer for specialty items? If they hesitate on any of these, find a specialist.',
      'Armstrong has dedicated specialty item crews for pianos, art, antiques, and high-value collections. We also offer custom crating services built in-house. Contact us to discuss your specific items before booking.',
    ],
  },
  {
    _id: 'article-warehouse-relocation',
    category: 'service',
    title: 'Planning a Warehouse Relocation: A Practical Guide',
    slug: 'warehouse-relocation-planning',
    publishedAt: '2024-11-15T00:00:00Z',
    excerpt:
      "Warehouse moves involve inventory risk, operational continuity, and tight timelines. Here's how to plan a relocation that keeps your business running.",
    paragraphs: [
      "Warehouse relocations are high-stakes projects. Unlike office moves, you're not just moving furniture and computers — you're moving inventory that has real dollar value, racking systems that require professional disassembly and reinstallation, and operational infrastructure that, if disrupted, stops your business from functioning.",
      "**Start with an operational continuity plan.** Before you plan the physical move, plan the business continuity. Which operations can be paused? Which can't? What's the maximum acceptable downtime? Can any inventory be temporarily stored at a third-party facility to allow a phased move? These decisions shape everything else.",
      '**Conduct a full inventory audit before you move.** A warehouse relocation is an ideal time to reconcile your physical inventory against your system records. Items that have been in the wrong location, miscounted, or forgotten often surface during a move. Doing this before the move prevents those discrepancies from following you to the new facility.',
      '**Photograph racking configurations before disassembly.** Industrial racking systems are complex and expensive. Documenting the existing layout before teardown gives your installation team a reference at the destination and protects you from disputes about what was there.',
      '**Plan the new facility layout in detail before move day.** Know where everything goes. Label receiving areas, aisle designations, and storage zones before the first truck arrives. Improvising floor layout on move day with inventory arriving continuously is a recipe for a weeks-long mess.',
      "**Consider a phased move if the timeline allows.** Moving one section of the warehouse at a time while keeping the rest operational can significantly reduce business disruption. This requires more logistical coordination but is often worth it for operations that can't tolerate a hard shutdown.",
      "**Budget for contingency.** Warehouse moves almost always uncover something unexpected — damaged flooring at the new facility, racking that doesn't fit the new bay dimensions, systems that need reconfiguration. A 10–15% contingency budget is standard practice.",
      "Armstrong's commercial logistics team specializes in warehouse and distribution center relocations. We handle everything from racking disassembly and reinstallation to full inventory management during the move.",
    ],
  },
  {
    _id: 'article-valuation',
    category: 'service',
    title: 'Moving Valuation Coverage Explained — What Are You Actually Protected Against?',
    slug: 'valuation-coverage-explained',
    publishedAt: '2024-10-01T00:00:00Z',
    excerpt:
      "Basic carrier liability isn't insurance. Understanding the difference between released value and full-value protection could save you thousands.",
    paragraphs: [
      'Most people assume their belongings are insured during a move. They\'re not — at least not the way they think. What moving companies provide is called "valuation coverage," which is legally distinct from insurance. Understanding the difference before your move day is essential.',
      "**Released Value Protection (the default).** Unless you choose otherwise, your shipment is covered under Released Value Protection — the minimum required by federal law. Under this option, the carrier's maximum liability is $0.60 per pound per article. That means a 50-pound TV worth $800 is covered for $30 if it's destroyed. This coverage is included at no charge, which is why so many people accept it without reading the terms.",
      '**Full Value Protection.** Under Full Value Protection, the carrier is liable for the replacement value of lost or damaged items — either by repairing the item, replacing it with a similar item, or paying you its current market value. This is the coverage that actually makes you whole. It costs more, and the exact terms (depreciation policies, deductibles) vary by carrier.',
      "**What valuation coverage is not.** It is not a comprehensive insurance policy. It doesn't cover items you pack yourself (in most cases), items of extraordinary value unless you declare them, or damage caused by events outside the mover's control (natural disasters, etc.). For truly irreplaceable or high-value items, a separate fine art or jewelry rider through your homeowner's or renter's insurance may be appropriate.",
      '**How to protect yourself.** Before your move: take photographs and video of every valuable item, note any pre-existing damage, and keep receipts or appraisals for high-value items. At delivery: inspect items before signing the delivery receipt. Note any damage on the Bill of Lading before the crew leaves — signing without noting damage makes subsequent claims much harder.',
      "**Ask your mover directly.** What valuation options do you offer? What's excluded? What's the claims process? At Armstrong, we walk every customer through valuation options before their move so there are no surprises.",
    ],
  },

  // ---- Industry Insights (industry) ----
  {
    _id: 'article-supply-chain-2025',
    category: 'industry',
    title: 'How to Build a Resilient Supply Chain in 2025',
    slug: 'supply-chain-disruptions-2025',
    publishedAt: '2025-03-01T00:00:00Z',
    excerpt:
      "The past few years exposed fragility in global supply chains. Here's what industry leaders are doing to build real resilience.",
    paragraphs: [
      "The supply chain disruptions of the past few years weren't a fluke — they were a preview. Port congestion, labor shortages, geopolitical instability, and extreme weather events have fundamentally changed the risk profile of global logistics. The companies that adapted fastest are already operating differently.",
      '**Diversify your supplier base.** Single-source dependencies are risk amplifiers. Best-in-class supply chains now operate with at least two qualified suppliers for every critical component or material, often spanning different geographies.',
      "**Invest in real-time visibility.** You can't manage what you can't see. Modern supply chain visibility platforms give you live status on every shipment, inventory level, and supplier order — enabling faster responses when disruptions hit.",
      '**Build strategic inventory buffers.** Just-in-time inventory works beautifully in stable conditions. But resilient supply chains now carry modest safety stock on their highest-risk SKUs — enough to weather a two-to-four week disruption without stopping production.',
      '**Nearshore strategically.** Long-haul supply chains face greater exposure to geopolitical risk and transit time variability. Many companies are adding nearshore suppliers — not to replace offshore sources, but to create a more resilient blend.',
      '**Create formal disruption playbooks.** When a disruption hits, the worst time to figure out your response is during the disruption. Resilient companies have pre-built playbooks for common scenarios: port closure, supplier failure, carrier capacity crisis.',
      "Armstrong's Supply Chain Solutions team works with enterprise clients to assess and reduce supply chain risk. Whether you need flexible warehousing, expedited freight options, or a logistics partner who can adapt quickly — we're built for it.",
    ],
  },
  {
    _id: 'article-sustainability',
    category: 'industry',
    title: '5 Ways to Make Your Next Move More Sustainable',
    slug: 'green-logistics-sustainability-tips',
    publishedAt: '2025-02-01T00:00:00Z',
    excerpt:
      "From reusable packing materials to route optimization, small choices add up. Here's how Armstrong approaches green logistics.",
    paragraphs: [
      "Moving generates a surprising amount of waste — cardboard, plastic wrap, foam peanuts, and more. But it doesn't have to. Small choices at every stage of a move can meaningfully reduce its environmental footprint.",
      "**Use reusable packing materials.** Plastic bins can be rented from moving supply companies and returned after the move. They're sturdier than cardboard boxes, stack better in the truck, and produce zero waste. For items that need cushioning, use towels, linens, and clothing instead of bubble wrap.",
      "**Declutter before you pack.** The most sustainable move is the one where you move less stuff. A dedicated declutter pass before packing reduces truck size, fuel consumption, and the number of boxes you need. Donate, sell, or recycle what you don't need.",
      "**Choose a mover with a modern fleet.** Armstrong's trucks are maintained to maximize fuel efficiency and minimize emissions per mile. Ask any potential mover about their fleet age and fuel standards.",
      "**Consolidate your move.** If you're moving long-distance, ask about load consolidation options. Sharing truck space with another customer's shipment (for flexible timelines) can cut your move's per-item carbon cost significantly.",
      '**Recycle your boxes properly.** Flat cardboard is widely accepted by municipal recycling programs. Break down all boxes and check your local guidelines. Many moving companies, including Armstrong, will collect used boxes at delivery for reuse.',
      "Armstrong's sustainability page at /sustainability covers our full environmental commitments — from fleet efficiency to green warehouse initiatives.",
    ],
  },
  {
    _id: 'article-corp-relocation-trends',
    category: 'industry',
    title: 'Corporate Relocation Trends Reshaping the Industry in 2025',
    slug: 'corporate-relocation-trends-2025',
    publishedAt: '2025-03-20T00:00:00Z',
    excerpt:
      "Remote work, return-to-office mandates, and talent competition are driving a new wave of employee moves. Here's what HR and operations leaders need to know.",
    paragraphs: [
      'Corporate relocation — the practice of moving employees on behalf of their employers — is in the middle of a structural shift. After years of relative stability, the combination of remote work normalization, talent competition, rising housing costs, and return-to-office mandates has produced a relocation landscape that looks different than it did five years ago.',
      '**Lump-sum benefits are replacing managed moves.** Historically, companies managed the full relocation process on behalf of employees: coordinating movers, housing searches, and destination services. Increasingly, companies are offering lump-sum payments and letting employees manage their own moves. This reduces administrative burden but shifts the risk to employees, many of whom lack experience managing relocation costs.',
      '**Remote work has created new relocation patterns.** Many employees relocated during the pandemic to lower-cost markets. Now, as companies tighten return-to-office requirements, some of those employees are being asked to relocate back — or are choosing to leave instead. HR leaders are navigating a new dynamic where relocation refusals are more common than they used to be.',
      "**Housing costs are driving up relocation package values.** Moving an employee from a low-cost market to a high-cost metro (San Francisco, New York, Boston) now requires significantly larger housing assistance to be competitive. Companies that haven't updated their packages in several years are finding them insufficient to close candidates.",
      "**Talent attraction is driving voluntary relocation programs.** Some companies are proactively offering relocation packages to attract remote candidates who'd prefer to move to company headquarters cities. This is particularly common in technology and professional services.",
      '**The technology layer is expanding.** Relocation management platforms are becoming standard for companies that move more than a handful of employees per year. These platforms manage policy compliance, track expenses, and provide employee support throughout the process.',
      'Armstrong works with HR and operations teams at companies of all sizes to design and execute relocation programs. Contact our commercial team to discuss what a managed relocation program would look like for your organization.',
    ],
  },
  {
    _id: 'article-last-mile',
    category: 'industry',
    title: 'Last-Mile Logistics: Why the Final Leg Is the Hardest',
    slug: 'last-mile-logistics-explained',
    publishedAt: '2025-01-15T00:00:00Z',
    excerpt:
      "Last-mile delivery accounts for more than half of total shipping costs. Here's why it's so difficult — and how the industry is solving it.",
    paragraphs: [
      'In logistics, "last mile" refers to the final leg of a shipment\'s journey — from a distribution hub to the end customer. Despite being the shortest leg in distance, it\'s consistently the most expensive, accounting for 41–53% of total supply chain costs according to most industry estimates. Understanding why helps explain a lot about how logistics companies are investing and where the industry is headed.',
      '**Density is the core problem.** Long-haul freight is efficient because a single truck carries hundreds of packages destined for a single region. Last-mile delivery is the opposite: a truck might make 100 stops in a single day, each requiring the driver to leave the vehicle, navigate to a door, complete a delivery, return, and move on. The labor and time cost per package is vastly higher.',
      "**Failed deliveries multiply costs.** Every missed delivery — because a customer wasn't home, the address was wrong, or access was denied — requires a second attempt. That second attempt is a near-full cost repeat. Failed delivery rates of 5–10% are common, and each one compounds the cost problem.",
      '**Urban density vs. rural sprawl create different challenges.** In dense urban areas, the challenge is traffic, parking, and building access. In suburban and rural areas, the challenge is pure distance — stops are spread out and drive time between deliveries eats into productivity.',
      '**The solutions being deployed.** Route optimization software that sequences stops for maximum efficiency. Micro-fulfillment centers closer to population centers. Crowd-sourced delivery platforms that match packages with available drivers. Parcel lockers and alternative delivery points that eliminate the "no one home" problem. And, increasingly, electric cargo bikes for dense urban last-mile work.',
      "**What this means for businesses.** If you're choosing a logistics partner, their last-mile capability is worth examining carefully. Track record on delivery accuracy, average attempt-to-completion rate, and real-time tracking capability are the metrics that matter.",
      "Armstrong's supply chain solutions include last-mile delivery coordination for commercial clients. Contact our logistics team to discuss your distribution network.",
    ],
  },
  {
    _id: 'article-true-cost-relocation',
    category: 'industry',
    title: "The True Cost of Employee Relocation (It's More Than the Moving Truck)",
    slug: 'true-cost-of-employee-relocation',
    publishedAt: '2024-12-01T00:00:00Z',
    excerpt:
      "Most companies underestimate relocation costs by 30–50%. Here's a complete breakdown of what corporate moves actually cost — and how to budget accurately.",
    paragraphs: [
      'Most companies that offer relocation benefits budget for the moving truck and maybe a temporary housing stipend. The actual cost of relocating an employee is typically 2–3x what HR originally plans for — and the gap is almost always explained by costs that were overlooked or underestimated.',
      '**The moving truck is usually less than 30% of total cost.** For a typical domestic relocation of a mid-level employee with a family, physical transportation costs might run $5,000–$15,000. But the full relocation budget — accounting for all costs — routinely runs $25,000–$75,000 for a homeowner.',
      '**Home sale and purchase costs are the big variable.** If your company is covering home sale assistance (closing costs, agent commissions, guaranteed buyout programs), these costs can easily exceed $20,000–$30,000 for a mid-priced home. Companies that offer these benefits see significantly higher relocation acceptance rates.',
      "**Temporary housing is underestimated.** Employees who own homes often can't move into a new property immediately. Corporate housing or extended-stay hotel accommodations average $3,000–$6,000 per month. A two-month temporary housing period adds $6,000–$12,000 to the package.",
      "**Tax gross-up is often forgotten.** Many relocation benefits are taxable income to the employee. If you're paying a $30,000 relocation package, your employee may owe $8,000–$12,000 in taxes on it — unless you gross up the payment to cover their tax liability. Companies that don't gross up find their packages are worth significantly less than intended.",
      '**Loss-on-sale assistance and duplicate housing costs.** When housing markets are slow or an employee is underwater on their current home, loss-on-sale assistance can become a significant liability. And until the old home sells, many employees are carrying two mortgages.',
      '**Productivity loss during transition.** This is the cost that never appears in the relocation budget but is always real. An employee in the middle of a relocation is distracted. Research suggests new relocatees operate at 50–80% productivity for 3–6 months after arriving.',
      'Armstrong works with corporate HR teams to structure relocation programs that are both comprehensive and cost-controlled. Contact our commercial team for a consultation.',
    ],
  },
  {
    _id: 'article-logistics-tech',
    category: 'industry',
    title: 'How Technology Is Transforming the Moving and Logistics Industry',
    slug: 'logistics-technology-trends',
    publishedAt: '2024-11-01T00:00:00Z',
    excerpt:
      "From AI-powered routing to IoT shipment tracking, technology is changing what's possible in logistics. Here's what matters now and what's coming next.",
    paragraphs: [
      "For most of its history, the moving and logistics industry ran on paper, phone calls, and relationships. That's changing — faster than most people inside the industry expected. The technology transformation is touching every layer of the business, from how customers get estimates to how trucks are loaded and routed.",
      '**Virtual surveys and AI-powered inventory estimation.** The in-home survey — where an estimator walks through your home to inventory what needs to move — is going virtual. Video survey tools allow estimators to conduct assessments remotely. More advanced platforms use computer vision to automatically identify and catalog items from video footage, generating inventory lists and volume estimates with minimal human involvement.',
      '**Dynamic routing and optimization.** Modern route optimization software factors in traffic, delivery windows, vehicle capacity, and stop sequencing to produce routes that were previously impossible to calculate manually. On last-mile routes, this technology can reduce drive time by 15–25% — a significant efficiency gain at scale.',
      "**Real-time shipment tracking.** GPS tracking on moving trucks has become standard. What's newer is the integration of that tracking data with customer-facing platforms — giving customers live visibility into where their shipment is and when it'll arrive, with notifications at each milestone.",
      '**IoT sensors for sensitive freight.** For temperature-sensitive, shock-sensitive, or humidity-sensitive cargo, IoT sensors now provide continuous environmental monitoring throughout transit. Data can be accessed in real time and serves as a chain-of-custody record in the event of a damage claim.',
      '**Digital documentation and e-signatures.** The moving industry has historically been paper-heavy — Bills of Lading, inventories, delivery receipts. Digital workflows and e-signatures are eliminating that paper trail, reducing errors, and making documentation available to all parties in real time.',
      "**What this means for customers.** More transparency, faster estimates, and better accountability. Technology doesn't replace the experienced crew doing the physical work — but it improves the information flow around that work, which benefits everyone.",
      'Armstrong continues to invest in technology that improves your experience and gives you visibility into your move. Ask your coordinator about our digital tracking and documentation options.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Run seed
// ---------------------------------------------------------------------------

async function seed() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local');
    process.exit(1);
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌  SANITY_API_WRITE_TOKEN is not set in .env.local');
    console.error('   Create a token with write access in your Sanity project settings:');
    console.error('   https://sanity.io/manage → API → Tokens → Add API token');
    process.exit(1);
  }

  console.warn(`Seeding ${ARTICLES.length} articles into Sanity...`);

  for (const article of ARTICLES) {
    const doc = {
      _id: article._id,
      _type: 'blogPost',
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      category: article.category,
      publishedAt: article.publishedAt,
      excerpt: article.excerpt,
      body: body(article.paragraphs),
    };

    await client.createOrReplace(doc);
    console.warn(`  ✓  ${article.title}`);
  }

  console.warn('\n✅  Done. Open /studio to review and edit the articles.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
