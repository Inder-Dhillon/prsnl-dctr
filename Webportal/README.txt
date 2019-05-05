A Pen created at CodePen.io. You can find this one at https://codepen.io/brian_jenney/pen/akgrJR.

 This example of uploading files to firebase storage actually works, so please use sparingly. 

I re-configured the rules so anyone can upload:
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write
    }
  }
}
Was frustrated with all the overly-complicated examples, and wanted to use this cool feature client-side. Hope this helps you! 

Please fork and make this cooler if it so behooves you