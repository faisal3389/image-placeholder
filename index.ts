import { 
  Directive, 
  ElementRef, 
  Renderer2, 
  Output, 
  HostListener, 
  EventEmitter,
  Input
} from '@angular/core';

/**
* Directive for lazyloading of images and showing placeholder
* image in case of no image or broken image
* setting initial opacity of image 0.5, and onload it is
* made one.
*/
@Directive({ 
  selector: '[ng-image-placeholder]',
  host: {
      '[style.opacity]': '0.5'
  }
})

export class ImagesDirective {
  
  constructor(
      private _elem: ElementRef, 
      private _renderer: Renderer2
  ) { }

  /**taking input for image src url */
  @Input() src: string;

  /**taking input for image placeholder */
  @Input() placeholder: string;

  /**private variable for array of image formats which are supported */
  private _SUPPORTED_IMAGES_FORMAT: string[] = ['jpg', 'png', 'ico', 'svg', 'jpeg'];

  /**variable which holds the nativeElement of the Image */    
  public currentElement: any;
  
  /**private variables for transition-delay of 1sec */
  private _TRANSITION_DELAY_TIME = '0.5s';

  /**private variable for array of image formats which are supported */
  private _REMOTE_MARKERS: any[] = ['http', 'msecnd.net', 'yum-resources'];    

  /**
   * afterviewinit life cycle hook to show image after the template is loaded
   */
  ngAfterViewInit() {
      this.currentElement = this._elem.nativeElement;
      this.transform(this.src);
  }

  /**
   * transforming the broken or no image to static place holder
   * @param asset - asset src
   */
  transform(asset: string) {
      let finalImageUrl = asset;
      let fallbackImage = this.placeholder ? this.placeholder : '';
      if (!asset || asset === '') {
          return this.loadImage(fallbackImage);
      }
      if (!this._isImageAsset(asset)) {
          return this.loadImage(fallbackImage);
      }
      return this.loadImage(asset);
  }

  /**
   * loading the image based on transform function
   * @param image 
   */
  loadImage(image: string) {
      let defaultImage = this.placeholder ? this.placeholder : '';
      this.currentElement.src = defaultImage;
      const img = new Image();
      if (image) {
          img.src = image;
      } else {
          img.src = defaultImage;
      }
      img.onload = () => {
          this.currentElement.src = img.src
          this._styleUpdateAfterLoad();
      };
      img.onerror = err => {
          this.currentElement.src = defaultImage;
          this._styleUpdateAfterLoad();
      };
  }

  /**
   * to make the opacity one, after transition delay of one sec
   */
  private _styleUpdateAfterLoad() {
      this._renderer.setStyle(
          this.currentElement, 
          'opacity', 1
      );
      this._renderer.setStyle(
          this.currentElement,
          'transition-delay', 
          this._TRANSITION_DELAY_TIME
      );
  }

  /**
   * verifying if the image is an asset image or not
   * @param name 
   */
  private _isImageAsset(name: string) {
      if (!name || name === null || name === '') { return false; }
      for (let i = 0; i < this._SUPPORTED_IMAGES_FORMAT.length; i++) {
          let formatLength = this._SUPPORTED_IMAGES_FORMAT[i].length;
          if (name.length > formatLength) {
              let format = name.slice(-formatLength).toLowerCase();
              if (this._SUPPORTED_IMAGES_FORMAT[i] === format) {
                  return true;
              }
          }
      }
      return false;
  }
  
}