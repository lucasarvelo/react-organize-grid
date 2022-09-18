import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { SortableItem } from "./components/SortableItem";

const App = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);

  const [layout, setLayout] = useState([
    { id: 1, x: 0, y: 0, static: false, w: 2, h: 1 },
    { id: 2, x: 1, y: 0, static: false, w: 1, h: 1 },
    { id: 3, x: 2, y: 0, static: false, w: 1, h: 1 },
    { id: 4, x: 3, y: 0, static: false, w: 1, h: 1 },
    { id: 5, x: 0, y: 1, static: false, w: 1, h: 1 },
    { id: 6, x: 1, y: 1, static: false, w: 1, h: 1 },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(Number(active?.id));
        const newIndex = items.indexOf(Number(over?.id));

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className={"grid gap-2 grid-cols-4 h-[540px]"}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items}>
          {items.map((id) => {
            const itemLayout = layout.find((item) => item.id == id);

            return (
              <SortableItem
                key={id}
                id={id}
                className={`col-span-${itemLayout?.w} row-span-${itemLayout?.h} bg-slate-200`}
              >
                <div className={"w-full h-full"}>{id}</div>
              </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;
