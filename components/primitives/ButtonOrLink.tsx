import { ComponentProps } from "react";

export type ButtonOrLinkProps = ComponentProps<"button"> & ComponentProps<"a">;

export function ButtonOrLink({ href, ...props }: ButtonOrLinkProps) {
  const isLink = typeof href !== "undefined";
  const ButtonOrLink = isLink ? "a" : "button";

  let content = <ButtonOrLink {...props} />;

  if (isLink) {
    return <a href={href}>{content}</a>;
  }

  return content;
}
