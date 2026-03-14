import { useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import type { Player } from '@/entities/player';

type ConstructorsListTableProps = {
    data: Player[];
    hiddenColumns?: string[];
};

const columns: ColumnDef<Player>[] = [
    {
        id: 'rank',
        header: '#',
        cell: ({ row, table }) => {
            const rows = table.getRowModel().rows;
            return rows.findIndex((r) => r.id === row.id) + 1;
        },
    },
    {
        accessorKey: 'displayName',
        header: 'Name',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <span>{row.original.displayName}</span>
            </div>
        ),
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <button
                className="flex items-center gap-1"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Price
                <ArrowUpDown size={14} />
            </button>
        ),
    },
    {
        accessorKey: 'overtakingPts',
        header: ({ column }) => (
            <button
                className="flex items-center gap-1"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Overtaking
                <ArrowUpDown size={14} />
            </button>
        ),
    },
    {
        accessorKey: 'points',
        header: ({ column }) => (
            <button
                className="flex items-center gap-1"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Points
                <ArrowUpDown size={14} />
            </button>
        ),
    },
    {
        accessorKey: 'selectedPercent',
        header: ({ column }) => (
            <button
                className="flex items-center gap-1"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Selected %
                <ArrowUpDown size={14} />
            </button>
        ),
    },
    {
        accessorKey: 'valueForMoney',
        header: ({ column }) => (
            <button
                className="flex items-center gap-1"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Value for money
                <ArrowUpDown size={14} />
            </button>
        ),
    },
];

export const ConstructorsListTable = ({
    data,
    hiddenColumns = [],
}: ConstructorsListTableProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columnVisibility = Object.fromEntries(
        hiddenColumns.map((col) => [col, false]),
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="flex h-full overflow-hidden">
            <div className="max-h-full flex-1 overflow-auto rounded-xl border border-zinc-800">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-zinc-900">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="text-left px-4 py-3 font-medium text-zinc-300"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-t border-zinc-800 hover:bg-zinc-900/50"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-3">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
