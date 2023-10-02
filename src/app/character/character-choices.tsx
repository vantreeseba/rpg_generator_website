'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

import species from '../../lib/data/character/species.json';
import identity from '../../lib/data/character/identity.json';
import { useState } from 'react';

type Grammar = Record<string, string[]>;
type MappedData<T extends Grammar> = Record<keyof T, any>;

type ChoicesProps<TChoiceType> = {
  value: TChoiceType;
  onValueChange: (value: TChoiceType) => void;
};

export default function CharacterChoices<T>({ value, onValueChange }: ChoicesProps<T>) {
  function toChoices<T extends Grammar>(data: T): MappedData<T> {
    const mapped: any = {};
    for (let key in data) {
      mapped[key] = (
        <Choice
          key={`character_choice_${key}`}
          title={key}
          choices={data[key]}
          onValueChange={(val) => onValueChange({ ...value, [key]: val })}
        />
      );
    }

    return mapped;
  }

  const speciesChoices = toChoices(species);
  const identityChoices = toChoices(identity);
  const pronounChoices = toChoices({ pronoun: ['he', 'she', 'they', 'it'] });

  return (
    <div className="grid grid-flow-row-dense grid-cols-4">
      {speciesChoices.species}
      {identityChoices.gender}
      {pronounChoices.pronoun}
    </div>
  );
}

interface ChoiceProps {
  title: string;
  choices: Array<string>;
  value?: string;
  onValueChange?: (value: string) => void;
}

function Choice({ choices, title, value, onValueChange }: ChoiceProps) {
  var items = choices.map((choice, i) => (
    <SelectItem key={i} value={choice}>
      {choice}
    </SelectItem>
  ));

  return (
    <div className="w-60">
      <Label htmlFor={title}>{title}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]" id={title}>
          <SelectValue placeholder={`Select a ${title}`} />
        </SelectTrigger>
        <SelectContent>{items}</SelectContent>
      </Select>
    </div>
  );
}
