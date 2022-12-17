// import { createElement } from '../render';


// function createOffersTemplate(trip) {
// console.log(trip)
// const {title, price} = trip;
//   return (`<div class="event__offer-selector">
// <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
// <label class="event__offer-label" for="event-offer-luggage-1">
//   <span class="event__offer-title">${title}</span>
//   &plus;&euro;&nbsp;
//   <span class="event__offer-price">${price}</span>
// </label>
// </div>`);
// }

// export default class Offers {

//   constructor({trip}) {
//     this.trip = trip;
//   }

//   getTemplate() {
//     return createOffersTemplate(this.trip);
//   }

//   getElement() {
//     if(!this.element) {
//       this.element = createElement(this.getTemplate());
//     }

//     return this.element;
//   }

//   removeElement() {
//     this.element = null;
//   }
// }

// // console.log(Offers)
