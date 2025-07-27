"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface IconButtonProps {
  icon?: ReactNode;
  imgSrc?: string;
  alt?: string;
  title?: string;
  onClick?: () => void;
  size?: number;
}

const IconButton = ({
  icon,
  imgSrc,
  alt = "",
  title = "",
  onClick,
  size = 14,
}: IconButtonProps) => {
  return (
    <button
      className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
      onClick={onClick}
      title={title}
    >
      {imgSrc ? (
        <Image src={imgSrc} alt={alt} width={size} height={size} />
      ) : (
        icon
      )}
    </button>
  );
};

export default IconButton;
