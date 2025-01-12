'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface ComboboxFormProps {
  value: string;
  onChange: (value: string, item: User) => void;
  placeholder?: string;
  searchEndpoint: string;
  renderItem: (item: User) => string;
}

export function ComboboxForm({
  value,
  onChange,
  placeholder = 'Search...',
  searchEndpoint,
  renderItem
}: ComboboxFormProps) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);

  const searchUsers = React.useCallback(async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${searchEndpoint}?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setItems(data.users || []);
    } catch (error) {
      console.error('Error searching users:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [searchEndpoint]);

  const selectedItem = React.useMemo(
    () => items.find(item => item.id === value),
    [items, value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value && selectedItem
            ? renderItem(selectedItem)
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            onValueChange={searchUsers}
            className="h-9"
          />
          <CommandEmpty>
            {loading ? 'Searching...' : 'No results found.'}
          </CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={() => {
                  onChange(item.id, item);
                  setOpen(false);
                }}
              >
                {renderItem(item)}
                <Check
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === item.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 