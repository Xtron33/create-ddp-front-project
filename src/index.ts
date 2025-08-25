#!/usr/bin/env node

import inquirer from "inquirer";
import path from "path";
import {cpSync, mkdirSync, writeFileSync} from "fs";
import {fileURLToPath} from "url";
import {generatePackageJson} from "./generate-package.js";
import {Router, StateManager, Technology} from "./utils/enum.js";
import {RouterFolders, RouterName, StateManageFolder, StateManagerName, TechnologyFolders} from "./utils/dictionary.js";
import {generateMainFileReact} from "./generate-main-file.js";
import {execSync} from "child_process";
import {generateEslintConfig} from "./generate-eslint-config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const main = async () => {
    const {projectName, mainTechnology} = await inquirer.prompt([{
        type: "input",
        name: "projectName",
        message: "Введите название проекта:",
        default: "ddp-app",
        filter: (input: string) => input.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, ""),
        validate:(input: string) => {
            if(!input.trim()) {
                return 'Название проекта не может быть пустым'
        }
            return true
        }
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
                choices: Object.values(Router).map(rout => ({
                    name: RouterName[rout],
                    value: rout
                })),
                default: Router.ReactRouter,
            },
        ]);
        router = selectedRouter;
    }

    const {stm, isQueryNeed, isNeedHusky} = await inquirer.prompt([
        {
            type: "list",
            name: "stm",
            message: "Выберите стейт-менеджер:",
            choices: Object.values(StateManager).map(st => ({
                name: StateManagerName[st],
                value: st
            })),
            default: StateManager.Without
        },
        {
            type: "confirm",
            name: "isQueryNeed",
            message: "Установить TanStack Query?",
            default: false
        },
        {
            type: "confirm",
            name: "isNeedHusky",
            message: "Настроить пре-коммит (lint-staged) и пре-пуш (build)?",
            default: false
        }
    ])

    const projectPath = path.join(process.cwd(), projectName);
    const pkgPath = path.join(projectPath, "package.json");
    const srcPath = path.join(projectPath, "src");
    const eslintPath = path.join(projectPath, "eslint.config.js");
    const mainPath = path.join(srcPath, "main.tsx");

    console.log('\n📦 Генерирую файлы...');
    mkdirSync(projectPath, { recursive: true });
    mkdirSync(srcPath, { recursive: true });
    writeFileSync(pkgPath, JSON.stringify(await generatePackageJson(projectName, mainTechnology, router, stm, isQueryNeed), null, 2))
    writeFileSync(mainPath, generateMainFileReact({router: router as Router, stm, isQueryNeed}))
    writeFileSync(eslintPath, generateEslintConfig(mainTechnology, isQueryNeed))

    cpSync(path.join(__dirname, `templates/linters`), projectPath, { recursive: true });
    cpSync(path.join(__dirname, `templates/${TechnologyFolders[mainTechnology as Technology]}`), projectPath, { recursive: true });
    if(router){
        cpSync(path.join(__dirname, `templates/routers/${RouterFolders[router as Router]}`), projectPath, { force: true,recursive: true });
    }
    if(isNeedHusky){
        cpSync(path.join(__dirname, `templates/build_husky`), projectPath, { recursive: true });
    }

    switch (stm){
        case StateManager.RTK:
            cpSync(path.join(__dirname, `templates/stm/${StateManageFolder[stm]}`), projectPath, { recursive: true });
            break
    }

    console.log('\n✅ Файлы успешно сгенерированы');

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

    try {
        console.log('\n📦 Последние приготовления...');
        process.chdir(projectPath); // Переходим в директорию проекта
        execSync('npx eslint --fix .', { stdio: 'inherit' });
        execSync('npx prettier . --write', { stdio: 'inherit' });
        execSync('npx husky', { stdio: 'inherit' });
    } catch (error) {
        console.error('\n❌ Ошибка при последних приготовлениях:');
        console.error(error);
        process.exit(1);
    }

    console.log('\n\n✅ Проект успешно создан\n')
    console.log(`cd ${projectName}\n`)
    console.log(`yarn dev\n\n`)
}

main()
