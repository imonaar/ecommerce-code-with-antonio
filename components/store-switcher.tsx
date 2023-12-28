"use client"

import { Store } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
//types generated with npx prisma generated

import { useStoreModal } from '@/hooks/use-store-modal';
import { cn } from '@/lib/utils';
import { CommandEmpty } from 'cmdk';
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

const StoreSwitcher = ({
    className,
    items = []
}: StoreSwitcherProps) => {
    const [open, setOpen] = useState(false)
    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map(item => ({
        label: item.name,
        value: item.id
    }))

    const currentStore = formattedItems.find(item => item.value === params.storeId)

    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    size='sm'
                    role='combobox'
                    aria-expanded={open}
                    aria-label='select a store'
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className='mr-2 h-4 w-4' />
                    {currentStore?.label}
                    <ChevronsUpDown className=' ml-auto w-4 h-4 opacity-40 shrink-0' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandList>
                        <CommandInput placeholder='Search store...' />
                        <CommandEmpty>
                            No store found.
                        </CommandEmpty>
                        <CommandGroup heading="Stores">
                            {
                                formattedItems.map(store => (
                                    <CommandItem
                                        key={store.label}
                                        onSelect={() => onStoreSelect(store)}
                                        className='text-sm'
                                    >
                                        <StoreIcon className='mr-2 h-4 w-4' />
                                        {store.label}
                                        <Check
                                            className={cn('ml-auto h-4 w-4', currentStore?.value === store.value ? 'opacity-100' : 'opacity-0')}
                                        />
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen()
                                }}
                                className='cursor-pointer'
                            >
                                <PlusCircle className='mr-2 h-5 w-5' />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>

            </PopoverContent>
        </Popover>
    );
}

export default StoreSwitcher;