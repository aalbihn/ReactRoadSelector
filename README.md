To run app:

Node.js needs to be installed which include the npm-cli tool.<br>
You also need a local instance of the lmdb-road-wfs api running. See below.<br>

`git clone` repo to preferred location<br>
`cd` to the folder<br>
`npm install` (installs the implemented packages needed for the app)<br>
`npm start`<br>

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### WFS Service

This application is dependent on a local instance of lmdb-road-wfs API to be running and delivering geoJson.
The endpoint for that delivery might need an annotation `'@CrossOrigin(origins = "http://localhost:3000")'`