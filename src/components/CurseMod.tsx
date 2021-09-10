import React, {ReactElement} from "react";


interface Author  { name: string, url: string };

export interface ModProps {

    name: string;
    author: Author[]
    homepage: string;
    logo: string;
    downloads: string;
    summary: string;
}

export default function ModCard({modData} : {modData:ModProps}): ReactElement {

    function truncate(str: string, max:number = 100): string {

        return str.length > max ? `${str.substring(0, max)}...` : str;
    }

    function Author({author, index}: {author: Author, index: number}): ReactElement {
        return <>
            <a href={author.url} className="hover:text-yellow-600 font-bold text-xl">{author.name}</a>
            {index != modData.author.length - 1 ? ', ' : ''}
        </>
    }

    return (
        <div className="flex gap-x-4 p-2 border-2 border-yellow-700 bg-yellow-900 bg-opacity-25">

            <img src={modData.logo} className="flex-none w-32 h-32 my-auto bg-[#1F1F1F] border border-yellow-700" width="128px" height="128px"/>

            <div className="flex-grow">
                <a className="text-3xl hover:text-yellow-600 font-medium" href={modData.homepage} target={"_blank"}>{truncate(modData.name, 25)}</a>
                <p>{"By "} {modData.author.map((val: Author, index) => <Author author={val} index={index} key={val.name}/>)}</p>
                <p className="text-lg">{truncate(modData.summary)}</p>
            </div>
        </div>
    );
}