import {Router, StateManager, Technology} from "./enum.js";

export const TechnologyFolders: Record<Technology, string> = {
    [Technology.React]: "react",
    [Technology.Next]: "next"
}

export const RouterFolders: Record<Router, string> = {
    [Router.ReactRouter]: "react-router",
    [Router.TanStackRouter]: "tanstack-router",
    [Router.Wouter]: "wouter"
}

export const RouterName: Record<Router, string> = {
    [Router.ReactRouter]: "React Router",
    [Router.TanStackRouter]: "TanStack Router",
    [Router.Wouter]: "Wouter"
}

export const StateManageFolder: Record<string, string> = {
    [StateManager.RTK]: "RTK"
}

export const StateManagerName: Record<StateManager, string> = {
    [StateManager.Without]: "Без стейт-менеджера",
    [StateManager.Zustand]: "Zustand",
    [StateManager.RTK]: "RTK",
    [StateManager.Effector]: "Effector"
}
