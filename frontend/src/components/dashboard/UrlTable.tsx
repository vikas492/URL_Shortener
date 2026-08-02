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
  AlertDialogTrigger,
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
    <div className="mx-auto w-fit max-w-full overflow-x-auto rounded-xl border bg-card shadow-sm">
      <Table className="w-fit min-w-[760px]">
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
            <TableCell className="max-w-[320px] truncate" title={url.originalUrl}>
              <span className="block truncate">{url.originalUrl}</span>
            </TableCell>

            <TableCell>
              <a
                href={`http://localhost:3000/${url.shortCode}`}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline dark:text-blue-400"
              >
                {url.shortCode}
              </a>
            </TableCell>

            <TableCell>
              {url.clicks}
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="w-20"
                onClick={() =>
                  copyToClipboard(
                    url.shortCode
                  )
                }
              >
                <Copy className="h-4 w-4" /> Copy
              </Button>

              <EditUrlDialog
                url={url}
                onUpdated={onDelete}
              />

              <AlertDialog>
  <AlertDialogTrigger
    render={
      <Button
        variant="destructive"
        size="sm"
        className="w-20"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    }
  />

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        Delete URL?
      </AlertDialogTitle>

      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>
        Cancel
      </AlertDialogCancel>

      <AlertDialogAction
        onClick={() =>
          handleDelete(url.id)
        }
      >
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  );
}
