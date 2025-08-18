import {Route} from "wouter"
import {Main} from "@pages/Main"
import {PAGES} from "./pages";

export const Router = () => (
    <>
        <Route path={PAGES.MAIN}><Main/></Route>
    </>
)
