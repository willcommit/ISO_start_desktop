const settingsHandler = require("./settingsHandler.js")
const path = require('path');

const populate = () => {
     localSettings = settingsHandler.loadSettings("./settings_local.json")
     globalSettingsPath = path.resolve(__dirname, localSettings.globalSettingsPath)
     globalSettings = settingsHandler.loadSettings(globalSettingsPath) 
     linkFileButtons = document.querySelectorAll('a[filePath]')
     linkFolderButtons = document.querySelectorAll('a[folderPath]')


    for (let i = 0; i < linkFileButtons.length; i++) {
        for (let j = 0; j < globalSettings.files.length; j++) {
            if(linkFileButtons[i].id === globalSettings.files[j].id){
                linkFileButtons[i].setAttribute('filePath', globalSettings.files[j].filePath)
            }   
        }
    }
}

module.exports = {
    populate: populate
}