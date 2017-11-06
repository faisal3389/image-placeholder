# Angular Image Placeholder Module

## Description
Module for Image placeholder Directive for angular apps when images are loaded dynamically over network calls

## API usage

#### Install with npm:
```
$ npm install --save ng-image-placeholder
```

in app.module.ts add the following in declarations
```
import { ImagesDirective } from 'ng-image-placeholder';

@NgModule({
  declarations: [
    ImagesDirective
  ]
```
#### example
```
<img ng-image-placeholder src="{{image src}}" alt="{{image alt text}}">
```
## CHANGELOG

* 1.0.0 -- first publish
           
## TODO
* need to make broken image dynamic
* need to seperate out no-image and broken image case


## Contributors
* Faisal Ali