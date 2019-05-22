const path = require('path');
const {shell} = require('electron')
const { dialog } = require('electron').remote
const settingsHandler = require("./resources/js/settingsHandler.js")

const localSettings = settingsHandler.loadSettings("settings_local.json")
const globalSettingsPath = localSettings[0].globalSettingsPath
const globalSettings = settingsHandler.loadSettings(globalSettingsPath)

class File {
    constructor (id){
        this.id = id
    }
}

// Add an event listener to our button.

const listButtons = document.getElementsByClassName('dropdown-item embed-link')


const options  = {
    buttons: ["OK"],
    message: "This function needs setup to work, please contact: \n\n william@loxodromic.se"
   }

const activeFile = new File("placeholder")

for (i = 0; i < listButtons.length; i++) {
    listButtons[i].addEventListener('click', (event) => {
    
        if (event.target.getAttribute('filePath')){
            const filePath = path.resolve(__dirname, event.target.getAttribute('filePath'))
            const viewerEle = document.getElementById('viewer')
            activeFile.id = event.target.getAttribute('id')
            

            viewerEle.innerHTML = '' // destroy the old instance of PDF.js (if it exists)
        
            // Create an iframe that points to our PDF.js viewer, and tell PDF.js to open the file that was selected from the file picker.
            const iframe = document.createElement('iframe');
            iframe.src = path.resolve(__dirname, `public/pdfjs/web/viewer.html?file=${filePath}`);
            // Add the iframe to our UI.
            viewerEle.appendChild(iframe)     

        } else if (event.target.getAttribute('folderPath')){
           
            if(!shell.openItem(event.target.getAttribute('folderPath'))){
                dialog.showMessageBox(options, i => console.log(i))
            }else{
                shell.openItem(event.target.getAttribute('folderPath'))
            }
            
        }else{
            dialog.showMessageBox(options, i => console.log(i))
        }       
    })
}
      

document.getElementById("fileReplace").addEventListener('submit', (event) => {
    event.preventDefault()
    const keys = Object.keys(globalSettings[0].filePaths)
    debugger
    //TODO remake settingsfile!
    for (let i = 0; i < keys.length; i++) {
        if(keys[i] === activeFile.id){
            globalSettings[0].filePaths[i+1] = event.target[0].files[0].path
        }
    }
    settingsHandler.saveSettings(globalSettings,globalSettingsPath)
    populateFiles.populate()
});
