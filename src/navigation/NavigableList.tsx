import {Stack, Box, Button} from "@mui/material";

interface ListItem {
    name: string;
    id: string;
}

export const NavigableList = ({items, onClick}:{items: ListItem[]; onClick: (item: ListItem) => void}) => {
    return <Stack>
        {
            items.map(item=> {
                return <Box key={item.id} width={300} border={'1px solid black'} marginRight={1} marginLeft={1}>
                    {item.name} <Button onClick={() => onClick(item)}>Click</Button>
                </Box>
            })
        }
    </Stack>
}