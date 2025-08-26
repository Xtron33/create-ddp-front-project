import {UiKit} from "./utils/enum.js";
import {TanstackQueryNextBeforeFunc} from "./utils/const.js";
import {sortImports} from "./utils/helper.js";

interface Props{
    isNeedQuery: boolean
    isRtk: boolean
    uiKit: UiKit
}

export const generateProvidersNext = ({isNeedQuery, isRtk, uiKit}: Props) =>  {
    const providers: string[] = ['{children}']
    const imports: string[] = ['import { ReactNode } from "react"']
    const beforeFunc: string[] = []

    if(uiKit === UiKit.GravityUI){
        imports.push('import "@gravity-ui/uikit/styles/fonts.css"')
        imports.push('import "@gravity-ui/uikit/styles/styles.css"')
        imports.push('import {ThemeProvider} from "@gravity-ui/uikit"')
        imports.push('import {getRootClassName} from \'@gravity-ui/uikit/server\';')

        providers.unshift('<ThemeProvider theme="dark">')
        providers.push('</ThemeProvider>')
    }

    if(isRtk){
        imports.push('import {Provider} from "react-redux"')
        imports.push('import {store} from "@store/index"')
        providers.unshift('<Provider store={store}>')
        providers.push('</Provider>')
    }

    if(isNeedQuery){
        imports.push("import {\n" +
            "    isServer,\n" +
            "    QueryClient,\n" +
            "    QueryClientProvider,\n" +
            "} from '@tanstack/react-query'")
        beforeFunc.push(TanstackQueryNextBeforeFunc)
        providers.unshift('<QueryClientProvider client={queryClient}>')
        providers.push('</QueryClientProvider>')
    }

    const sortedImports = sortImports(imports)

    return `"use client"
    ${sortedImports.join('\n')}
    
    ${beforeFunc.join('\n')}
    
    export default function Providers({ children }: { children: ReactNode }) {
    ${isNeedQuery ? 'const queryClient = getQueryClient()' : ''}

    return (
        ${providers.join('\n')}
    )
}

    `
}
