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
    { field: "id", headerName: "ID", width: 50, resizable: true, filterable: true },
    { field: "title", headerName: "Title", width: 500, resizable: true , filterable: true},
    { field: "url", headerName: "URL", width: 300, resizable: true, filterable: true,
      renderCell: (params) => (<a href={params.row.url}>{params.row.url}</a>)},
    { field: "summary", headerName: "Summary", width: 1000, resizable: true, filterable: true },
    { field: "created_at", headerName: "Created At", width: 150, resizable: true , filterable: true},
  ];
  const { isAuthenticated, isLoading } = useAuth0();

  const {postData} = useBookmarksUpload()
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

        <LoginButton />
        <LogoutButton />
        <CJDialog title={'Upload Bookmarks'} buttonTitle={'Upload Bookmarks'}>
          <ImportText onImport={(text) => postData(text.split('\n'))} />
        </CJDialog>

      </div>
  );
}

export default App;