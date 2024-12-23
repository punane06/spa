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
        large: string;
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
            <div className="bg-blue-300 pb-[50%] block relative border-md translate-x-0">
                {/* TODO articel image osa töölepi */}
                <Image
                    className="center mx-auto  hover:scale-110  z-20 overflow-hidden absolute -mt-0.5 top-0 left-0 right-0 bottom-0 bg-center bg-no-repeat bg-cover filter-blur-sm transition-transform duration-300"
                    src={articleData.image.large}
                    width={750}
                    height={750}
                    quality={90}
                    priority
                    alt="article image"
                />
                {/* <Image className='absolute top-0 left-0 w-full h-full object-cover opacity-0 z-10' src='/logo.svg' alt="Logo" width={150} height={250} priority /> */}
                <div className="absolute bottom-0 left-0 w-full bg-black/50 z-20 px-6 py-2">{articleData.image.title}</div>
                <div className="z-0 overflow-hidden absolute top-0 left-0 right-0 bottom-0 bg-center bg-no-repeat duration-200 transition-transform">
                    <div className="absolute top-0 left-0 right-0 bottom-0 -mt-2 bg-center bg-no-repeat bg-cover filter-blur-sm transition-transform duration-300"></div>
                </div>
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