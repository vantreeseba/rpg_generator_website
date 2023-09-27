import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="m-10">
      <div>Welcome to my RPG generators, these are free to use for anyone.</div>
      <div>The current generators are along the left side.</div>
      <div>
        Contact info:
        <div>
          <Button variant="ghost">
            <Link href="http://twitter.com/vantreeseba">twitter</Link>
          </Button>
          <Button variant="ghost">
            <Link href="http://vantreeseba.com">vantreeseba.com</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
