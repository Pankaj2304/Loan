import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class LinkService {
  constructor(@Inject(DOCUMENT) private doc) {}

  createPharmacyStyleLink() {
    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "assets/admin/css/style.css");
    this.doc.head.appendChild(link);
  }
  createfeatherLink() {
    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "assets/admin/css/feathericon.min.css");
    this.doc.head.appendChild(link);
  }
  createFontLink() {
    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "assets/admin/css/font-awesome.min.css");
    this.doc.head.appendChild(link);
  }
  createBootstrapLink() {
    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute(
      "href",
      "assets/admin/plugins/bootstrap-rtl/css/bootstrap.min.css"
    );
    this.doc.head.appendChild(link);
  }
  createPopperLink() {
    let link: HTMLLinkElement = this.doc.createElement("script");
    link.setAttribute("src", "assets/js/popper.min.js");
    this.doc.head.appendChild(link);
  }
}
