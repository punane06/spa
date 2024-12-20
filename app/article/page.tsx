'use client'
import { useEffect, useState } from "react";
import { ContentContainer } from "../components/ui/ContainerProps"
import { H1 } from "../components/ui/HeadingProps"
import Image from 'next/image'
import Loading from "./loading";

interface ArticleData {
    body: string;
    image: 
    {
        medium: string;
        title: string;
    };
    title: string;
    intro: string;
    paragraphs: string[];
    photo: string;
    tags: string[];
}

const Article = () => {
    const [articleData, setArticleData] = useState<ArticleData | null>(null);

    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const response = await fetch('https://proovitoo.twn.ee/api/list/972d2b8a');
                const data = await response.json();
                setArticleData(data);
            } catch (error) {
                console.error('Error fetching article data:', error);
            }
        };
        fetchArticleData();
    }, []);

    if (!articleData) {
        return <Loading></Loading>;
    }

    const modifiedBody = articleData.body.replace(/<p>/g, '<p class="my-8">');

    return (
        <ContentContainer>
            <H1 className="text-center mb-[30px]">{articleData.title}</H1>
            <div className="my-[40px] font-bold" dangerouslySetInnerHTML={{ __html: articleData.intro }} />
            <div className="bg-blue-300 block relative border-md translate-x-0">
                {/* TODO articel image osa täiesti puudu veel */}
                <Image className='h-full my-0 mx-auto text-clip w-auto' src='/logo.svg' alt="Logo" width={150} height={250} priority />
                <p>{articleData.image.title}</p>
            </div>
            <div  dangerouslySetInnerHTML={{ __html: modifiedBody }} />
            <div className="pb-[80px]">
                {articleData.tags.map((tag, index) => (
                    <span className="bg-secondaryColor py-2 px-4 inline-block rounded-[32px] text-sm font-bold ml-4 first:ml-0" key={index}>{tag}</span>
                ))}
            </div>
        </ContentContainer>
    );
};

export default Article;