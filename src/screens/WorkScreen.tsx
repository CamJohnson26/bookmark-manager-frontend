import {Box, Stack} from "@mui/material";
import {useGetWorks} from "../dataAccess/workerApi/useGetWorks";
import {NavigableList} from "../navigation/NavigableList";
import {useGetSections} from "../dataAccess/workerApi/useGetSections";
import {useState} from "react";
import {useGetEmbeddings} from "../dataAccess/workerApi/useGetEmbeddings";

export const WorkScreen = () => {
    const worksData = useGetWorks();
    const [selectedWork, setSelectedWork] = useState<string |undefined>()
    const works = Array.isArray(worksData.data) ? worksData.data : [];
    return <Box style={{width: '100%', height: 1000, paddingTop: 30, justifyItems: 'center', marginLeft: 'auto'}}>
        <Stack direction="row" spacing={1}>
            <NavigableList items={works.map(work => {
                return {
                    name: work[1],
                    id: work[0],
                }
            })} onClick={(item) => setSelectedWork(item.id)} />
            {
                selectedWork && (
                    <Sections workId={selectedWork} key={selectedWork} />
                )
            }
        </Stack>
    </Box>;
}

const Sections = ({workId}: {workId: string}) => {
    const sectionsData = useGetSections(workId)
    const sections = Array.isArray(sectionsData.data) ? sectionsData.data : [];

    const [selectedEmbeddingId, setSelectedEmbeddingId] = useState<string |undefined>()
    return <><NavigableList items={sections.map(section => {
        return {
            name: `${section[1]} - ${section[2]}`,
            id: section[3],
        }
    })} onClick={(item) => setSelectedEmbeddingId(item.id)} />
        {selectedEmbeddingId && <Embeddings embeddingId={selectedEmbeddingId} key={selectedEmbeddingId} />}
        </>
}

const Embeddings = ({embeddingId}: {embeddingId: string}) => {
    const embeddingsData = useGetEmbeddings(embeddingId)

    const embeddings = Array.isArray(embeddingsData.data) ? embeddingsData.data : [];
    return <NavigableList items={embeddings.map(embedding => {
        return {
            name: `${embedding[5]} - ${embedding[2]} - ${embedding[3]} - ${embedding[1]}`,
            id: embedding[0],
        }
    })} onClick={(item) => alert('Clicked')} />
}