const Icon = ({
  icon,
  size,
  sharedStyles,
  ...props
}: {
  icon: string;
  size?: "xs" | "sm" | "md" | "lg";
  sharedStyles?: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  switch (size) {
    case "xs":
      return (
        <img
          draggable
          className={`h-6 w-6 ${sharedStyles}`}
          src={`/${icon}.svg`}
          width='10px'
          height='10px'
          {...props}
        />
      );

    case "sm":
      return (
        <img draggable className='h-8 w-8' src={`/${icon}.svg`} {...props} />
      );
    case "md":
      return (
        <img draggable className='h-12 w-12' src={`/${icon}.svg`} {...props} />
      );
    case "lg":
      return (
        <img
          draggable
          className={`h-20 w-20 ${sharedStyles}`}
          src={`/${icon}.svg`}
          {...props}
        />
      );
    default:
      return (
        <img
          draggable
          className={`h-8 w-8 ${sharedStyles}`}
          src={`/${icon}.svg`}
          {...props}
        />
      );
  }
};

{
  /* <Icon icon=""/> */
}

export default Icon;
