import { cn } from "@/utils/cn";
import Image from "next/image";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-8xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    image,
}: {
    className?: string;
    title: string;
    image: string;
}) => {
    return (
        <div
            className={cn(
                "relative row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 cursor-pointer",
                className
            )}
        >
            <Image src={image} alt={title} className="absolute w-full h-full object-cover rounded-xl" width={300} height={300} />
            <div className="relative w-full h-full group-hover/bento:translate-x-2 transition duration-200">
                <div className="flex absolute w-full h-full font-bold text-5xl text-center text-white justify-center items-center">
                    {title}
                </div>
            </div>
        </div>
    );
};
