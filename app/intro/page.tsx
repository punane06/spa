import Link from "next/link";
import { Button } from "../components/ui/ButtonProps";
import { H2 } from "../components/ui/HeadingProps";
import { ContentContainer } from "../components/ui/ContainerProps";

const Intro = () => {
    return (
        <ContentContainer>
            <H2>Funktsionaalsed nõuded</H2>
            <p className="my-[40px]">Artikli vaade on lihtne: tee päring ja kuva saadud vastus.</p>
            <p className="my-[40px]">Tabeli vaate puhul soovime näha, kuidas sa Array-dega ringi käia oskad:
                Tabelis tuleb saadud vastus tabeli ridadel välja kuvada, sh tabelile 3-sammuline sorteerimine peale panna (Asc, Desc, Default).
                Tabelile tuleb ka lehejaotus külge panna. Funktsionaalsus peaks olema 1:1 proovitöö lehel oleva lehejaotusega.</p>
            <H2 className="">Mittefunktsionaalsed nõuded</H2>
            <ul className="my-[40px]">
                <li>* Proovitöö lahendamiseks peab kasutama Vue, React või Angular raamistiku.</li>
                <li>* Proovitöö puhul soovitame vältida väliseid mooduleid (paginator, table sorter, jne).</li>
                <li>* Kujundus ei pea olema sama, mis proovitööl, aga selle järgi tegemine annab lisapunkte.</li>
            </ul>
            <H2>API</H2>
            <div className="my-[40px] flex justify-center">
                <Link target="_blank" href={"https://proovitoo.twn.ee/api/list/972d2b8a"}>
                    <Button  className="">Artikkel</Button>
                </Link>
                <Link target="_blank" href={"https://proovitoo.twn.ee/api/list"}>

                <Button  className="ml-4">Nimekiri</Button>
                </Link>
            </div>
            <H2 className="mt-[60px]">Materjalid</H2>
            <div className="mt-[40px] pb-[40px] flex justify-center">
                <Link target="_blank" href={"https://proovitoo.twn.ee/assets/fonts.zip"}>
                    <Button className="">Font</Button>
                </Link>
                <Link target="_blank" href={"https://proovitoo.twn.ee/assets/graphics.zip"}>

                    <Button className="ml-4">Graafika</Button>
                </Link>
            </div>
        </ContentContainer>
    );
};

export default Intro;