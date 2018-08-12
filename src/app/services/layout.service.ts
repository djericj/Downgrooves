import { Injectable } from "@angular/core";

@Injectable()
export class LayoutService {
  loadedImageCount;
  imageCount;
  constructor() {}

  fixHeaderHeight() {
    var bodyHeight = $(window).outerHeight(),
      containerHeight = $(".inner-content").outerHeight(),
      headerHeight = $("header");
    console.log(headerHeight);
    if (bodyHeight > containerHeight) {
      headerHeight.css("height", bodyHeight);
    } else {
      headerHeight.css("height", containerHeight);
    }
  }

  // triggered after each item is loaded
  onProgress(imgLoad, image) {
    // change class if the image is loaded or broken
    // image.img.parentNode.className = image.isLoaded ? "" : "is-broken";
    // // update progress element
    // this.loadedImageCount++;
    // this.updateProgress(this.loadedImageCount);
  }

  // hide status when done
  onAlways() {
    // statusElem.style.opacity = 0;
  }

  //   resetProgress() {
  //   statusElem.style.opacity = 1;
  //   this.loadedImageCount = 0;
  //   if (supportsProgress) {
  //     progressElem.setAttribute("max", imageCount);
  //   }
  // }

  // updateProgress(value) {
  //   if (supportsProgress) {
  //     progressElem.setAttribute("value", value);
  //   } else {
  //     // if you don't support progress elem
  //     setText(statusElem, value + " / " + this.imageCount);
  //   }
}
