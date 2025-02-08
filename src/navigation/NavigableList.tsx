import {Stack, Box, Button, Typography} from "@mui/material";

interface ListItem {
    name: string;
    id: string;
}

export const NavigableList = ({items, onClick, buttonName}:{items: ListItem[]; onClick: (item: ListItem) => void; buttonName?: string}) => {
    return <Stack>
        {
            items.map(item=> {
                return <Box
                    key={item.id}
                    width={300}
                    border={'none'}
                    marginRight={1}
                    marginLeft={1}
                    padding={'1em'}
                    textAlign={'left'}
                    textOverflow={'ellipsis'}
                    boxShadow={'4px 4px 10px rgba(0, 0, 0, 0.2)'}
                >
                    <Stack
                        direction={'column'}
                        spacing={'1em'}
                    >
                        <Typography variant={'body2'}>
                            {item.name}</Typography><Button
                        variant={'contained'}
                        onClick={() => onClick(item)}
                        size={'small'}
                    >{buttonName ?? 'Click'}</Button></Stack>
                </Box>
            })
        }
    </Stack>
}