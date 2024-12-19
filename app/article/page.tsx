import { ContentContainer } from "../components/ui/ContainerProps"
import { H1 } from "../components/ui/HeadingProps"
import Image from 'next/image'

const Article = () => {
    return (
        <ContentContainer>
            <H1>Article</H1>
            <p>intro paragraph</p>
            <div>
                <Image className='h-full my-0 mx-auto text-clip w-auto' src="/logo.svg" alt="Logo" width={150} height={250} priority /> 
                <p>photo name</p>
            </div>
            <div>
                All paragraph parts here
            </div>
            <div>
                Here come tags
            </div>
        </ContentContainer>
    );
};

export default Article;