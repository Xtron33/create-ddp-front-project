import {Router} from "./utils/enum.js";

interface ConfigOptions {
    router?: Router
}

export const generateMainFileReact = (config: ConfigOptions) => {
    const imports: string[] = ['import React from "react"', 'import ReactDOM from "react-dom/client"']
    const providers: string[] = []

    switch(config.router){
        case Router.ReactRouter:
            imports.push('import {RouterProvider} from "react-router/dom"')
            imports.push('import {router} from "@routes/router"')
            providers.push('<RouterProvider router={router}/>')
            break
    }

    return `${imports.join('\n')}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
    ${providers.join('\n    ')}
    </React.StrictMode>
)`;
}
