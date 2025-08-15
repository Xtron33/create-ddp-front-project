import {Router, Technology} from "./enum.js";

export const TechnologyFolders: Record<Technology, string> = {
    [Technology.React]: "react",
    [Technology.Next]: "next"
}

export const RouterFolders: Record<Router, string> = {
    [Router.ReactRouter]: "react-router",
    [Router.TanStackRouter]: "tanstack-router",
    [Router.Wouter]: "wouter"
}
