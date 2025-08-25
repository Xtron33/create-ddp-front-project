import {Router, StateManager, UiKit} from "./utils/enum.js";
import {TanstackRouterMainFile} from "./utils/const.js";
import {sortImports} from "./utils/helper.js";

interface ConfigOptions {
    router?: Router
    stm: StateManager
    isQueryNeed: boolean
    ui: UiKit
}

export const generateMainFileReact = (config: ConfigOptions) => {
    const imports: string[] = ['import React from "react"', 'import ReactDOM from "react-dom/client"', 'import "./index.css"']
    const providers: string[] = []
    const beforeReturn: string[] = []

    switch(config.router){
        case Router.ReactRouter:
            imports.push('import {RouterProvider} from "react-router/dom"')
            imports.push('import {router} from "@routes/index"')
            providers.push('<RouterProvider router={router}/>')
            break
        case Router.TanStackRouter:
            imports.push('import {RouterProvider, createRouter} from "@tanstack/react-router"')
            imports.push('import {routeTree} from "./routeTree.gen"')
            beforeReturn.push(TanstackRouterMainFile)
            providers.push('<RouterProvider router={router} />')
            break
        case Router.Wouter:
            imports.push('import {Router} from "@routes/index"')
            providers.push('<Router />')
    }

    switch (config.ui){
        case UiKit.Mantine:
            imports.push('import "@mantine/core/styles.css"')
            imports.push('import {MantineProvider} from "@mantine/core"')

            providers.unshift('<MantineProvider>')
            providers.push('</MantineProvider>')
            break
        case UiKit.GravityUI:
            imports.push('import "@gravity-ui/uikit/styles/fonts.css"')
            imports.push('import "@gravity-ui/uikit/styles/styles.css"')
            imports.push('import {ThemeProvider} from "@gravity-ui/uikit"')

            providers.unshift('<ThemeProvider theme="light">')
            providers.push('</ThemeProvider>')
            break
    }

    if(config.isQueryNeed){
        imports.push('import {QueryClient, QueryClientProvider} from "@tanstack/react-query"')
        providers.unshift('<QueryClientProvider client={queryClient}>')
        providers.push('</QueryClientProvider>')
        beforeReturn.push('const queryClient = new QueryClient()')
    }

    switch (config.stm){
        case StateManager.RTK:
            imports.push('import {Provider} from "react-redux"')
            imports.push('import {store} from "./store"')
            providers.unshift('<Provider store={store}>')
            providers.push('</Provider>')
    }

    const sortedImports = sortImports(imports)

    return `${sortedImports.join('\n')}

${beforeReturn.join('\n')}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
    ${providers.join('\n    ')}
    </React.StrictMode>
)`;
}
