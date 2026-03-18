import { useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    type SortingState,
    type ColumnDef,
} from '@tanstack/react-table';

import type { PlayerPreview } from '@/entities/player';

import { PlayerSelectFiled } from './PlayerSelectFiled';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui';

type PlayerSelectListProps = {
    players: PlayerPreview[];
    onAddPlayer?: (player: PlayerPreview) => void;
};

export const columns: ColumnDef<PlayerPreview>[] = [
    {
        accessorKey: 'selectedPercentage',
        header: '% Picked',
    },
    {
        accessorKey: 'overallPoints',
        header: 'Pts',
    },
    {
        accessorKey: 'value',
        header: 'Value',
    },
];

export const PlayerSelectList = ({
    players,
    onAddPlayer,
}: PlayerSelectListProps) => {
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'overallPoints', desc: true },
    ]);

    const table = useReactTable({
        data: players,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const gridClass =
        'grid grid-cols-[minmax(0,1fr)_60px_60px_44px] gap-3 items-center lg:grid-cols-[88px_minmax(0,1fr)_70px_70px_70px_52px] md:gap-4';

    return (
        <div className="flex flex-col w-full h-full rounded-2xl bg-bg p-4">
            <div
                className={cn(gridClass, 'border-b pb-3 text-sm text-zinc-500')}
            >
                <div>Sort by:</div>
                <div className="min-w-0 hidden lg:block" />

                {table.getHeaderGroups()[0].headers.map((header) => {
                    const sort = header.column.getIsSorted();

                    const isPickedColumn =
                        header.column.columnDef.header === '% Picked';

                    return (
                        <Button
                            variant="ghost"
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            className={cn(
                                'hover:bg-transparent',
                                isPickedColumn && 'hidden lg:block',
                            )}
                        >
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                            )}
                            {sort === 'asc' && '↑'}
                            {sort === 'desc' && '↓'}
                        </Button>
                    );
                })}

                <div />
            </div>

            <div className="flex-1 overflow-auto">
                {table.getRowModel().rows.map((row) => {
                    return (
                        <PlayerSelectFiled
                            player={row.original}
                            onAddPlayer={onAddPlayer}
                        />
                    );
                })}
            </div>
        </div>
    );
};
