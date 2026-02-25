import { de } from "zod/locales";

interface FundFormProps {
    onSubmit: (data: FundFormData) => void;
    onCancel: () => void;
    isPending: boolean;
}
const FundForm = ({ onSubmit, onCancel, isPending }: FundFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FundFormData>({
        resolver: zodResolver(fundSchema),
        defaultValues: {
            name: '',
            type: '주식형',
            nav: 0,
            status: '운용중'
        }
    });
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <div className="flex gap-4 items-end flex-wrap">
                {/* 펀드명 */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">펀드명</label>
                    <input type="text" {...register('name')} className="border rounded px-3 py-2 w-full" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
            </div>
        </form>    
    )
}

export default FundForm