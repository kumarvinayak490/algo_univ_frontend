import { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

const Container = ({ children, className, ...rest }: ContainerProps) => {
  console.log(import.meta.env.BASE_URL);
  return (
    <div
      className={classNames("min-h-[calc(100vh-5rem)]", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Container;
