import * as React from 'react';

// Utility function to handle conditional class names (replaces cn utility)
const classNames = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const buttonVariants = ({
  variant,
  size,
  className,
}: {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}) => {
  const baseStyles =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

  const variantStyles = {
    default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
    outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  const sizeStyles = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9',
  };

  return classNames(baseStyles, variant && variantStyles[variant], size && sizeStyles[size], className);
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {

  const Comp = asChild ? 'span' : 'button'; 

  return (
    <Comp
      className={buttonVariants({ variant, size, className })}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export default Button ;
