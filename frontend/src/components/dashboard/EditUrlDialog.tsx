"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { Url } from "@/types/url";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { updateUrl } from "@/services/url.service";

interface Props {
  url: Url;
  onUpdated: () => void;
}

export default function EditUrlDialog({
  url,
  onUpdated,
}: Props) {
  const [open, setOpen] = useState(false);

  const [originalUrl, setOriginalUrl] =
    useState(url.originalUrl);

  const [customAlias, setCustomAlias] =
    useState(url.shortCode);

  const [loading, setLoading] =
    useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateUrl(url.id, {
        originalUrl,
        customAlias,
      });

      toast.success("URL updated successfully");

      setOpen(false);

      onUpdated();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit URL
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Original URL"
              value={originalUrl}
              onChange={(e) =>
                setOriginalUrl(e.target.value)
              }
            />

            <Input
              placeholder="Custom Alias"
              value={customAlias}
              onChange={(e) =>
                setCustomAlias(e.target.value)
              }
            />

            <Button
              className="w-full"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}