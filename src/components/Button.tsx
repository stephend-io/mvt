import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import Icon, { iconStyles } from "./Icon";

const buttonStyles = cva("transition-all ", {
  variants: {
    intent: {
      standard: "",
      static: "",
      disabled: "",
      primary: "",
      secondary: "",
      highlight: "",
      darkPrimary: "",
      darkSecondary: "",
    },
    size: {
      xs: "w-4 h-4",
      s: "w-8 h-8",
      m: "w-12 h-12",
      l: "w-20 h-20",
      xl: "w-32 h-32",
      xxl: "w-40 h-40",
      xxxl: "w-60 h-60",
      xxxxl: "w-80 h-86",
      free: "",
    },
    active: {
      standard: "opacity-100 saturate-150",
    },
    hover: {
      standard: "opacity-80 scale-125",
    },
    transition: {
      standard: "delay-200",
      longer: "delay-300",
      xlonger: "delay-500",
      xxlonger: "delay-700",
      xxxlonger: "delay-1000",
    },
  },
  defaultVariants: {
    intent: "standard",
    size: "free",
  },
});

type ComponentType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type iconSizes = VariantProps<typeof iconStyles>["size"];
type AdditionalProps = {
  icon?: string;
  iconSize?: iconSizes;
  iconContent?: JSX.Element;
  iconClassName?: string;
};
type Props = ComponentType &
  AdditionalProps &
  VariantProps<typeof buttonStyles>;

export const ButtonWithIcon = ({
  icon,
  iconSize,
  iconClassName,
  intent,
  size,
  active,
  hover,
  transition,
  iconContent,
  ...props
}: Required<Pick<Props, "icon">> & Props) => (
  <button
    className={buttonStyles({ intent, size, active, hover, transition })}
    {...props}
  >
    <Icon icon={icon} size={size} />
    {iconContent}
  </button>
);

export const Button = ({
  className,
  icon,
  iconSize,
  iconClassName,
  intent,
  size,
  active,
  hover,
  transition,
  children,
  ...props
}: Required<Pick<ComponentType, "children">> & Props) => {
  if (icon) {
    return (
      <button
        className={buttonStyles({
          className,
          intent,
          size,
          active,
          hover,
          transition,
        })}
        {...props}
      >
        {/* Reconsider taking both children and iconContent here */}
        <Icon icon={icon} size={iconSize} className={iconClassName} />
        {children}
      </button>
    );
  }
  return (
    <button
      className={buttonStyles({
        className,
        intent,
        size,
        active,
        hover,
        transition,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
