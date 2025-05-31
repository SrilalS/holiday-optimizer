import { PROJECT_NAME } from '@/constants';
import { Metadata } from 'next';
import { PageLayout, PageHeader, PageTitle, PageDescription, PageContent } from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: `Terms and Privacy | ${PROJECT_NAME}`,
  description: `Terms of service and privacy policy for ${PROJECT_NAME}.`,
};

export default function TermsAndPrivacy() {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Terms and Privacy</PageTitle>
        <PageDescription>
          Terms of service and privacy policy for {PROJECT_NAME}
        </PageDescription>
      </PageHeader>

      <PageContent>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 p-6">
            <article className="prose dark:prose-invert max-w-none">
              {/* Empty article content as requested */}
            </article>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
