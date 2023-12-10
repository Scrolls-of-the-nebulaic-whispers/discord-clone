import { Member, Server } from "@prisma/client";
import React, { FC } from "react";

interface Props {
  member: Member;
  server: Server;
}

const ServerMember: FC<Props> = () => {
  return <div>ServerMember</div>;
};

export default ServerMember;
