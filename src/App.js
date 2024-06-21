// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Typography, Button, Container, TextField, List, ListItem, ListItemText, IconButton, Switch, CssBaseline } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Register from './Register';
import Login from './Login';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#060f3e",
    },
    secondary: {
      main: '#d3d3d3',
    },
  },
});

function App({ loggedIn, handleLogout, handleLogin, username, setUsername, password, setPassword }) {
  const [userLists, setUserLists] = useState({});
  const [newListName, setNewListName] = useState('');
  const [currentList, setCurrentList] = useState('');
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editedName, setEditedName] = useState('');

  const handleAddList = () => {
    if (newListName && loggedIn) {
      const user = username;
      if (!userLists[user]) {
        userLists[user] = {};
      }
      userLists[user][newListName] = [];
      setUserLists({ ...userLists });
      setNewListName('');
    }
  };

  const handleAddItem = (listName, newItem) => {
    if (newItem && loggedIn) {
      const user = username;
      const newItemObj = {
        name: newItem,
        quantity: 1,
        active: true
      };
      userLists[user][listName] = [...userLists[user][listName], newItemObj];
      setUserLists({ ...userLists });
      setNewItem('');
    }
  };

  const handleDeleteItem = (listName, index) => {
    if (loggedIn) {
      const user = username;
      userLists[user][listName] = userLists[user][listName].filter((item, i) => i !== index);
      setUserLists({ ...userLists });
    }
  };

  const handleToggleItem = (listName, index) => {
    if (loggedIn) {
      const user = username;
      userLists[user][listName][index].active = !userLists[user][listName][index].active;
      setUserLists({ ...userLists });
    }
  };

  const handleQuantityChange = (listName, index, quantity) => {
    if (loggedIn) {
      const user = username;
      userLists[user][listName][index].quantity = quantity;
      setUserLists({ ...userLists });
    }
  };

  const handleDeleteList = (listName) => {
    if (loggedIn) {
      const user = username;
      if (window.confirm(`リスト "${listName}" を削除しますか？`)) {
        const updatedUserLists = { ...userLists };
        delete updatedUserLists[user][listName];
        setUserLists(updatedUserLists);
        setCurrentList('');
      }
    }
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setEditedName(userLists[username][currentList][index].name);
  };

  const handleRenameItem = (listName, index) => {
    if (loggedIn) {
      const user = username;
      userLists[user][listName][index].name = editedName;
      setUserLists({ ...userLists });
      setEditIndex(-1);
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div id="root">
          <Header loggedIn={loggedIn} handleLogout={handleLogout} handleLogin={handleLogin} username={username} currentList={currentList} />
          <div style={{ display: 'flex' }} className="main-content">
            {loggedIn && (
              <Menu
                lists={Object.keys(userLists[username] || {})}
                currentList={currentList}
                setCurrentList={setCurrentList}
                newListName={newListName}
                setNewListName={setNewListName}
                handleAddList={handleAddList}
                handleDeleteList={handleDeleteList}
              />
            )}
            <Container style={{ marginTop: '2em', flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={
                  loggedIn ? (
                    <>
                      {currentList && (
                        <>
                          <TextField
                            label="アイテムを入力"
                            variant="outlined"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            fullWidth
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAddItem(currentList, newItem)}
                            startIcon={<AddIcon />}
                            style={{ marginTop: '1em', color: '#f5f5dc' }}
                          >
                            追加
                          </Button>
                          <List style={{ marginTop: '2em' }}>
                            {(userLists[username][currentList] || []).map((item, index) => (
                              <ListItem
                                key={index}
                                style={{ opacity: item.active ? 1 : 0.5 }}
                                secondaryAction={
                                  editIndex === index ? (
                                    <>
                                      <TextField
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        style={{ marginRight: '1em' }}
                                      />
                                      <Button
                                        onClick={() => handleRenameItem(currentList, index)}
                                      >
                                        名前変更
                                      </Button>
                                      <Button
                                        onClick={handleCancelEdit}
                                      >
                                        キャンセル
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <IconButton edge="end" style={{ marginRight: '0.2em', color: '#060f3e' }} aria-label="edit" onClick={() => handleEditItem(index)}>
                                        <EditIcon />
                                      </IconButton>
                                      <IconButton edge="end" style={{ marginRight: '0.2em', color: '#060f3e' }} aria-label="delete" onClick={() => handleDeleteItem(currentList, index)}>
                                        <DeleteIcon />
                                      </IconButton>
                                      <TextField
                                        type="number"
                                        value={item.quantity}
                                        size='small'
                                        onChange={(e) => handleQuantityChange(currentList, index, parseInt(e.target.value))}
                                        style={{ width: '60px', marginRight: '1em' }}
                                      />
                                    </>
                                  )
                                }
                              >
                                <Switch
                                  checked={item.active}
                                  onChange={() => handleToggleItem(currentList, index)}
                                  inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <ListItemText primary={item.name} />
                              </ListItem>
                            ))}
                          </List>
                        </>
                      )}
                    </>
                  ) : (
                    <Login handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
                  )
                } />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Container>
          </div>
          <Footer className="footer" />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
