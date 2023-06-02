import { VariantProps, cva } from "class-variance-authority";

const rowStyles = cva("flex flex-row justify-around", {
  variants: {
    intent: {
      row: "flex-row",
      reverse: "flex-row-reverse",
      fit: "w-fit h-fit",
      center: "justify-center items-center",
      reset: "",
    },
    x: {
      full: "w-full",
      screen: "w-screen",
    },
    y: {
      full: "h-full",
      screen: "h-screen",
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
type Props = ComponentType & VariantProps<typeof rowStyles>;

const Row = ({ className, intent, x, y, p, pX, pY, children }: Props) => {
  return (
    <div className={rowStyles({ className, intent, x, y, p, pX, pY })}>
      {children}
    </div>
  );
};

export default Row;
