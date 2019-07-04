//base store with lifecycle functions and events

export default class StoreComponent {

   //properties
   parent;
   settings;
 
 //methods
 //lifecycle
 onCreated = () => {}
 onSettingUpdate = ( oldSettings ) => {}
 //Settings control
 setSettings(settingsNew){
   this.settings = settingsNew;
   this.onSettingUpdate({});
 } 
 updateSettings( settingsToUpdate ){
   var oldSettings = this.settings;
   this.settings = {...this.settings, ...settingsToUpdate };
   this.onSettingUpdate( oldSettings );
} 
 //composition
 CreateComponent( componentClass ){
    var properties = { parent: parent
    };
 	var NewComponennt = new componentClass(properties);
} 
 
 //creating
 constructor( properties ){
   this.parent = properties.parent;
 } 
 
} 

