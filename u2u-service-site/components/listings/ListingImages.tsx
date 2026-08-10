"use client";

import { useRef, useState, type UIEvent } from "react";

type ListingImagesProps = {
  images: string[];
  title: string;
};

export function ListingImages({ images, title }: ListingImagesProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function updateActiveImage(event: UIEvent<HTMLDivElement>) {
    const element = event.currentTarget;
    if (element.clientWidth === 0) return;
    setActiveIndex(Math.round(element.scrollLeft / element.clientWidth));
  }

  function showImage(index: number) {
    const element = scroller.current;
    if (!element) return;
    element.scrollTo({ left: element.clientWidth * index, behavior: "smooth" });
  }

  if (images.length === 0) {
    return (
      <div className="listing-hero-fallback" aria-label="画像なし">
        <span aria-hidden="true">▧</span>
      </div>
    );
  }

  return (
    <section className="listing-media" aria-label="投稿画像">
      <div className="listing-image-scroller" ref={scroller} onScroll={updateActiveImage}>
        {images.map((image, index) => (
          <div className="listing-image-slide" key={image}>
            <img
              src={image}
              alt={index === 0 ? title : `${title}の画像 ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <>
          <span className="listing-image-count">
            {activeIndex + 1}/{images.length}
          </span>
          <div className="listing-image-dots" aria-label="表示する画像">
            {images.map((image, index) => (
              <button
                className={index === activeIndex ? "is-active" : ""}
                key={image}
                type="button"
                aria-label={`${index + 1}枚目を表示`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => showImage(index)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
