import { PropsWithChildren } from "react"

export interface LayoutProps extends PropsWithChildren {
    selected : number
    onSelectChange: (id:number)=>void 
}