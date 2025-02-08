import {TextField} from '@mui/material'
export const TextInput = ({onChange}:{onChange: (text: string)=>void}) => {
    return <TextField
        onChange={(event) => onChange(event.target.value)}
        size='small'
    />
}

