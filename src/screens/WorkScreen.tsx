import {Box, Stack} from "@mui/material";
import {useGetWorks} from "../dataAccess/workerApi/useGetWorks";
import {NavigableList} from "../navigation/NavigableList";
import {useGetSections} from "../dataAccess/workerApi/useGetSections";
import {useState} from "react";

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
    console.log(sections);
    return <NavigableList items={sections.map(section => {
        return {
            name: section[2],
            id: section[0],
        }
    })} onClick={(item) => alert(`${item} clicked`)} />
}