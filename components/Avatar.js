import clsx from "clsx"
import Image from "next/image"

const Avatar = ({ className, src, alt, ...props }) => {
  return <Image
    className={clsx(className, "rounded-full h-32")}
    loading="eager"
    width={128}
    height={128}
    src={src}
    alt={alt}
    placeholder="blur"
    blurDataURL={src}
    {...props}
  />
}

export default Avatar
