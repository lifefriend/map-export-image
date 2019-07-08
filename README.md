# map-export-image
[![npm](https://img.shields.io/npm/v/map-export-image.svg)](https://www.npmjs.com/package/map-export-image)

map-export-image

## Get Start

## Installation

```
npm install map-export-image --save
```

```
yarn add map-export-image
```


### Usage

```javascript
// ES6
import { down,toCanvas } from 'map-export-image' 

down('map_container_id')
or
down('map_container_id',{
   rect:[[100,100],[200,200]]，
   borderWidth:0 
})
or 
toCanvas('map_container_id').then(canvas=>{
   //
})

// <script src="index.common.js"></script>
mapExportImage.down('map_container_id')
or
mapExportImage.down('map_container_id',{
    rect:[[100,100],[200,200]]
})
or
mapExportImage.toCanvas('map_container_id').then(canvas=>{
   //
})
```

## Parameter

| Parameter |             | Type   | Description          | Example               |
| --------- | ----------- | ------ | -------------------- | --------------------- |
| domId     |             | String | map container id     | map_container_id      |
| option    | rect        | Array  | cut area             | [[100,100],[200,200]] |
|           | borderWidth | Number | rectangle line width | 0                     |