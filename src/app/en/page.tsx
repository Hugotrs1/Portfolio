import { HomePage } from '@/components/home-page';
import { buildMetadata, en } from '@/i18n';

export const metadata = buildMetadata(en);

export default function Page() {
  return <HomePage dict={en} />;
}
