/**
    Programado por Luis Cabrera Benito 
  ____          _____               _ _           _       
 |  _ \        |  __ \             (_) |         | |      
 | |_) |_   _  | |__) |_ _ _ __ _____| |__  _   _| |_ ___ 
 |  _ <| | | | |  ___/ _` | '__|_  / | '_ \| | | | __/ _ \
 | |_) | |_| | | |  | (_| | |   / /| | |_) | |_| | ||  __/
 |____/ \__, | |_|   \__,_|_|  /___|_|_.__/ \__, |\__\___|
         __/ |                               __/ |        
        |___/                               |___/         
    
    
    Blog:       https://parzibyte.me/blog
    Ayuda:      https://parzibyte.me/blog/contrataciones-ayuda/
    Contacto:   https://parzibyte.me/blog/contacto/
*/
const funcionInit = () => {
	if (!"geolocation" in navigator) {
		return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
	}

	let idWatcher = null;

	const $latitud = document.querySelector("#latitud"),
		$longitud = document.querySelector("#longitud"),
		$btnIniciar = document.querySelector("#btnIniciar"),
		$btnDetener = document.querySelector("#btnDetener"),
		$log = document.querySelector("#log");


	const onUbicacionConcedida = ubicacion => {
		console.log(ubicacion);
		const coordenadas = ubicacion.coords;
		$latitud.innerText = coordenadas.latitude;
		$longitud.innerText = coordenadas.longitude;
		loguear(`${ubicacion.timestamp}: ${coordenadas.latitude},${coordenadas.longitude}`);
	}

	const loguear = texto => {
		$log.innerText += "\n" + texto;
	};

	const onErrorDeUbicacion = err => {

		$latitud.innerText = "Error obteniendo ubicación: " + err.message;
		$longitud.innerText = "Error obteniendo ubicación: " + err.message;
		console.log("Error obteniendo ubicación: ", err);
	}

	const detenerWatcher = () => {
		if (idWatcher) {
			navigator.geolocation.clearWatch(idWatcher);
			idWatcher = null;
		}
	}

	const opcionesDeSolicitud = {
		enableHighAccuracy: true, // Alta precisión
		maximumAge: 0, // No queremos caché
		timeout: 5000 // Esperar solo 5 segundos
	};


	$btnIniciar.addEventListener("click", () => {
		detenerWatcher();
		idWatcher = navigator.geolocation.watchPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
	});

	$btnDetener.addEventListener("click", detenerWatcher);

	$latitud.innerText = "Cargando...";
	$longitud.innerText = "Cargando...";


};
document.addEventListener("DOMContentLoaded", funcionInit);
