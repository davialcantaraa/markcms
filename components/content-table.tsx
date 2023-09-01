"use client"

import { Content, ContentModel, Field } from "@prisma/client"
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

import { CreateContent } from "./create-content"
import { CreateField } from "./create-field"
import { EmptyPlaceholder } from "./empty-placeholder"

interface Props {
  model: ContentModel
}

function getColumns(fields: Field[]): ColumnDef<any>[] {
  const mainFields: ColumnDef<any>[] = [
    {
      accessorKey: "created_at",
      header: "Created at",
      cell: ({ row }) => {
        const created_at: string = row.getValue("created_at")
        return format(new Date(created_at), "dd/MM/yyyy")
      },
    },
    {
      accessorKey: "updated_at",
      header: "Last update",
      cell: ({ row }) => {
        const updated_at: string = row.getValue("updated_at")
        return format(new Date(updated_at), "dd/MM/yyyy")
      },
    },
  ]
  const newFields: ColumnDef<any>[] = fields.map((item) => ({
    accessorKey: item.name.toLowerCase(),
    header: item.name,
  }))
  return newFields.concat(mainFields)
}

function getContents(contents: Content[], fields: Field[]) {
  return contents.map((item) => {
    let dynamicParams: { [key: string]: any } = {
      created_at: item.created_at,
      updated_at: item.updated_at,
    }

    fields.forEach((field) => {
      const fieldName = field.name.toLowerCase()
      // @ts-ignore
      dynamicParams[fieldName] = item.raw_data[field.name]
    })

    return dynamicParams
  })
}

export function ContentTable({ model }: Props) {
  const [columns, setColumns] = useState<ColumnDef<any>[]>([])
  const [data, setData] = useState<Partial<Content>[]>([])

  const fields = useQuery({
    queryKey: ["get-fields"],
    queryFn: () => getFieldsByModelId(model.id),
    onSuccess: (response) => {
      const newColumns = getColumns(response.data)
      setColumns(newColumns)
    },
  })

  const contents = useQuery({
    queryKey: ["get-contents"],
    queryFn: () => getContentsByModelId(model.id),
    onSuccess: (response) => {
      const newContents = getContents(response.data, fields.data!.data)
      setData(newContents)
    },
    enabled: !!fields.data?.data.length,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="model" />
          <EmptyPlaceholder.Title>No fields created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any fields in your model. Start creating a
            field.
          </EmptyPlaceholder.Description>
          <CreateField model={model} />
        </EmptyPlaceholder>
      )}
    </div>
  )
}
