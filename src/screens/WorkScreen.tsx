import {Box} from "@mui/material";
import {useGetWorks} from "../dataAccess/workerApi/useGetWorks";

export const WorkScreen = () => {
    const works = useGetWorks();

    return <Box style={{width: '100%', height: 1000}}>
        Works: {JSON.stringify(works)}
    </Box>;
}