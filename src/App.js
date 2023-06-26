import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import UsersList from "./pages/UsersList";
import PostsListByUser from "./pages/PostsListByUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UsersList />} />
        <Route path=":userId" element={<PostsListByUser />} />
        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
