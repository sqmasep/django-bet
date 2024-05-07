import { cn } from "~/lib/utils";

interface RequirementProps extends React.ComponentPropsWithoutRef<"div"> {}

export default function Requirement({ children, ...props }: RequirementProps) {
  return (
    <div
      {...props}
      className={cn("grid min-h-96 place-content-center place-items-center border border-border")}
    >
      {children}
    </div>
  );
}
