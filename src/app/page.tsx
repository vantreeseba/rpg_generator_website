import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="m-5 max-w-prose">
      <h2 className="mt-10 border-b pb-2 text-3xl font-semibold transition-colors first:mt-0">
        RPG Generators
      </h2>

      <p>
        Welcome to my RPG generators, these are free to use for anyone.
        <br />
        The current generators are along the left side.
        <br />
        <br />
        The goal is for every generator to be a deterministic generator, but also allowing
        "overridden" input for some of the values.
        <br />
        The second goal is to expose some of the internal values from the generator to allow more
        data driven apps, for example: The character/npc generator will expose data looking like
      </p>
      <pre>
        {`
{
  "species": 'elf',
  "name": 'ralph',
  "gender": 'agender',
}`}
      </pre>

      <h2 className="mt-10 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
        Random Generation Information/Definitions
      </h2>
      <h2 className="mt-5 border-b pb-2 text-l font-semibold transition-colors">pseudorandom:</h2>
      <dd>
        A pseudo random number/generator is one that is "random" but uses some kind of generation
        that can make it deterministic.
      </dd>
      <h2 className="mt-5 border-b pb-2 text-l font-semibold transition-colors">deterministic:</h2>
      <dd>
        A system/function that, given the same inputs, gives the same output, this is the opposite
        of stocastic systems.
      </dd>

      <h2 className="mt-5 border-b pb-2 text-l font-semibold transition-colors">seed:</h2>
      <dd>
        A number or string, used as input to a pseudo random number generator that reproduces the
        same output.
      </dd>

      <h2 className="mt-5 border-b pb-2 text-l font-semibold transition-colors"></h2>
      <p>
        All this together means that, these generators expose a "seed" which allows you to share the
        current output or get it again later if you want.
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Contact Info
      </h2>
      <div>
        <Button variant="ghost">
          <Link href="http://twitter.com/vantreeseba">twitter</Link>
        </Button>
        <Button variant="ghost">
          <Link href="http://vantreeseba.com">vantreeseba.com</Link>
        </Button>
      </div>
    </div>
  );
}
