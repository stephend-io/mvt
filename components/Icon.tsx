import { VariantProps, cva } from "class-variance-authority";

export const iconStyles = cva("", {
  variants: {
    defaultHovers: {
      true: "hover:cursor-pointer hover:opacity-70 hover:invert-[.50] hover:scale-125 transition-all hover:duration-200 active:opacity-100 active:invert-[0.1]",
      false: "hover:cursor-pointer",
    },
    intent: {
      static: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
      interactive: "",
      disabled: "grayscale",
      highlight: "",
      withText: "",
    },
    size: {
      xs: "w-4 h-4",
      s: "w-8 h-8",
      m: "w-12 h-12",
      l: "w-20 h-20",
      xl: "w-32 h-32",
      xxl: "w-40 h-40",
      xxxl: "w-60 h-60",
      xxxxl: "w-80 h-80",
      max: "w-full h-full",
      free: "",
    },
    alignment: {
      textTop: "flex flex-col",
      textBottom: "flex flex-col-reverse",
    },
  },
  defaultVariants: {
    intent: "interactive",
    size: "free",
    defaultHovers: true,
  },
});

// type ComponentType = Omit<HTMLImageElement, "src">;
type ComponentType = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
type textLocation = "top" | "bottom";
type Optional_WithText = { text?: string; textLocation?: textLocation };
type AdditionalProps = { icon: string; fillColor?: string } & Optional_WithText;
// type Props = AdditionalProps & VariantProps<typeof iconStyles>;
type Props = ComponentType & AdditionalProps & VariantProps<typeof iconStyles>;

const Icon = ({
  className,
  defaultHovers,
  fillColor,
  intent,
  size,
  icon,
  text,
  textLocation,
  alignment,
  ...props
}: Props) => {
  if (text) {
    return (
      <div
        className={iconStyles({ className, defaultHovers, intent, alignment })}
        {...props}
      >
        <img src={`${icon}.svg`} className={iconStyles({ size })} />
        {text}
      </div>
    );
  }

  return (
    <img
      src={`${icon}.svg`}
      className={iconStyles({ className, defaultHovers, intent, size })}
      {...props}
    />
  );
};

export default Icon;
