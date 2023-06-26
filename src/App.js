import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import UsersList from "./pages/UsersList";
import PostsListByUser from "./pages/PostsListByUser";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<PostsListByUser />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
