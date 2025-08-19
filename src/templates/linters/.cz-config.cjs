module.exports = {
  types: [
    { value: "feat", name: "feat:     новая функциональность" },
    { value: "fix", name: "fix:      исправление ошибки" },
    { value: "docs", name: "docs:     документация" },
    { value: "style", name: "style:    форматирование (не влияет на код)" },
    { value: "refactor", name: "refactor: рефакторинг кода" },
    { value: "perf", name: "perf:     улучшение производительности" },
    { value: "test", name: "test:     добавление тестов" },
    { value: "chore", name: "chore:    прочее" },
  ],
  scopes: [
    { name: "feature" },
    { name: "component" },
    { name: "file" },
    { name: "api" },
    { name: "build" },
  ],
  messages: {
    type: "Выберите тип коммита:",
    scope: "Выберите область коммита:\n",
    customScope: "Введите свою область коммита:\n",
    subject: "Напишите краткое описание коммита:\n",
    confirmCommit:
        "Вы уверены, что хотите создать коммит с вышеописанным сообщением?",
  },
  allowCustomScopes: true,
  allowEmptyScopes: true,
  skipQuestions: ["footer", "body", "breaking"],
}
