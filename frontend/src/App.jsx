import { Box, Button } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <Box minHeight="100vh">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/create" element={<CreatePage />}/>
      </Routes>
    </Box>
  )
}

export default App
