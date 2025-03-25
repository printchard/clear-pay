import clsx from "clsx";
import { Button } from "./button";

export type PrimaryButtonProps = {
  icon: React.ReactNode;
  text: string;
  className?: string;
};

export default function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <Button className={clsx("flex flex-row gap-2 font-bold", props.className)}>
      {props.icon}
      <span>{props.text}</span>
    </Button>
  );
}
