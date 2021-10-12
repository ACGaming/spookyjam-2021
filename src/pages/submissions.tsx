import {GetStaticPropsResult} from "next";
import React, {ReactElement} from "react";
import Layout from "../components/Layout";
import {ModProps} from "../components/CurseMod";
import SubmissionBox from "components/SubmissionsBox";
import axios from 'axios';
import NavLink from "../components/NavLink";
import {NextSeo} from "next-seo";

const projectIds = {

    twentyone: [
        533254,
        534052,
        534284,
        533925,
        534540,
        535093,
        534968
    ],

    twenty: [
        410697,
        411673,
        411857,
        414045,
        413954,
        410871,
        411203,
        414159,
        414417,
        414256,
        414324,
        411301
    ],

    nineteen: [
        345317,
        347445,
        349115,
        349217,
        349276,
        345857,
        349597,
        349588,
        349811,
        349850,
        349880
    ],

    eightteen: [
        304393,
        304644,
        304719,
        304484,
        304170,
        304694,
        304796,
        304817,
        304875,
        304879,
        304877,
        304894,
        304036,
        304881
    ],

    seventeen: [
        279311,
        279120,
        280003,
        279312,
        279223,
        279200
    ]
}

export default function Home(props: StaticProps): ReactElement {

    return (<>
        <NextSeo
            title="SpookyJam 2021"
            description="An annual ModJam held in celebration of the fall season. Hosted by MMD."
            canonical="https://spookyjam.mcmoddev.com/submissions"
            openGraph={{
                url: 'https://spookyjam.mcmoddev.com/submissions',
                title: 'SpookyJam 2021',
                description: 'An annual ModJam held in celebration of the fall season. Hosted by MMD.',
                site_name: 'SpookyJam 2021',
                images: [
                    {
                        url: `https://spookyjam.mcmoddev.com/og_image.png`,
                        width: 400,
                        height: 400,
                        alt: `SpookyJam logo`,
                    }
                ]
            }}
            twitter={{
                handle: '@MCModDev',
                cardType: 'summary_large_image',
            }}

            additionalMetaTags={[
                {
                    name: 'theme-color',
                    content: '#a16207'
                }
            ]}
        />
        <Layout title = "Submissions">
            <div className="bg-gray-800 text-gray-200 text-xl flex flex-col gap-y-5">

                <SubmissionBox name = "2021" entries = {props.twentyone }>
                    <p className='text-base sm:text-2xl'>
                        Submissions for our 2021 event will be open from October 1st until October 31st. You can submit your project <NavLink title = "here" location = "https://forms.gle/mkKt2TC8PdpVbzVx9" inline={true}/>.
                    </p>
                </SubmissionBox>
                <SubmissionBox name = "2020" entries = { props.twenty } />
                <SubmissionBox name = "2019" entries = { props.nineteen } />
                <SubmissionBox name = "2018" entries = { props.eighteen } />
                <SubmissionBox name = "2017" entries = { props.seventeen } />
            </div>
        </Layout>
        </>
    );
}

type CurseStub = {
    name: string;
    authors: { name: string, url: string }[]
    websiteUrl: string;
    summary: string;
    downloadCount: string;
    attachments: { isDefault: boolean, url: string }[];
    modLoaders: string[];
}

async function fetchModData(curseId: number): Promise<ModProps> {

    return axios.get<CurseStub>(`https://addons-ecs.forgesvc.net/api/v2/addon/${curseId}`).then(res => {

        return {
            name: res.data.name,
            author: res.data.authors.map(auth => {
                return { name: auth.name, url: auth.url }
            }),
            homepage: res.data.websiteUrl,
            logo: res.data.attachments.filter(a => a.isDefault)[0].url,
            downloads: res.data.downloadCount,
            summary: res.data.summary,
            modLoaders: res.data.modLoaders ?? new Array<string>()
        };
    }).catch(err => {
        console.log(err);
        return {
            name: 'Unknown Mod',
            author: [{ name: "Unknown", url: "https://example.com" }],
            homepage: 'https://www.curseforge.com/minecraft',
            logo: 'https://media.forgecdn.net/avatars/84/193/636193647832736518.gif',
            downloads: '-1',
            summary: `Could not get data for modId ${curseId}.`,
            modLoaders: new Array<string>()
        }
    });

}

interface StaticProps {

    twentyone: ModProps[]
    twenty: ModProps[]
    nineteen: ModProps[]
    eighteen: ModProps[]
    seventeen: ModProps[]
}

export async function getStaticProps(): Promise<GetStaticPropsResult<StaticProps>> {

    const mods2021: ModProps[] = [];

    for (const id of projectIds.twentyone) {
        mods2021.push(await fetchModData(id));
    }

    const mods2020: ModProps[] = [];

    for (const id of projectIds.twenty) {
        mods2020.push(await fetchModData(id));
    }

    const mods2019: ModProps[] = [];

    for (const id of projectIds.nineteen) {
        mods2019.push(await fetchModData(id));
    }

    const mods2018: ModProps[] = [];

    for (const id of projectIds.eightteen) {
        mods2018.push(await fetchModData(id));
    }

    const mods2017: ModProps[] = [];

    for (const id of projectIds.seventeen) {
        mods2017.push(await fetchModData(id));
    }

    return {
        props: {
            twentyone: mods2021,
            twenty: mods2020,
            nineteen: mods2019,
            eighteen: mods2018,
            seventeen: mods2017
        },

        revalidate: 6 * 60 * 60
    };
}
