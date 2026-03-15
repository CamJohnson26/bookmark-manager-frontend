import React from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { GridRowsProp, GridColDef, DataGrid } from "@mui/x-data-grid";
import LoginButton from "./LoginButton";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import {CJDialog} from "./screens/CJDialog";
import {ImportText} from "./utilities/ImportText";
import {useBookmarksUpload} from "./dataAccess/workerApi/useBookmarksUpload";
import {Stack, Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const URL_QUERY = gql`
  query MyQuery {
    url {
      id
      title
      url
      summary
      created_at
    }
  }
`;

interface Bookmark {
  id: number;
  url: string;
  title: string;
  summary: string;
  created_at: string;
}

function App() {
  const { loading, error, data } = useQuery(URL_QUERY);

  const urls = data?.url || [];

  const rows: GridRowsProp<Bookmark> = urls;

  const columns: GridColDef<Bookmark>[] = [
    { field: "id", headerName: "ID", width: 120, resizable: true, filterable: true },
    { field: "title", headerName: "Title", width: 500, resizable: true , filterable: true, 
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: '1.2' }}>
          {params.value}
        </div>
      )
    },
    { field: "url", headerName: "URL", width: 300, resizable: true, filterable: true,
      renderCell: (params) => (<a href={params.row.url}>{params.row.url}</a>)},
    { field: "summary", headerName: "Summary", width: 1000, resizable: true, filterable: true,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: '1.2' }}>
          {params.value}
        </div>
      )
    },
    { field: "created_at", headerName: "Created At", width: 150, resizable: true , filterable: true},
  ];
  const { isAuthenticated, isLoading } = useAuth0();

  return (
      <div style={{width: '100%', height: 1000}}>
        {
            isAuthenticated && <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  sorting: {
                    sortModel: [{ field: "id", sort: "desc" }],
                  },
                }}
            />
        }

        <Stack direction="row" spacing={1} style={{justifyContent: 'center', marginTop: 10}}>
          <LoginButton />
          <LogoutButton />
        </Stack>
        <ImportTextButton />
      </div>
  );
}

const ImportTextButton = () => {
  const {postData} = useBookmarksUpload()

  return (
      <CJDialog title={'Upload Bookmarks'} buttonTitle={''} useFab={true}>
        <ImportText onImport={(text) => postData(text.split('\n'))}/>
      </CJDialog>
  );
};

export default App;
