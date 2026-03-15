import React, { useState, useEffect } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { GridRowsProp, GridColDef, DataGrid } from "@mui/x-data-grid";
import LoginButton from "./LoginButton";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import {CJDialog} from "./screens/CJDialog";
import {ImportText} from "./utilities/ImportText";
import {useBookmarksUpload} from "./dataAccess/workerApi/useBookmarksUpload";
import {Stack} from "@mui/material";

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
  const { data } = useQuery(URL_QUERY);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const urls = data?.url || [];

  const rows: GridRowsProp<Bookmark> = urls;

  // Calculate Summary column width based on screen size
  // Reserve space for other columns: ID(120) + Title(500) + URL(300) + Created At(150) = 1070px
  // Use remaining space for Summary, with minimum of 300px and maximum based on screen width
  const summaryWidth = Math.max(300, windowWidth - 1070 - 100); // 100px for padding/scrollbar

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
    { field: "summary", headerName: "Summary", width: summaryWidth, resizable: true, filterable: true,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: '1.2' }}>
          {params.value}
        </div>
      )
    },
    { field: "created_at", headerName: "Created At", width: 150, resizable: true , filterable: true},
  ];
  const { isAuthenticated } = useAuth0();

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
  const {postData, loading, error} = useBookmarksUpload();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
      <CJDialog title={'Upload Bookmarks'} buttonTitle={''} useFab={true}>
        <ImportTextWithHandling 
          postData={postData}
          loading={loading}
          error={error}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
      </CJDialog>
  );
};

const ImportTextWithHandling = ({postData, loading, error, successMessage, setSuccessMessage, onClose}: {
  postData: (urls: string[]) => Promise<any>,
  loading: boolean,
  error: string | null,
  successMessage: string | null,
  setSuccessMessage: (msg: string | null) => void,
  onClose?: () => void
}) => {
  const handleImport = async (text: string) => {
    try {
      setSuccessMessage(null);
      await postData(text.split('\n'));
      setSuccessMessage('Bookmarks uploaded successfully!');
      if (onClose) {
        setTimeout(() => {
          onClose();
          setSuccessMessage(null);
        }, 1000); // Close after 1 second to show success message
      }
    } catch (err) {
      // Error is already handled by the hook
    }
  };

  return (
    <>
      <ImportText onImport={handleImport} onClose={onClose} />
      {loading && <div style={{marginTop: 10, color: 'blue'}}>Uploading...</div>}
      {error && <div style={{marginTop: 10, color: 'red'}}>Error: {error}</div>}
      {successMessage && <div style={{marginTop: 10, color: 'green'}}>{successMessage}</div>}
    </>
  );
};

export default App;
