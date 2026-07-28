'use client';

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../../primitives/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../primitives/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";
import {
  COUNTRIES,
  filterCountries,
  getCountryByCode,
  getCountryFlag,
  sortCountriesWithPriority,
  type Country,
} from "../../data/countries";

export interface CountryPickerProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  compact?: boolean;
  include?: string[];
  exclude?: string[];
  priorityCountries?: string[];
  className?: string;
  id?: string;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

function resolveCountries(
  include?: string[],
  exclude?: string[],
  priorityCountries?: string[]
): Country[] {
  let countries = COUNTRIES;

  if (include?.length) {
    const includeSet = new Set(include.map((code) => code.toUpperCase()));
    countries = countries.filter((country) => includeSet.has(country.code));
  }

  if (exclude?.length) {
    const excludeSet = new Set(exclude.map((code) => code.toUpperCase()));
    countries = countries.filter((country) => !excludeSet.has(country.code));
  }

  return sortCountriesWithPriority(countries, priorityCountries);
}

export function CountryPicker({
  value,
  onValueChange,
  placeholder = "Select country",
  disabled,
  compact = false,
  include,
  exclude,
  priorityCountries,
  className,
  id,
  required,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: CountryPickerProps) {
  const [open, setOpen] = useState(false);
  const countries = useMemo(
    () => resolveCountries(include, exclude, priorityCountries),
    [include, exclude, priorityCountries]
  );
  const selectedCountry = value ? getCountryByCode(value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-required={required}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          disabled={disabled}
          className={cn(
            "justify-between font-normal",
            compact ? "h-full w-auto shrink-0 border-0 bg-transparent px-2 shadow-none hover:bg-transparent" : "w-full",
            !value && "text-muted-foreground",
            className
          )}
        >
          {selectedCountry ? (
            <span className="flex min-w-0 items-center gap-2 truncate">
              <span aria-hidden="true">{getCountryFlag(selectedCountry.code)}</span>
              {!compact && <span className="truncate">{selectedCountry.name}</span>}
            </span>
          ) : (
            <span className="truncate">{compact ? "…" : placeholder}</span>
          )}
          {!compact && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <Command
          filter={(itemValue, search) => {
            const country = countries.find(
              (entry) => entry.code.toLowerCase() === itemValue.toLowerCase()
            );
            if (!country) {
              return 0;
            }

            return filterCountries([country], search).length > 0 ? 1 : 0;
          }}
        >
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue.toUpperCase());
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span aria-hidden="true" className="mr-2">
                    {getCountryFlag(country.code)}
                  </span>
                  <span className="truncate">{country.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {country.dialCode}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

