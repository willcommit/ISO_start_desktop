const settingsHandler = require("./settingsHandler.js")
const localSettings = settingsHandler.loadSettings("settings_local.json")
const globalSettingsPath = localSettings[0].globalSettingsPath

const populate = () => {
    const linkButtons = document.querySelectorAll('a[filePath]')
    const globalSettings = settingsHandler.loadSettings(globalSettingsPath)
    const keys = Object.keys(globalSettings[0].filePaths)
    const paths = Object.values(globalSettings[0].filePaths)

    for (let i = 0; i < linkButtons.length; i++) {

        for (let j = 0; j < keys.length; j++) {
            if(linkButtons[i].id === keys[j]){
                linkButtons[i].setAttribute('filePath', paths[j])
            }   
        }
    }
}

module.exports = {
    populate: populate
}