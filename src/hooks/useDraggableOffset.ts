import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

interface DragOffset {
  x: number;
  y: number;
}

interface UseDraggableOffsetOptions {
  initialOffset: DragOffset;
  onChange: (nextOffset: DragOffset) => void;
  enabled?: boolean;
}

export function useDraggableOffset({
  initialOffset,
  onChange,
  enabled = true,
}: UseDraggableOffsetOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<DragOffset>({ x: 0, y: 0 });
  const startOffsetRef = useRef<DragOffset>(initialOffset);

  const handleDragStart = useCallback(
    (e: ReactMouseEvent) => {
      if (!enabled) return;
      if ((e.target as HTMLElement).tagName.toLowerCase() === "input") return;

      e.preventDefault();
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      startOffsetRef.current = { ...initialOffset };
    },
    [enabled, initialOffset]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleDragMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      onChange({
        x: startOffsetRef.current.x + dx,
        y: startOffsetRef.current.y + dy,
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging, onChange]);

  return { isDragging, handleDragStart };
}
