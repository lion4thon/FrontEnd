import { useEffect, useRef, useState } from "react";
import PackageCard from "../PackageCard/PackageCard";
import * as HS from "./HorizontalSection.style";

type PackageItem = React.ComponentProps<typeof PackageCard>["item"];

export default function HorizontalSection({
  title,
  items,
  keyPrefix,
}: {
  title: string;
  items: PackageItem[];
  keyPrefix: string;
}) {
  const vpRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const recalc = () => {
    const vp = vpRef.current;
    if (!vp) return;
    const overflow = vp.scrollWidth > vp.clientWidth + 2;
    setHasOverflow(overflow);
    setAtStart(vp.scrollLeft <= 2);
    setAtEnd(vp.scrollLeft + vp.clientWidth >= vp.scrollWidth - 2);
  };

  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    const vp = vpRef.current;
    if (vp) ro.observe(vp);
    return () => ro.disconnect();
  }, [items]);

  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const onScroll = () => recalc();
    vp.addEventListener("scroll", onScroll, { passive: true });
    return () => vp.removeEventListener("scroll", onScroll);
  }, []);

  const move = (dir: 1 | -1) => {
    const vp = vpRef.current;
    if (!vp) return;
    const probe = vp.querySelector<HTMLElement>("[data-probe-card]");
    const step = probe
      ? probe.offsetWidth + 20
      : Math.floor(vp.clientWidth * 0.9);
    vp.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <>
      <h2
        style={{
          fontSize: 26,
          fontWeight: 500,
          color: "#1a1a1a",
          marginTop: 30,
          paddingLeft: 20,
        }}
      >
        {title}
      </h2>

      <HS.Wrap>
        {hasOverflow && (
          <HS.PrevBtn
            data-disabled={atStart}
            onClick={() => move(-1)}
            aria-label="prev"
            title="이전"
          >
            ‹
          </HS.PrevBtn>
        )}

        <HS.Clipper>
          <HS.Scroller ref={vpRef}>
            <HS.Rail>
              {items.map((it, i) => (
                <HS.Item key={`${keyPrefix}${it.id}-${i}`}>
                  <div data-probe-card={i === 0 || undefined}>
                    <PackageCard item={it} />
                  </div>
                </HS.Item>
              ))}
            </HS.Rail>
          </HS.Scroller>
        </HS.Clipper>

        {hasOverflow && (
          <HS.NextBtn
            data-disabled={atEnd}
            onClick={() => move(1)}
            aria-label="next"
            title="다음"
          >
            ›
          </HS.NextBtn>
        )}
      </HS.Wrap>
    </>
  );
}
