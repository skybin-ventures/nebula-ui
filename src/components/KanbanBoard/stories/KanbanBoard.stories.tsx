import type { Meta, StoryObj } from "@storybook/react-vite";
import { KanbanBoard, type KanbanCard, type KanbanColumn } from "../../../index";

const cards: Record<string, KanbanCard> = {
  c1: { id: "c1", title: "Design onboarding", description: "Draft the first-run experience", priority: "high", labels: ["design"], dueDate: "2026-12-01" },
  c2: { id: "c2", title: "Ship dark mode", description: "Wire NebulaTheme into the app shell", priority: "medium", labels: ["frontend"] },
  c3: { id: "c3", title: "Fix flaky CI job", priority: "urgent", labels: ["ci"] },
  c4: { id: "c4", title: "Docs: data grid query API" },
  c5: { id: "c5", title: "Spike: webhooks", description: "Evaluate outbox pattern", priority: "low" },
};

const columns: KanbanColumn[] = [
  { id: "backlog", title: "Backlog", cardIds: ["c4", "c5"] },
  { id: "in-progress", title: "In progress", cardIds: ["c1", "c2"] },
  { id: "done", title: "Done", cardIds: ["c3"] },
];

const meta = {
  title: "Components/KanbanBoard",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled component: apply moves to your own state in onCardMove.
// No-op here so the story stays static and side-effect free.
const noopMove = () => {};

export const Default: Story = {
  render: () => <KanbanBoard columns={columns} cards={cards} onCardMove={noopMove} />,
};

export const CustomCards: Story = {
  render: () => (
    <KanbanBoard
      columns={columns}
      cards={cards}
      onCardMove={noopMove}
      renderCard={(card, isDragging) => (
        <div
          className={
            "rounded-md border bg-background p-3 text-sm " +
            (isDragging ? "opacity-60" : "cursor-grab active:cursor-grabbing")
          }
        >
          <p className="font-medium">{card.title}</p>
          {card.labels?.map((label) => (
            <span key={label} className="ml-1 rounded bg-muted px-1.5 py-0.5 text-xs">
              {label}
            </span>
          ))}
        </div>
      )}
      renderColumnHeader={(column) => (
        <div className="flex w-full items-center justify-between px-3 py-2 text-sm font-semibold">
          {column.title}
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {column.cardIds.length}
          </span>
        </div>
      )}
    />
  ),
};
