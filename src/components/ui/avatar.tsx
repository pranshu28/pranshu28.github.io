"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { getImageProps } from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

// const AvatarImage = React.forwardRef<
//   React.ElementRef<typeof AvatarPrimitive.Image>,
//   React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
// >(({ className, ...props }, ref) => (
//   <AvatarPrimitive.Image
//     ref={ref}
//     className={cn("aspect-square h-full w-full", className)}
//     {...props}
//   />
// ));
// AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// ref: https://github.com/radix-ui/primitives/issues/2230#issuecomment-2568587173
type AvatarImageProps = {
  src?: string;
  alt: string;
  /** Default `contain` (logos, letterboxing). Use `cover` to fill circular crops. */
  objectFit?: "contain" | "cover";
  /** Passed to the underlying img `object-position` (e.g. `center 25%` for portraits). */
  objectPosition?: string;
  priority?: boolean;
} & React.ComponentProps<typeof AvatarPrimitive.Image>;

function AvatarImage({
  src,
  alt,
  className,
  objectFit = "contain",
  objectPosition,
  priority,
  ...rest
}: AvatarImageProps) {
  if (!src) return null;
  const { props } = getImageProps({
    src,
    alt,
    fill: true,
    priority,
    style: {
      objectFit,
      ...(objectPosition ? { objectPosition } : {}),
    },
  });
  return (
    <AvatarPrimitive.Image
      {...props}
      {...rest}
      className={cn("h-full w-full", className)}
    />
  );
}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "bg-muted flex h-full w-full items-center justify-center rounded-full",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
