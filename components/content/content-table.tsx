"use client"

import { Content, ContentField, ContentModel, Field } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"
import Link from "next/link"
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

import { EmptyPlaceholder } from "../empty-placeholder"
import { CreateField } from "../field/create-field"
import { EditField } from "../field/edit-field"
import { Icons } from "../icons"
import { ModelItem } from "../model/model-item"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { CreateContent } from "./create-content"

interface FieldProps {
  type: ContentField
  value: any
}

function Field({ type, value }: FieldProps) {
  switch (type) {
    case ContentField.TEXT:
      return <span>{value}</span>
    case ContentField.CHECKBOX:
      return (
        <Checkbox  checked={value} className="pointer-events-none select-none"/>
      )
    case ContentField.NUMBER:
      return <span>{value}</span>
    case ContentField.EMAIL:
      return <a href={`mailto:${value}`}>{value}</a>
    case ContentField.PHONE:
      return <a href={`tel:${value}`}>{value}</a>
    case ContentField.URL:
      return <a href={value}>{value}</a>
    case ContentField.DATE:
      return (<time>{value}</time>
      )
  }
}

interface Props {
  model: ContentModel
}

export function ContentTable({ model }: Props) {
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
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const content = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <Icons.dots className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={`/content/${content.id}`}>Edit content</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 hover:text-red-500">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]
    const newFields: ColumnDef<any>[] = fields.map((item) => ({
      accessorKey: item.name.toLowerCase(),
      header: () => <EditField field={item} />,
      cell: ({ row }) => {
        const value: string = row.getValue(item.name.toLowerCase())
        return <div className="ml-3">{Field({type: item.type, value})}</div>
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
      ) : contents.isFetching || fields.isFetching ? (
        <div className="divide-border-200 divide-y rounded-md border">
          <ModelItem.Skeleton />
          <ModelItem.Skeleton />
          <ModelItem.Skeleton />
        </div>
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
