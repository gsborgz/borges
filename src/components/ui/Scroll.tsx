import { concatClassNames } from '@lib/utils';
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type ScrollAreaContextValue = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const ScrollAreaContext = createContext<ScrollAreaContextValue | null>(null);

const ScrollArea = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, forwardedRef) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement);

  return (
    <>
      {/* escondemos as barras nativas e usamos thumb customizado */}
      <style>{`[data-scroll="custom"]::-webkit-scrollbar{display:none} [data-scroll="custom"]{-ms-overflow-style:none;scrollbar-width:none;}`}</style>
      <ScrollAreaContext.Provider value={{ containerRef }}>
        <div
          ref={containerRef}
          data-scroll="custom"
          className={concatClassNames('relative overflow-auto', className)}
          {...props}
        >
          <div className="h-full w-full rounded-[inherit]">{children}</div>

          {/* Barras customizadas */}
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />

          {/* canto */}
          <div className="absolute right-0 bottom-0 w-2.5 h-2.5 bg-transparent" />
        </div>
      </ScrollAreaContext.Provider>
    </>
  );
});

ScrollArea.displayName = 'ScrollArea';

type ScrollBarProps = {
  orientation?: 'vertical' | 'horizontal';
} & React.HTMLAttributes<HTMLDivElement>;

const MIN_THUMB_SIZE = 20;

const ScrollBar = forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = 'vertical', ...props }, ref) => {
    const ctx = useContext(ScrollAreaContext);
    const localRef = useRef<HTMLDivElement | null>(null);
    const thumbRef = useRef<HTMLDivElement | null>(null);
    const container = ctx?.containerRef.current ?? null;

    const [, setTick] = useState(0); // forcing updates
    const dragging = useRef(false);
    const dragStart = useRef(0);
    const startScroll = useRef(0);

    // atualizar tamanho/posição do thumb
    const update = () => {
      if (!container || !thumbRef.current || !localRef.current) return;

      if (orientation === 'vertical') {
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        if (scrollHeight <= clientHeight) {
          localRef.current.style.display = 'none';
          return;
        } else localRef.current.style.display = 'flex';

        const thumbSize = Math.max(
          (clientHeight / scrollHeight) * clientHeight,
          MIN_THUMB_SIZE
        );
        const maxThumbPos = clientHeight - thumbSize;
        const thumbPos =
          (container.scrollTop / (scrollHeight - clientHeight)) * maxThumbPos;

        thumbRef.current.style.height = `${thumbSize}px`;
        thumbRef.current.style.transform = `translateY(${thumbPos}px)`;
      } else {
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        if (scrollWidth <= clientWidth) {
          localRef.current.style.display = 'none';
          return;
        } else localRef.current.style.display = 'flex';

        const thumbSize = Math.max(
          (clientWidth / scrollWidth) * clientWidth,
          MIN_THUMB_SIZE
        );
        const maxThumbPos = clientWidth - thumbSize;
        const thumbPos =
          (container.scrollLeft / (scrollWidth - clientWidth)) * maxThumbPos;

        thumbRef.current.style.width = `${thumbSize}px`;
        thumbRef.current.style.transform = `translateX(${thumbPos}px)`;
      }
    };

    useEffect(() => {
      if (!container) return;
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          update();
        });
      };
      const onResize = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          update();
        });
      };

      update();
      container.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);

      return () => {
        cancelAnimationFrame(raf);
        container.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [container, orientation]);

    // arrastar o thumb
    useEffect(() => {
      const onMouseMove = (e: MouseEvent) => {
        if (!dragging.current || !container || !thumbRef.current) return;
        if (orientation === 'vertical') {
          const delta = e.clientY - dragStart.current;
          const scrollable = container.scrollHeight - container.clientHeight;
          const trackSize = container.clientHeight - thumbRef.current.offsetHeight;
          const ratio = scrollable / Math.max(trackSize, 1);
          container.scrollTop = Math.round(startScroll.current + delta * ratio);
        } else {
          const delta = e.clientX - dragStart.current;
          const scrollable = container.scrollWidth - container.clientWidth;
          const trackSize = container.clientWidth - thumbRef.current.offsetWidth;
          const ratio = scrollable / Math.max(trackSize, 1);
          container.scrollLeft = Math.round(startScroll.current + delta * ratio);
        }
      };

      const onMouseUp = () => {
        dragging.current = false;
        document.body.style.userSelect = '';
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }, [container, orientation]);

    const onThumbMouseDown = (e: React.MouseEvent) => {
      if (!container || !thumbRef.current) return;
      dragging.current = true;
      document.body.style.userSelect = 'none';
      if (orientation === 'vertical') {
        dragStart.current = e.clientY;
        startScroll.current = container.scrollTop;
      } else {
        dragStart.current = e.clientX;
        startScroll.current = container.scrollLeft;
      }
    };

    const baseClass =
      'absolute z-50 touch-none select-none transition-colors pointer-events-auto';
    const verticalClass =
      'top-0 right-0 h-full w-2.5 border-l border-l-transparent p-[1px] flex';
    const horizontalClass =
      'left-0 bottom-0 h-2.5 w-full border-t border-t-transparent p-[1px] flex';

    return (
      <div
        ref={(node) => {
          // support forwarded ref
          // @ts-ignore
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          localRef.current = node;
        }}
        className={concatClassNames(
          baseClass,
          orientation === 'vertical' ? verticalClass : horizontalClass,
          className
        )}
        style={
          orientation === 'vertical'
            ? { right: 0, top: 0, bottom: 0, width: 10 }
            : { left: 0, bottom: 0, right: 0, height: 10 }
        }
        {...props}
      >
        <div
          ref={thumbRef}
          onMouseDown={onThumbMouseDown}
          className="relative flex-1 rounded-full bg-border"
          style={
            orientation === 'vertical'
              ? { width: '100%', transform: 'translateY(0)', willChange: 'transform' }
              : { height: '100%', transform: 'translateX(0)', willChange: 'transform' }
          }
        />
      </div>
    );
  }
);

ScrollBar.displayName = 'ScrollBar';

export { ScrollArea, ScrollBar };
