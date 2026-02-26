import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet,FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const ServerStatus = () => {
    const [isShowForm, setIsShowForm] = useState(false);
    return (
        <div>
            <h1>서버 상태</h1>
            <p>서버의 현재 상태를 확인할 수 있는 페이지입니다.</p>
            <Button variant="outline" onClick={() => setIsShowForm(prev => !prev)}>
            {isShowForm ? "폼 닫기" : "펀드 추가"}
            </Button>
            {isShowForm && 
                <div className="w-full px-100 py-4 mt-4 bg-gray-200 rounded">
                    <form  className="bg-blue-50 border border-gray-200 rounded p-4 mb-6">
                        <FieldGroup className="flex gap-4 items-end flex-wrap">
                            <Field className="mb-2">
                                <FieldLabel htmlFor="fundName">펀드명</FieldLabel>
                                <Input 
                                    type="text" 
                                    id="fundName" 
                                    name="fundName" 
                                    placeholder="펀드명을 입력하세요" 
                                />                                
                            </Field>
                            <Field className="mb-2">
                                <FieldLabel htmlFor="fundType">펀드 유형</FieldLabel>
                                <Select name="fundType">
                                    <SelectTrigger id="fundType">
                                        <SelectValue placeholder="유형 선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="stock">주식형</SelectItem>
                                        <SelectItem value="bond">채권형</SelectItem>
                                        <SelectItem value="mixed">혼합형</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </FieldGroup>
                        <Button type="submit" className="mt-4">펀드 추가</Button>
                    </form>
                    <Button variant="link" onClick={() => setIsShowForm(false)} className="ml-4">폼 닫기</Button>
                </div>
            }
        </div>
    );
};

export default ServerStatus;
