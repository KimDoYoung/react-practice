import { Button } from '@/components/ui/button'

export default function ButtonPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Button</h1>

            <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-slate-700">variant</h2>
                <div className="flex gap-3 flex-wrap">
                    <Button variant="default">     default     </Button>
                    <Button variant="secondary">   secondary   </Button>
                    <Button variant="outline">     outline     </Button>
                    <Button variant="ghost">       ghost       </Button>
                    <Button variant="destructive"> destructive </Button>
                    <Button variant="link">        link        </Button>
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-slate-700">size</h2>
                <div className="flex gap-3 items-center flex-wrap">
                    <Button size="lg">      large   </Button>
                    <Button size="default"> default </Button>
                    <Button size="sm">      small   </Button>
                    <Button size="icon">    🔔      </Button>
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-slate-700">상태</h2>
                <div className="flex gap-3 flex-wrap">
                    <Button>정상</Button>
                    <Button disabled>disabled</Button>
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-slate-700">OMS 실전 예시</h2>
                <div className="flex gap-3 flex-wrap">
                    <Button variant="default">     + 주문 등록 </Button>
                    <Button variant="outline">       조회      </Button>
                    <Button variant="secondary">     수정      </Button>
                    <Button variant="destructive">   삭제      </Button>
                    <Button variant="ghost" size="sm"> 취소    </Button>
                </div>
            </section>
        </div>
    )
}