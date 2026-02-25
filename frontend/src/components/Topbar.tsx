import { Button } from "./Button";

type TopBarProps = {
  onNewPlan?: () => void;
};

export function TopBar({ onNewPlan }: TopBarProps) {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-[1440px] px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold text-slate-900">
          StudySense
        </div>

        <Button onClick={onNewPlan}>
          New Plan
        </Button>
      </div>
    </header>
  );
}