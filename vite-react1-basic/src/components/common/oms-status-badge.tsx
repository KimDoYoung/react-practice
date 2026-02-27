import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/class-utils";
import { CheckCircle2, AlertCircle, Clock, Info, type LucideIcon, BanIcon } from "lucide-react";

/** 
 * 1. 스타일 매핑(CVA): 상태별 스타일 정의
 * 2. 아이콘 매핑: 상태별 아이콘 정의
 * 3. 컴포넌트 구현: CVA와 아이콘 매핑을 활용하여 상태 배지 구현
 */
const badgeVariants = cva(
    "inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium",
    {
        variants: {
            status: {
                success: "bg-green-100 text-green-800",
                error: "bg-red-100 text-red-800",
                warning: "bg-yellow-100 text-yellow-800",
                info: "bg-blue-100 text-blue-800",
                pending: "bg-gray-100 text-gray-800",
                default: "bg-gray-100 text-gray-800",
            },
        },
        defaultVariants: {
            status: null,
        },
    }
);



/**
 * 2. 타입 interface 정의: CVA의 VariantProps를 확장하여 컴포넌트에 필요한 props 정의
 * - label: 배지에 표시할 텍스트
 * - status: CVA에서 정의한 상태 타입 (success, error, warning, info)
 */
export interface OmsStatusBadgeProps extends React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof badgeVariants> {
    
        label: string;
        showIcon?: boolean; // 아이콘 표시 여부를 제어하는 선택적 prop
}

/**
 * 컴포넌트 구현: CVA와 아이콘 매핑을 활용하여 상태 배지 구현
 * - badgeVariants: CVA로 정의한 스타일을 적용
 * - statusIcons: 상태에 따른 아이콘을 렌더링
 */ 
export const OmsStatusBadge: React.FC<OmsStatusBadgeProps> = ({
    label,
    status,
    showIcon = false, // 기본값은 false로 설정하여 아이콘이 기본적으로 표시되지 않도록 함
    className,
    ...props
}) => {
    const icons : Record<string, LucideIcon | null> = {
        success: Clock,
        error: BanIcon,
        warning: AlertCircle,
        info: Info,
        pending: Info,
        default: null,
    }
    const Icon = icons[status ?? "default"] || icons.default;
    return (
        <div className={cn(badgeVariants({ status }), className)} {...props}>
            {showIcon && Icon && <Icon className="mr-1 h-3 w-3" />} {/* showIcon이 true일 때만 아이콘 렌더링 */}
            {label}
        </div>
    );
};
