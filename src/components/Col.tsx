import { VariantProps, cva } from "class-variance-authority";

const colStyles = cva("flex flex-col", {
  variants: {
    intent: {
      col: "flex-col",
      reverse: "flex-col-reverse",
      fit: "w-fit h-fit",

      center: "justify-center items-center",
    },
    x: {
      full: "w-full",
      screen: "w-screen",
      content: "w-fit",
    },
    y: {
      full: "h-full",
      screen: "h-screen",
      content: "h-fit",
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
    intent: "center",
    x: "full",
    y: "full",
  },
});

type ComponentType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type Props = ComponentType & VariantProps<typeof colStyles>;

const Col = ({ className, intent, x, y, p, pX, pY, children }: Props) => {
  return (
    <div className={colStyles({ className, intent, x, y, p, pX, pY })}>
      {children}
    </div>
  );
};

export default Col;
