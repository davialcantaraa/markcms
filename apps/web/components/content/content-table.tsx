"use client"

import { queryClient } from "@/providers/app-provider"
import { useModelStore } from "@/stores/model-store"
import { Content, Field } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"
import { useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getContentsByModelId } from "@/lib/api/get-contents-by-model-id"
import { getFieldsByModelId } from "@/lib/api/get-fields-by-model-id"

import { FieldEmptyState } from "../empty-states/field-empty-state"
import { EditField } from "../field/edit-field"
import { ModelItem } from "../model/model-item"
import { ContentItemOperations } from "./content-item-operationts"
import { TableField } from "./content-table-field"
import { CreateContent } from "./create-content"

export function ContentTable() {
  const { model } = useModelStore()
  const [columns, setColumns] = useState<ColumnDef<any>[]>([])
  const [data, setData] = useState<Partial<Content>[]>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  function getColumns(fields: Field[]): ColumnDef<any>[] {
    const mainFields: ColumnDef<any>[] = [
      {
        accessorKey: "updated_at",
        header: "Last update",
        cell: ({ row }) => {
          const updated_at: string = row.getValue("updated_at")
          return format(new Date(updated_at), "dd/MM/yyyy")
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
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const content = row.original

          return <ContentItemOperations content={content} />
        },
      },
    ]
    const newFields: ColumnDef<any>[] = fields.map((item) => ({
      accessorKey: item.name.toLowerCase(),
      header: () => <EditField field={item} />,
      cell: ({ row }) => {
        const value: string = row.getValue(item.name.toLowerCase())
        const content: Content = row.original
        return (
          <div className="ml-3 max-w-[200px] truncate">
            {TableField({ type: item.type, value, content: content })}
          </div>
        )
      },
    }))
    return newFields.concat(mainFields)
  }

  function getContents(contents: Content[], fields: Field[]) {
    return contents.map((item) => {
      let dynamicParams: { [key: string]: any } = {
        id: item.id,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }

      fields.forEach((field) => {
        const fieldName = field.name.toLowerCase()
        // @ts-ignore
        dynamicParams[fieldName] = item.raw_data[fieldName]
      })

      return dynamicParams
    })
  }

  const fields = useQuery({
    queryKey: ["get-fields"],
    queryFn: () => getFieldsByModelId(model.id),
    onSuccess: (response) => {
      const newColumns = getColumns(response.data)
      setColumns(newColumns)
      queryClient.invalidateQueries(["get-contents"])
    },
    // enabled: false,
  })

  const contents = useQuery({
    queryKey: ["get-contents"],
    queryFn: () => getContentsByModelId(model.id),
    onSuccess: (response) => {
      const newContents = getContents(response.data, fields.data!.data)
      setData(newContents.reverse())
    },
    enabled: fields.isSuccess,
  })

  return (
    <div className="rounded-md border">
      {fields.data?.data.length ? (
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
            ) : contents.isFetching ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <ModelItem.Skeleton />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No contents.
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center p-0">
                <CreateContent model={model} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : contents.isFetching || fields.isFetching ? (
        <div className="divide-border-200 divide-y rounded-md border">
          <ModelItem.Skeleton />
          <ModelItem.Skeleton />
          <ModelItem.Skeleton />
        </div>
      ) : (
        <FieldEmptyState />
      )}
    </div>
  )
}
