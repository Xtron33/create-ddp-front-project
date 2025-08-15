#!/usr/bin/env node

import inquirer from "inquirer";
import path from "path";
import {cpSync, mkdirSync, writeFileSync} from "fs";
import {fileURLToPath} from "url";
import {generatePackageJson} from "./generate-package.js";
import {Router, Technology} from "./utils/enum.js";
import {RouterFolders, TechnologyFolders} from "./utils/dictionary.js";
import {generateMainFileReact} from "./generate-main-file.js";
import {execSync} from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const main = async () => {
    const {projectName, mainTechnology} = await inquirer.prompt([{
        type: "input",
        name: "projectName",
        message: "Введите название проекта:",
        default: "ddp-app"
    },
    {
        type: "list",
        name: "mainTechnology",
        message: "React / Next app:",
        choices: Object.values(Technology) as string[],
        default: Technology.React
    },
    ])

    let router: Router | null = null;

    if (mainTechnology === Technology.React) {
        const { router: selectedRouter } = await inquirer.prompt([
            {
                type: "list",
                name: "router",
                message: "Выберите роутер:",
                choices: Object.values(Router),
                default: Router.ReactRouter,
            },
        ]);
        router = selectedRouter;
    }

    const projectPath = path.join(process.cwd(), projectName);
    const pkgPath = path.join(projectPath, "package.json");
    const srcPath = path.join(projectPath, "src");
    const mainPath = path.join(srcPath, "main.tsx");

    mkdirSync(projectPath, { recursive: true });
    mkdirSync(srcPath, { recursive: true });
    writeFileSync(pkgPath, JSON.stringify(await generatePackageJson(projectName, mainTechnology, router), null, 2))
    writeFileSync(mainPath, generateMainFileReact({router: router as Router}))

    cpSync(path.join(__dirname, `templates/${TechnologyFolders[mainTechnology as Technology]}`), projectPath, { recursive: true });
    if(router){
        cpSync(path.join(__dirname, `templates/routers/${RouterFolders[router as Router]}`), srcPath, { recursive: true });
    }

    try {
        console.log('\n📦 Устанавливаю зависимости...');
        process.chdir(projectPath); // Переходим в директорию проекта
        execSync('yarn install --production=false', { stdio: 'inherit' });
        console.log('\n✅ Зависимости успешно установлены');
    } catch (error) {
        console.error('\n❌ Ошибка при установке зависимостей:');
        console.error(error);
        process.exit(1);
    }

    console.log('\n\n✅ Проект успешно создан\n')
    console.log(`cd ${projectName}\n\n`)
    console.log(`yarn start\n\n`)
}

main()
