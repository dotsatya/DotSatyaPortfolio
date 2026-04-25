import LayoutClient from "../layout-client";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TerminalLayout({ children }: Props) {
  return <LayoutClient>{children}</LayoutClient>;
}