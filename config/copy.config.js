// New copy task for font files
module.exports = {
    copyFontAwesomeCss: {
        src: ['{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css'],
        dest: '{{BUILD}}/assets/css'
    },
    copyFontAwesome: {
        src: ["{{ROOT}}/node_modules/font-awesome/fonts/**/*"],
        dest: "{{BUILD}}/assets/fonts"
    }
};