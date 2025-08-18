import {createBrowserRouter} from 'react-router'
import {Main} from "@pages/Main"
import {PAGES} from "./pages";

export const router = createBrowserRouter([
    {path: PAGES.MAIN, Component: Main}
])
