import {Box, Stack} from "@mui/material";
import {useGetWorks} from "../dataAccess/workerApi/useGetWorks";
import {NavigableList} from "../navigation/NavigableList";
import {useGetSections} from "../dataAccess/workerApi/useGetSections";
import {useState} from "react";
import {useGetEmbeddings} from "../dataAccess/workerApi/useGetEmbeddings";
import {useGetNews} from "../dataAccess/workerApi/useGetNews";

export const NewsScreen = () => {
    const newsData = useGetNews();
    const news = Array.isArray(newsData.data) ? newsData.data : [];
    return <Box style={{width: '100%', height: 1000, paddingTop: 30, justifyItems: 'center', marginLeft: 'auto'}}>
        <Stack direction="row" spacing={1}>
            <NavigableList items={news.map(newsItem => {
                return {
                    name: `${newsItem[2]} - ${newsItem[1]}`,
                    id: newsItem[0],
                }
            })} onClick={(item) => null} />
        </Stack>
    </Box>;
}
