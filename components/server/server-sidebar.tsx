import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { Server } from "@prisma/client";
import { ServerHeader } from "./server-header";
import { ServerWithMembers } from "@/types";
interface Props {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: Props) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server: any = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        orderBy: {
          role: "asc",
        },
        include: {
          profile: true,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const textChannels = server?.channels.filter(
    (ch: any) => ch.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (ch: any) => ch.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (ch: any) => ch.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (m: any) => m.profileId !== profile.id
  );
  const role = server?.members.find(
    (m: any) => m.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};
