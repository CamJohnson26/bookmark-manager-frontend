import {Stack, Button, TextField} from "@mui/material";
import {useRef} from "react";

export const ImportText = ({onImport}:{onImport: (text: string) => void}) => {
    const text = useRef<string>('');
    return <Stack>
        <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={16}
            defaultValue=""
            onChange={(e) => {
                text.current = e.target.value
            }}
        />
        <Button onClick={() => onImport(text.current)}>Import Text</Button>
    </Stack>
}