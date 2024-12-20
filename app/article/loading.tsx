'use client'
import Image from "next/image";

const Loading = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <Image className="a" src="/loader.svg" alt={"loading"} width={0} height={0} style={{width: '10%', height: 'auto'}} />
        </div>
    )
}
export default Loading;