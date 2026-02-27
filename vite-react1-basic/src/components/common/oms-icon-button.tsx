import { Loader2, type LucideIcon } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/class-utils';

interface OmsIconButtonProps extends ButtonProps {
  icon: LucideIcon;
  iconPlacement?: 'left' | 'right';
  isLoading?: boolean;
  label: string;
}


const OmsIconButton: React.FC<OmsIconButtonProps> = ({
  icon: Icon,
  iconPlacement = 'left',
  isLoading = false,
  label,
  variant,
  size,
  className,
  disabled,
  children,
  ...props
}) => {
  return (
    <Button
        variant={variant}
        size={size}
        className={cn("gap-2", className)}
        disabled={isLoading || disabled}
        {...props}
    >
        {isLoading ? (
            <Loader2 className="animate-spin" />
        ) : (
            <>
                {iconPlacement === 'left' && <Icon />}
                {label || children}
                {iconPlacement === 'right' && <Icon />}
            </>
        )}
    </Button>
  );
};

export default OmsIconButton;