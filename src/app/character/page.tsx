'use client';

import npc_generator from '../../lib/generators/npc.js';
import CharacterChoices from './character-choices';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import CharacterCard from './character-card';
import { useUrlState } from '@/hooks/useUrlState';

export type CharacterState = {
  seed?: number;
  species?: string;
  gender?: string;
  name_?: string;
};

export default function NPC() {
  const [urlState, setUrlState] = useUrlState<CharacterState>();
  const setSeed = (seed: number) => setUrlState({ seed });

  let character = npc_generator(urlState, urlState.seed);

  return (
    <div>
      <div>
        <div className="flex w-full max-w-sm items-end space-x-2">
          <div>
            <Label htmlFor={'seed'}>seed</Label>
            <Input
              type="number"
              value={urlState.seed}
              onChange={(ev) => setSeed(parseInt(ev.target.value || '0'))}
            />
          </div>
          <Button onClick={() => setSeed(Math.floor(Math.random() * 1_000_000))}>Randomize</Button>
        </div>

        <CharacterChoices value={urlState} onValueChange={setUrlState} />
      </div>
      <div className="mt-4">
        <CharacterCard character={character} />
      </div>
    </div>
  );
}
