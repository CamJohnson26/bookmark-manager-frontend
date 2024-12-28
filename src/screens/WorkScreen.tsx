import {Box, Stack, Switch} from "@mui/material";
import {useGetWorks} from "../dataAccess/workerApi/useGetWorks";
import {NavigableList} from "../navigation/NavigableList";
import {useGetSections} from "../dataAccess/workerApi/useGetSections";
import {useState} from "react";
import {useGetEmbeddings} from "../dataAccess/workerApi/useGetEmbeddings";

export const WorkScreen = () => {
    const worksData = useGetWorks();
    const [selectedWork, setSelectedWork] = useState<string | undefined>()


    const [show, setShow] = useState<boolean>(true)
    const works = Array.isArray(worksData.data) ? worksData.data : [];
    const selectedWorkName = works.filter(work => work[0] === selectedWork)?.[0]?.[1];
    return <Box style={{width: '100%', height: 1000, paddingTop: 30, justifyItems: 'center', marginLeft: 'auto'}}>
        Show self: <Switch checked={show} onChange={() => setShow(!show)} />
        <Stack direction="row" spacing={1}>
            <NavigableList items={works.map(work => {
                return {
                    name: work[1],
                    id: work[0],
                }
            })} onClick={(item) => setSelectedWork(item.id)} />
            {
                selectedWork && (
                    <Sections workId={selectedWork} key={selectedWork} filterName={selectedWorkName} show={show} />
                )
            }
        </Stack>
    </Box>;
}

const Sections = ({workId, filterName, show}: {workId: string; filterName: string; show: boolean}) => {
    const sectionsData = useGetSections(workId)
    const sections = Array.isArray(sectionsData.data) ? sectionsData.data : [];

    const [selectedEmbeddingId, setSelectedEmbeddingId] = useState<string |undefined>()
    return <><NavigableList items={sections.map(section => {
        return {
            name: `${section[1]} - ${section[2]}`,
            id: section[3],
        }
    })} onClick={(item) => setSelectedEmbeddingId(item.id)} />
        {selectedEmbeddingId && <Embeddings embeddingId={selectedEmbeddingId} key={selectedEmbeddingId} show={show} filterName={filterName} />}
        </>
}

const Embeddings = ({embeddingId, filterName, show}: {embeddingId: string; filterName: string; show: boolean}) => {
    const embeddingsData = useGetEmbeddings(embeddingId)

    const embeddings = Array.isArray(embeddingsData.data) ? embeddingsData.data : [];
    const filteredEmbeddings = embeddings.filter((embedding) => {
        return show || embedding[3] !== filterName
    })
    return <NavigableList items={filteredEmbeddings.map(embedding => {
        return {
            name: `${embedding[5]} - ${embedding[2]} - ${embedding[3]} - ${embedding[1]}`,
            id: embedding[0],
        }
    })} onClick={(item) => alert('Clicked')} />
}