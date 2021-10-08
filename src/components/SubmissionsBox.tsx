import React, {ReactElement, useEffect} from "react";
import ModCard, {ModProps} from "../components/CurseMod";

export interface BoxProps {

    name: string;
    entries: ModProps[]
}

export default function SubmissionBox({ children, name, entries }: React.PropsWithChildren<BoxProps>): ReactElement {

    useEffect(() => {
        shuffleArray(entries)
    }, [entries])

    return (
        <div className="mb-6 sm:mb-12 p-2 w-full">

            <h2 className="mt-0" id={name}>{name}</h2>

            <div className="">
                {children}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 sm:gap-x-6 mt-6">

                {
                    (entries || []).map(mod => (<ModCard modData={mod} key={mod.name} />))
                }

            </div>
        </div>
    );
}

function shuffleArray(array: ModProps[]) {

    if (!array) { return array; }

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}