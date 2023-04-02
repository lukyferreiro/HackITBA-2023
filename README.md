# HackITBA-2023

## SmartBite

Lamentablemente no es nada novedoso que en los ultimos años los niveles
de obesidad a nivel mundial aumentan exponencialemnte, y actualmente mas de
1.000 millones de personas alrededor del mundo sufren de este problema.

Esto por esto que surge SmartBite, una aplicacion web encargada de dos funcionalidades
principales:
-Generar N recetas con los ingredientes que el usuario ingrese en la aplicacion
-Generar un plan de alimentacion personalizado segun ciertas preguntas base al usuario.

### Tecnologias y versiones requeridas

-Node.js v18.15.0
-npm 9.5.0

### Ejecucion

Para ejecutar el proyecto, se debe clonar el repositorio y posicionarse sobre la carpeta /smartbite y ejercutar:

```sh
npm install
npm start
```

Tras esto se levantara localmente la pagina web en el browser por defecto, generalmente en 
la url [http://localhost:3000](http://localhost:3000)

Tener en cuenta que hay un archivo .env que debe ser agregado dentro de smartbite, al mismo nivel que src y public.