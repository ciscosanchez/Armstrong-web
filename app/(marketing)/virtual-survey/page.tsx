import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { VirtualSurveyForm } from '@/components/forms/VirtualSurveyForm';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Schedule a Virtual Survey | The Armstrong Company',
  description:
    "Can't meet in person? No problem. Armstrong's virtual survey lets our moving experts assess your needs via video — fast, convenient, and just as accurate.",
};

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Submit your request',
    description:
      'Fill out the short form with your contact info, move details, and preferred survey time.',
  },
  {
    step: '02',
    title: 'Get a calendar invite',
    description:
      'One of our move coordinators will confirm your appointment via email within 1 business day.',
  },
  {
    step: '03',
    title: 'Walk us through your space',
    description:
      'Using your phone or laptop camera, show our expert your rooms, furniture, and items to move.',
  },
  {
    step: '04',
    title: 'Receive your quote',
    description:
      "We'll send a detailed, no-surprise quote within 24 hours of your virtual walkthrough.",
  },
];

export default function VirtualSurveyPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Virtual Survey' }]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold lg:text-5xl">Schedule a Virtual Survey</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-2xl">
            Get an accurate moving quote from the comfort of your home. No in-person visit required.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong grid gap-16 lg:grid-cols-2">
          {/* How it works */}
          <div>
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              How it works
            </p>
            <h2 className="text-armstrong-dark-blue mb-8 text-3xl font-semibold">
              A quote in 4 easy steps
            </h2>
            <ol className="space-y-6">
              {HOW_IT_WORKS.map((step) => (
                <li key={step.step} className="flex gap-4">
                  <span className="bg-armstrong-blue flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    {step.step}
                  </span>
                  <div>
                    <p className="text-armstrong-dark-blue font-semibold">{step.title}</p>
                    <p className="text-armstrong-grey-1 mt-1 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="border-armstrong-grey-3 bg-armstrong-grey-3 mt-10 rounded-xl border p-6">
              <p className="text-armstrong-dark-blue text-sm font-semibold">What to have ready</p>
              <ul className="text-armstrong-grey-1 mt-3 space-y-1 text-sm">
                <li>✓ A phone or laptop with a working camera</li>
                <li>✓ Access to all rooms and spaces you need moved</li>
                <li>✓ Your move date (or a target range)</li>
                <li>✓ Origin and destination addresses</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <VirtualSurveyForm />
        </div>
      </section>

      <CTABanner
        headline="Prefer to talk now?"
        subhead="Our move specialists are available Mon–Fri 8am–6pm in your timezone."
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong' }}
        variant="light"
      />
    </>
  );
}
