import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ContactForm } from '@/components/forms/ContactForm';
import { ArmstrongIcon } from '@/components/ui/ArmstrongIcon';

export const metadata: Metadata = {
  title: 'Book Packing and Moving Services',
  description:
    'Ready to plan your next move? Contact one of our trusted moving experts and get an instant estimate today.',
};

export default function GetMovingPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-12 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Get Moving' }]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold text-balance">Let&apos;s plan your move.</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-lg">
            Fill out the form and one of our experts will be in touch within 1 business hour. No
            pressure — just straight answers.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-armstrong">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <aside className="lg:col-span-2">
              <div className="border-armstrong-grey-3 rounded-xl border p-6">
                <h2 className="text-armstrong-dark-blue mb-4 text-lg font-semibold">
                  Other ways to get started
                </h2>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="tel:+18002887396"
                      className="text-armstrong-blue flex items-center gap-2 font-medium hover:underline"
                    >
                      <ArmstrongIcon name="head" className="h-4 w-4 shrink-0" />
                      Call 800-288-7396
                    </a>
                  </li>
                  <li>
                    <a
                      href="/ballpark-estimate"
                      className="text-armstrong-blue flex items-center gap-2 font-medium hover:underline"
                    >
                      <ArmstrongIcon name="money-1" className="h-4 w-4 shrink-0" />
                      Get a Ballpark Estimate
                    </a>
                  </li>
                  <li>
                    <a
                      href="/virtual-survey"
                      className="text-armstrong-blue flex items-center gap-2 font-medium hover:underline"
                    >
                      <ArmstrongIcon name="calendar" className="h-4 w-4 shrink-0" />
                      Schedule a Virtual Survey
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
