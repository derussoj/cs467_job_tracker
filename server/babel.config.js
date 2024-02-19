/*
code provided by ChatGPT4 via chat.openai.com

Prompt(s): requested help configuring Jest for .mjs files
*/

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
};
