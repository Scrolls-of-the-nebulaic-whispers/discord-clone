"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";

import { Button } from "../ui/button";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import queryString from "query-string";

const DeleteChannelModal = () => {
  const { data, isOpen, onClose, type } = useModal();
  const [isLoadind, setIsLoading] = useState(false);

  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteChannel";
  const { server, channel } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = queryString.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      console.log(url);

      await axios.delete(url);

      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete channel
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{"  "}
            <span className="font-semibold text-rose-500">
              #{channel?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoadind} onClick={onClose} variant="ghost">
              Cancel
            </Button>

            <Button disabled={isLoadind} onClick={onClick} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
