import { useState } from "react";
import arrowLeft from "../../assets/arrow-left.svg";
import arrowRight from "../../assets/arrow-right.svg";

interface GalleryProps {
  images: { src: string }[];
  className?: string;
  width?: string | number;
  height?: string | number;
  radius?: string;
  showThumbs?: boolean;
  /** Bolinhas de posição abaixo do slide (usadas no banner da home, como no Figma). */
  showDots?: boolean;
}

const toPx = (value: string | number) => (typeof value === "number" ? `${value}px` : value.endsWith("px") ? value : `${value}px`);

export default function Gallery({
  images,
  className = "",
  width = "100%",
  height = 681,
  radius = "0px",
  showThumbs = false,
  showDots = false,
}: GalleryProps) {
  const [current, setCurrent] = useState(0);
  const isFirst = current === 0;
  const isLast = current === images.length - 1;

  // Largura/altura viram proporção, então o slide encolhe em telas menores sem distorcer
  const numericW = parseFloat(String(width));
  const numericH = parseFloat(String(height));
  const aspectRatio = !Number.isNaN(numericW) && String(width) !== "100%" ? `${numericW} / ${numericH}` : `1440 / ${numericH}`;

  const arrowClass =
    "absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full transition hover:bg-white/60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div className={className} style={{ width: String(width) === "100%" ? "100%" : toPx(width), maxWidth: "100%" }}>
      <div className="relative overflow-hidden" style={{ aspectRatio, borderRadius: radius }}>
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={`Imagem ${index + 1} de ${images.length}`}
              aria-hidden={index !== current}
              className="h-full w-full shrink-0 object-cover"
            />
          ))}
        </div>

        <button
          type="button"
          className={`${arrowClass} left-2 md:left-6`}
          onClick={() => setCurrent((i) => i - 1)}
          disabled={isFirst}
          aria-label="Imagem anterior"
        >
          <img src={arrowLeft} alt="" />
        </button>
        <button
          type="button"
          className={`${arrowClass} right-2 md:right-6`}
          onClick={() => setCurrent((i) => i + 1)}
          disabled={isLast}
          aria-label="Próxima imagem"
        >
          <img src={arrowRight} alt="" />
        </button>

        {showDots && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Ir para imagem ${index + 1}`}
                onClick={() => setCurrent(index)}
                className={`size-3 rounded-full transition-colors ${index === current ? "bg-primary" : "bg-light-gray-2"}`}
              />
            ))}
          </div>
        )}
      </div>

      {showThumbs && (
        <div className="mt-5 flex gap-3 overflow-x-auto pb-1 md:gap-5">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Ver imagem ${index + 1}`}
              aria-current={index === current}
              className={`shrink-0 overflow-hidden border-2 ${index === current ? "border-primary" : "border-transparent"}`}
              style={{ borderRadius: radius }}
            >
              <img src={image.src} alt="" className="h-[60px] w-[74px] object-cover md:h-[95px] md:w-[117px]" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
