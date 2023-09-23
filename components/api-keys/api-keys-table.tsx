"use client"

import { ApiKey } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"
import Link from "next/link"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getApiKeys } from "@/lib/api/get-api-keys"
import { capitalizeFirstLetter } from "@/lib/utils"

import { ApiKeysEmptyState } from "../empty-states/api-keys-empty-state"
import { ModelItem } from "../model/model-item"
import { ApiKeyToken } from "./api-key-token"

export const columns: ColumnDef<ApiKey>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const apiKey = row.original
      return <Link href={`/api-keys/${apiKey.id}`} className="underline">{apiKey.name}</Link>
    },
  },
  {
    accessorKey: "token",
    header: "Token",
    cell: ({ row }) => {
      const token: string = row.getValue("token")
      return <ApiKeyToken>{token}</ApiKeyToken>
    },
  },
  {
    accessorKey: "permission",
    header: "Permission",
    cell: ({ row }) => {
      const permission: string = row.getValue("permission")
      return capitalizeFirstLetter(permission.toLocaleLowerCase())
        .split("_")
        .join(" ")
    },
  },
  {
    accessorKey: "last_used",
    header: "Last used",
    cell: ({ row }) => {
      const last_used: string = row.getValue("last_used")
      if (!last_used) return "Never used"
      return format(new Date(last_used), "dd/MM/yyyy")
    },
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      const created_at: string = row.getValue("created_at")
      return format(new Date(created_at), "dd/MM/yyyy")
    },
  },
]

export const ApiKeysTable = () => {
  const apiKeys = useQuery({
    queryKey: ["get-api-keys"],
    queryFn: getApiKeys,
  })

  const table = useReactTable({
    data: apiKeys.data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      {apiKeys.data?.data.length ? (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No API keys.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : apiKeys.isFetching ? (
        <div className="divide-border-200 divide-y rounded-md border">
          <ModelItem.Skeleton />
          <ModelItem.Skeleton />
          <ModelItem.Skeleton />
        </div>
      ) : (
        <ApiKeysEmptyState />
      )}
    </div>
  )
}
