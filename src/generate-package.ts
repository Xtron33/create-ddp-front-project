import {reactDependencies, reactDevDependencies} from "./utils/const.js";
import https from "https";
import {Router, Technology} from "./utils/enum.js";

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

export async function generatePackageJson(projectName: string, technology: Technology, router: Router | null) {
    const getScripts = () => {
        switch (technology){
            case Technology.React: {
                return {
                    "dev": "vite",
                    "build": "vite build",
                    "lint": "eslint vite-project",
                    "preview": "vite preview"
                }
            }
        }
    }

    const getDependencies = async () => {
        switch (technology) {
            case Technology.React: {
                let dependencies = reactDependencies
                let devDependencies = reactDevDependencies

                switch (router){
                    case Router.ReactRouter:{
                        dependencies.push('react-router')
                        break
                    }
                    case Router.TanStackRouter:{
                        dependencies.push('@tanstack/react-router')
                        break
                    }
                    case Router.Wouter:{
                        dependencies.push('wouter')
                        break
                    }
                }

                return await getDependenciesVersion(dependencies, devDependencies)
            }
        }
    }

    return {
        name: projectName,
        version: "1.0.0",
        private: true,
        scripts: getScripts(),
        ...await getDependencies()
    }
}
