import {Box} from "@mui/material";
import {useGetWorks} from "../dataAccess/workerApi/useGetWorks";
import {NavigableList} from "../navigation/NavigableList";

export const WorkScreen = () => {
    const worksData = useGetWorks();
    const works = Array.isArray(worksData.data) ? worksData.data : [];
    return <Box style={{width: '100%', height: 1000, paddingTop: 30, justifyItems: 'center', marginLeft: 'auto'}}>
        <NavigableList items={works.map(work => {
            return {
                name: work[1],
                id: work[0],
            }
        })} onClick={(item) => alert(`${item} clicked`)} />
    </Box>;
}