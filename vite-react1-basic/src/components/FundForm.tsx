import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { fundSchema, type FundFormData } from "@/types/fund";

import {
    Field,
    FieldLabel,
    FieldError,
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


interface Props {
    onSubmit: (data: FundFormData) => void;
    onCancel: () => void;
    isPending: boolean;
}

const FundForm: React.FC<Props> = ({ onSubmit, onCancel, isPending }: Props) => {
    const form = useForm<FundFormData>({
        resolver: zodResolver(fundSchema),
        defaultValues: {
            name:"",
            type: "주식형",
            nav: 0,
            status: '운용중',
        },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-200 bg-gray-50 border border-gray-200 rounded p-4 mb-6">
            <FieldGroup className="flex gap-4 items-end flex-wrap">
                {/* 펀드명 */}
                <Controller
                   name="name"
                   control={form.control}
                   render={({ field, fieldState }) => (
                       <Field data-invalid={fieldState.invalid}>
                           <FieldLabel>펀드명</FieldLabel>
                           <Input 
                            {...field} 
                            id="name"
                            aria-invalid={fieldState.invalid}
                            placeholder="펀드명을 입력하세요"
                            disabled={isPending}
                           />
                           {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                       </Field>
                   )}
                />
                {/* 펀드유형 */}
                <Controller
                   name="type"
                   control={form.control}
                   render={({ field, fieldState }) => (
                       <Field data-invalid={fieldState.invalid}>
                           <FieldLabel>펀드유형</FieldLabel>
                           <Select 
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={isPending}
                           >
                               <SelectTrigger
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                               >
                                   <SelectValue placeholder="펀드유형을 선택하세요" />
                               </SelectTrigger>
                               <SelectContent>
                                   <SelectItem value="주식형">주식형</SelectItem>
                                   <SelectItem value="채권형">채권형</SelectItem>
                                   <SelectItem value="혼합형">혼합형</SelectItem>
                                   <SelectItem value="부동산형">부동산형</SelectItem>
                                    <SelectItem value="기타">기타</SelectItem>
                               </SelectContent>
                           </Select>
                           {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                       </Field>
                   )}
                />
                {/* 기준가 */}
                <Controller
                   name="nav"
                   control={form.control}
                   render={({ field, fieldState }) => (
                       <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>기준가</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="number"
                                aria-invalid={fieldState.invalid}
                                placeholder="기준가를 입력하세요"
                                step= "0.01"
                                onChange={(e)=> field.onChange(e.target.valueAsNumber)}
                            />
                            <FieldDescription> 양수만 가능(단위: 원)</FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                       </Field>
                   )}
                />
                {/* 운용상태 */}
                <Controller
                   name="status"
                   control={form.control}
                   render={({ field, fieldState }) => (
                       <Field data-invalid={fieldState.invalid}>
                           <FieldLabel>운용상태</FieldLabel>
                           <Select 
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={isPending}
                           >
                               <SelectTrigger
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                               >
                                   <SelectValue placeholder="운용상태를 선택하세요" />
                               </SelectTrigger>
                               <SelectContent>
                                   <SelectItem value="운용중">운용중</SelectItem>
                                   <SelectItem value="청산">청산</SelectItem>
                               </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                       </Field>
                   )}
                />
                {/* 버튼 */}
                <Field orientation="horizontal" className="flex gap-2 justify-end">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "저장 중..." : "저장"}
                    </Button>
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
                        취소
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    );
}

export default FundForm;