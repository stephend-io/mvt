import { VariantProps, cva } from "class-variance-authority";

const absoluteStyles = cva("absolute", {
  variants: {
    preset: {
      center: "left-[50vw] bottom-[50vh] -translate-x-1/2 translate-y-1/2",
    },
    x: {
      left: "left-0",
      leftSm: "left-2",
      leftMd: "left-4",
      leftLg: "left-8",
      leftXl: "left-12",
      leftXXl: "left-16",
      leftXXXl: "left-20",
      right: "right-0",
      rightSm: "right-2",
      rightMd: "right-4",
      rightLg: "right-8",
      rightXl: "right-12",
      rightXXl: "right-16",
      rightXXXl: "right-20",
    },
    y: {
      top: "top-0",
      topSm: "top-2",
      topMd: "top-4",
      topLg: "top-8",
      topXl: "top-12",
      topXXl: "top-16",
      topXXXl: "top-20",
      bottom: "bottom-0",
      bottomSm: "bottom-2",
      bottomMd: "bottom-4",
      bottomLg: "bottom-8",
      bottomXl: "bottom-12",
      bottomXXl: "bottom-16",
      bottomXXXl: "bottom-20",
    },
    p: {
      zero: "p-0",
      sm: "p-2",
      md: "p-4",
      lg: "p-8",
      xl: "p-12",
      xxl: "p-16",
      xxxl: "p-20",
    },
    pX: {
      sm: "px-2",
      md: "px-4",
      lg: "px-8",
      xl: "px-12",
      xxl: "px-16",
      xxxl: "px-20",
    },
    pY: {
      sm: "py-2",
      md: "py-4",
      lg: "py-8",
      xl: "py-12",
      xxl: "py-16",
      xxxl: "py-20",
    },
  },
  defaultVariants: {
    x: "leftMd",
    y: "topMd",
  },
});

type ComponentType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type Props = ComponentType & VariantProps<typeof absoluteStyles>;

const Absolute = ({
  preset,
  x,
  y,
  p,
  pX,
  pY,
  children,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={absoluteStyles({ className, preset, x, y, p, pX, pY })}
      {...props}
    >
      {children}
    </div>
  );
};

export default Absolute;
