import { IntroContainer } from "./components/ui/ContainerProps";
import { H1 } from "./components/ui/HeadingProps"; 
export default function Home() {
  return (
    <IntroContainer>
      <H1 className="text-highlightColor">Trinidad Wiseman</H1>
      <p className="font-booster font-bold text-[36px] text-alternateTextColor">SPA proovitöö</p>
    </IntroContainer>
  );
}
