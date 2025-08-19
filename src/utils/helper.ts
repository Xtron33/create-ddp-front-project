export function sortImports(imports: string[]): string[] {
    const getPath = (imp: string): string => {
        const match = imp.match(/["']([^"']+)["']/);
        return match ? match[1] : "";
    };

    const isSideEffect = (imp: string): boolean => !imp.includes(" from ");

    type Group = "react" | "builtin" | "external" | "internal";

    const getGroup = (path: string): Group => {
        if (path.startsWith("react")) return "react";
        if (
            /^(fs|path|os|http|https|crypto|util|stream|url|zlib|events|child_process|net|tls|dns|querystring|readline|buffer|assert|cluster|module|punycode|string_decoder|timers|tty|v8|vm|worker_threads)$/i.test(
                path
            )
        ) {
            return "builtin";
        }
        if (path.startsWith("@routes") || path.startsWith(".")) return "internal";
        return "external";
    };

    const groups: Record<Group, string[]> = {
        react: [],
        builtin: [],
        external: [],
        internal: [],
    };

    for (const imp of imports) {
        const path = getPath(imp);
        const group = getGroup(path);
        groups[group].push(imp);
    }

    const sortAlpha = (arr: string[]) =>
        arr.sort((a, b) => getPath(a).localeCompare(getPath(b)));

    const sortGroup = (arr: string[]) => {
        const normal = sortAlpha(arr.filter((imp) => !isSideEffect(imp)));
        const sideEffect = sortAlpha(arr.filter(isSideEffect));
        return [...normal, ...sideEffect];
    };

    const result: string[] = [];

    if (groups.react.length) {
        result.push(...sortGroup(groups.react), "");
    }
    if (groups.builtin.length) {
        result.push(...sortGroup(groups.builtin), "");
    }
    if (groups.external.length) {
        result.push(...sortGroup(groups.external), "");
    }
    if (groups.internal.length) {
        result.push(...sortGroup(groups.internal), "");
    }

    if (result[result.length - 1] === "") result.pop();

    return result;
}
