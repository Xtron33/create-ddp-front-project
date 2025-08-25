import {defaultDepencencies, lintersDevDependencies, reactDependencies, reactDevDependencies} from "./utils/const.js";
import https from "https";
import {Router, StateManager, Technology, UiKit} from "./utils/enum.js";

async function fetchLatestVersion(pkgName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(`https://registry.npmjs.org/${pkgName}/latest`, (res) => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => resolve(JSON.parse(data).version));
        }).on("error", reject);
    })
}

async function getDependenciesVersion(dependencies: string[], devDependencies: string[]){
    const dependenciesList: Record<string, string> = {}
    const devDependenciesList: Record<string, string> = {}

    for (const dependency of dependencies) {
        dependenciesList[dependency] = await fetchLatestVersion(dependency)
    }

    for (const dependency of devDependencies) {
        devDependenciesList[dependency] = await fetchLatestVersion(dependency)
    }


    return {
        dependencies: dependenciesList,
        devDependencies: devDependenciesList
    }
}

export async function generatePackageJson(projectName: string, technology: Technology, router: Router | null, stm: StateManager, isQueryNeed: boolean, ui: UiKit) {
    const getScripts = () => {
        switch (technology){
            case Technology.React: {
                return {
                    "dev": "vite",
                    "build": "vite build",
                    "lint-staged": "lint-staged"
                }
            }
        }
    }

    const getDependencies = async () => {
        switch (technology) {
            case Technology.React: {
                let dependencies = [...reactDependencies, ...defaultDepencencies]
                let devDependencies = [...reactDevDependencies, ...lintersDevDependencies]

                switch (router){
                    case Router.ReactRouter:{
                        dependencies.push('react-router')
                        break
                    }
                    case Router.TanStackRouter:{
                        dependencies.push('@tanstack/react-router')
                        dependencies.push('@tanstack/react-router-devtools')
                        devDependencies.push('@tanstack/router-plugin')
                        break
                    }
                    case Router.Wouter:{
                        dependencies.push('wouter')
                        break
                    }
                }

                switch (stm){
                    case StateManager.Zustand:{
                        dependencies.push('zustand')
                        break
                    }
                    case StateManager.RTK:{
                        dependencies.push('@reduxjs/toolkit')
                        dependencies.push('react-redux')
                        break
                    }
                    case StateManager.Effector:
                        dependencies.push('effector')
                        dependencies.push('effector-react')
                        break
                }

                switch (ui){
                    case UiKit.Mantine:
                        dependencies.push("@mantine/core")
                        dependencies.push("@mantine/hooks")
                        break
                    case UiKit.GravityUI:
                        dependencies.push("@gravity-ui/uikit")
                        break
                    case UiKit.MaterialUI:
                        dependencies.push("@mui/material")
                        dependencies.push("@emotion/react")
                        dependencies.push("@emotion/styled")
                        dependencies.push("@fontsource/roboto")
                        break
                }

                if(isQueryNeed){
                    dependencies.push("@tanstack/react-query")
                    devDependencies.push("@tanstack/eslint-plugin-query")
                }

                return await getDependenciesVersion(dependencies, devDependencies)
            }
        }
    }

    return {
        name: projectName,
        version: "1.0.0",
        private: true,
        type: "module",
        scripts: getScripts(),
        ...await getDependencies(),
        config: {
            commitizen: {
                path: "cz-conventional-changelog"
            },
            "cz-custom": {
                config: ".cz-config.cjs"
            }
        },
        "lint-staged": {
            "*.{js,jsx,ts,tsx}": [
                "eslint --fix",
                "prettier --write"
            ],
            "*.{css,scss}": [
                "stylelint --fix",
                "prettier --write"
            ]
        },
    }
}
