import React, {ReactElement} from "react";
import Image from "next/image";

interface Author  { name: string, url: string }

export interface ModProps {

    name: string;
    author: Author[]
    homepage: string;
    logo: string;
    downloads: string;
    summary: string;
}

export default function ModCard({modData} : {modData:ModProps}): ReactElement {

    function truncate(str: string, max = 100): string {

        return str.length > max ? `${str.substring(0, max)}...` : str;
    }

    function Author({author, index}: {author: Author, index: number}): ReactElement {
        return <>
            <a href={author.url} className="hover:text-yellow-600 font-bold text-base sm:text-xl">{author.name}</a>
            {index != modData.author.length - 1 ? ', ' : ''}
        </>
    }

    return (
        <div className="flex gap-x-4 p-2 border-2 border-yellow-700 bg-yellow-900 bg-opacity-25">

            <div className={`flex-none w-32 h-32 my-auto`}>
                <Image src={modData.logo} width={128} height={128} className="bg-[#1F1F1F] border border-yellow-700" alt={`${modData.name} logo`}/>
            </div>
            
            <div className="flex-grow">
                <a className="text-xl sm:text-2xl lg:text-3xl hover:text-yellow-600 font-medium" href={modData.homepage} target={"_blank"} rel="noreferrer">{truncate(modData.name, 25)}</a>
                <p className="text-lg lg:text-xl">{"By "} {modData.author.map((val: Author, index) => <Author author={val} index={index} key={val.name}/>)}</p>
                <p className="text-sm sm:text-base lg:text-lg">{truncate(modData.summary)}</p>
            </div>
        </div>
    );
}