/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\n  const lat = 20.67444163271174;\n  const lng = -103.38739216304566;\n  const mapa = L.map('mapa').setView([lat, lng], 16); //'mapa' es el Id de el archivo .pug\n\n  // para pin\n  let marker;\n  // Utilizar provider y geocoder \n  const geocoderService = L.esri.Geocoding.geocodeService(); //esto permite obtener el nombre de la calle\n\n\n  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n    attribution:\n      '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n  }).addTo(mapa);\n\n  //parapin:\n  marker = new L.marker(\n    [lat, lng], //deja centrado esa lat y long\n    {\n      draggable: true, //Sirve para mover el pin\n      autoPan: true, // sirve para poder mover el pin y que se centre el mapa en donde pongo el pin\n    }\n  ).addTo(mapa);\n\n  //Detectar el movimiento del pin\n  marker.on('moveend', function (e) {\n    marker = e.target; // esto seria un objeto de tipo marker y tiene un proto\n    const posicion = marker.getLatLng();\n    console.log(posicion);\n\n    mapa.panTo(new L.LatLng(posicion.lat, posicion.lng)); //toma el mapa que esta y lo reposiciona\n    //con esas cordenadas y lo centra\n\n    //Obtener la informacion de las calles al soltar el pin (13 es el Zoom) : \n    //geocoderservice necesita una lat y long para dar referencia de calles y otra informacion adicional \n    geocoderService.reverse().latlng(posicion, 13).run(function (error, resultado) {\n      console.log(resultado)\n\n      //si quiero agregar un popup que me diga la informacion de esa calle en ese pin\n      marker.bindPopup(resultado.address.LongLabel)\n\n      //llenar los campos\n      document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';\n      document.querySelector('#calle').value = resultado?.address?.Address ?? '';\n      document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';\n      document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';\n\n      \n    })\n\n  });\n\n\n\n\n\n})();\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;