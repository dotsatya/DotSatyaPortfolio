"use client";
import Image, { StaticImageData } from "next/image";

type PhotoCardProps = {
  imageUrl: StaticImageData;
};

const PhotoCard = ({ imageUrl }: PhotoCardProps) => {
  return (
    <div
      className="
        relative overflow-hidden rounded-2xl
        shadow-md shadow-neutral-400 dark:shadow-black
        transition-transform duration-300 ease-in-out
        lg:hover:-translate-y-2
        break-inside-avoid mb-8
        border border-neutral-400/30 dark:border-neutral-600/30
        group
      "
    >
      <Image
        src={imageUrl}
        alt=""
        className="w-full h-auto object-cover block"
      />
    </div>
  );
};

export default PhotoCard;
