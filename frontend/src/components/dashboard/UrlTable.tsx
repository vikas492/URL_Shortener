"use client";

import { Url } from "@/types/url";

import {
  Copy,
  Trash2,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteUrl } from "@/services/url.service";

import EditUrlDialog from "./EditUrlDialog";

interface UrlTableProps {
  urls: Url[];
  onDelete: () => void;
}

export default function UrlTable({
  urls,
  onDelete,
}: UrlTableProps) {
  const copyToClipboard = async (
    shortCode: string
  ) => {
    const shortUrl =
      `http://localhost:3000/${shortCode}`;

    await navigator.clipboard.writeText(
      shortUrl
    );

    toast.success("Short URL copied!");
  };

  const handleDelete = async (
    id: string
  ) => {
    try {
      await deleteUrl(id);

      toast.success(
        "URL deleted successfully"
      );

      onDelete();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Delete Failed"
      );
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Original URL
          </TableHead>

          <TableHead>
            Short URL
          </TableHead>

          <TableHead>
            Clicks
          </TableHead>

          <TableHead>
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {urls.map((url) => (
          <TableRow key={url.id}>
            <TableCell className="max-w-sm truncate">
              {url.originalUrl}
            </TableCell>

            <TableCell>
              <a
                href={`http://localhost:3000/${url.shortCode}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {url.shortCode}
              </a>
            </TableCell>

            <TableCell>
              {url.clicks}
            </TableCell>

            <TableCell className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  copyToClipboard(
                    url.shortCode
                  )
                }
              >
                <Copy className="h-4 w-4" />
              </Button>

              <EditUrlDialog
                url={url}
                onUpdated={onDelete}
              />

              <AlertDialog>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    const confirmed =
                      window.confirm(
                        "Delete this URL?"
                      );

                    if (confirmed) {
                      handleDelete(url.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}