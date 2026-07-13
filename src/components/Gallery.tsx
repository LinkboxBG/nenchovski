import { Lightbox } from "@/components/Lightbox";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
}

/** Server wrapper: подава снимките на клиентския Lightbox (решетка + preview). */
export function Gallery({ images, title = "От нашата работа" }: GalleryProps) {
  if (!images?.length) return null;

  return (
    <section aria-labelledby="gallery-h" className="my-12" data-reveal>
      <h2 id="gallery-h" className="mb-1 text-2xl">
        {title}
      </h2>
      <div className="mb-5 h-1 w-12 rounded-full bg-primary" aria-hidden />
      <Lightbox images={images} />
    </section>
  );
}
