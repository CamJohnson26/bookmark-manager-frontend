import {Box, Stack, Switch} from "@mui/material";
import {useGetWorks} from "../dataAccess/workerApi/useGetWorks";
import {NavigableList} from "../navigation/NavigableList";
import {useGetSections} from "../dataAccess/workerApi/useGetSections";
import {useState} from "react";
import {useGetEmbeddings} from "../dataAccess/workerApi/useGetEmbeddings";
import {TextInput} from "../inputs/TextInput";

export const WorkScreen = () => {
    const worksData = useGetWorks();
    const [selectedWork, setSelectedWork] = useState<string | undefined>()

    const [filter, setFilter] = useState<string>("");

    const [show, setShow] = useState<boolean>(true)
    const works = Array.isArray(worksData.data) ? worksData.data : [];
    const filteredWorks = works.filter(work => work[1].toLowerCase().includes(filter.toLowerCase()));
    const selectedWorkName = works.filter(work => work[0] === selectedWork)?.[0]?.[1];
    return <Box style={{width: '100%', height: 1000, paddingTop: 30, justifyItems: 'center', marginLeft: 'auto'}}>

        <Box>Show self: <Switch checked={show} onChange={() => setShow(!show)} /></Box>
        <Stack direction="row" spacing={1}>
            <Stack direction="column" spacing={1}>
                <TextInput onChange={setFilter} />
            <NavigableList items={filteredWorks.map(work => {
                return {
                    name: work[1],
                    id: work[0],
                }
            })} onClick={(item) => setSelectedWork(item.id)} />
            </Stack>
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
    const [filter, setFilter] = useState<string>("");
    const filteredSections = sections.filter(section => String(section[1]).toLowerCase().includes(filter.toLowerCase()) ||
        String(section[2]).toLowerCase().includes(filter.toLowerCase()));

    return <>
        <Stack direction="column" spacing={1}>
            <TextInput onChange={setFilter} />
            <NavigableList items={filteredSections.map(section => {
        return {
            name: `${section[1]} - ${section[2]}`,
            id: section[3],
        }
    })} onClick={(item) => setSelectedEmbeddingId(item.id)} />
        </Stack>
        {selectedEmbeddingId && <Embeddings embeddingId={selectedEmbeddingId} key={selectedEmbeddingId} show={show} filterName={filterName} />}

        </>
}

const Embeddings = ({embeddingId, filterName, show}: {embeddingId: string; filterName: string; show: boolean}) => {
    const embeddingsData = useGetEmbeddings(embeddingId)

    const embeddings = Array.isArray(embeddingsData.data) ? embeddingsData.data : [];
    const [filter, setFilter] = useState<string>("");
    const filteredEmbeddings = embeddings.filter((embedding) => {
        return (show || embedding[3] !== filterName) && (embedding[3].toLowerCase().includes(filter.toLowerCase())
            || String(embedding[5]).toLowerCase().includes(filter.toLowerCase())
            || String(embedding[2]).toLowerCase().includes(filter.toLowerCase())
            || embedding[1].toLowerCase().includes(filter.toLowerCase())
        );
    })
    return <Stack direction="column" spacing={1}>
        <TextInput onChange={setFilter} /><NavigableList items={filteredEmbeddings.map(embedding => {
        return {
            name: `${embedding[5]} - ${embedding[2]} - ${embedding[3]} - ${embedding[1]}`,
            id: embedding[0],
        }
    })} onClick={(item) => alert('Clicked')} />
    </Stack>
}