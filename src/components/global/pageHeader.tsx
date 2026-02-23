import { Button } from "@/components/ui/button";

type PageHeaderProps = {
  title: string;
  button?: {
    text: string;
    action: () => void;
    icon?: React.ReactNode;
  }
}

export function PageHeader({ title, button }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {button && (
        <Button onClick={button.action}>
          {button.icon && button.icon}
          {button.text}
        </Button>
      )}
    </div>
  )
}