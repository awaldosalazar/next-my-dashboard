'use client';

import { IoCalculatorOutline } from "react-icons/io5"
import { SimpleWidget } from "./SimpleWidget"
import { IWidgetsGrid } from "./interfaces/Widget"
import { useAppSelector } from '@/store';


const currentWidgets: IWidgetsGrid[] = [
    {
        label: "Contador",
        title: "Contador",
        subtitle: "administra el contador",
        icon: <IoCalculatorOutline size={50} className="text-blue-500" />,
        href: "/dashboard/counter",
    }
]

export const WidgetsGrid = () => {
    const { count } = useAppSelector(state => state.counter);
    return (
        <div className="flex flex-wrap gap-3 justify-around">
            {
                currentWidgets.map(({
                    label,
                    title,
                    subtitle,
                    icon,
                    href,
                }, index) => (
                    <SimpleWidget
                        key={index}
                        label={label}
                        title={`${count}`}
                        subtitle={subtitle}
                        icon={icon}
                        href={href}
                    />
                ))
            }
        </div>
    )
}
