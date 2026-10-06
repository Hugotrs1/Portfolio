import { HomePage } from '@/components/home-page';
import { buildMetadata, fr } from '@/i18n';

export const metadata = buildMetadata(fr);

export default function Page() {
  return <HomePage dict={fr} />;
}
