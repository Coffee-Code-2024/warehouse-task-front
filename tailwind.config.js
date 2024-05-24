import { nextui } from "@nextui-org/react";

module.exports = {
    content: [
        "./node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js"

    ],
    theme: {
        extend: {}
    },
    darkMode: "class",
    plugins: [nextui()]
}