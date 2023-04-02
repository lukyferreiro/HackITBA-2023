# HackITBA-2023 - SmartBite (by Factory)

## Autores

- [https://github.com/pescudeiro] (Patricio Escudeiro)
- [https://github.com/lukyferreiro] (Lucas Agustin Ferreiro)
- [https://github.com/mateoperezrivera] (Mateo Perez Rivera)
- [https://github.com/IanSzejer] (Ian Szejer)

### Propuesta

Lamentablemente no es nada novedoso que en los ultimos años los niveles
de obesidad a nivel mundial aumentan exponencialemnte, y actualmente mas de
1.000 millones de personas alrededor del mundo sufren de este problema.

Esto por esto que surge SmartBite, una aplicacion web encargada de dos funcionalidades
principales:
- Generar N recetas con los ingredientes que el usuario ingrese en la aplicacion
- Generar un plan de alimentacion personalizado segun ciertas preguntas base al usuario.

### Tecnologias y versiones requeridas

- Node.js v18.15.0
- npm 9.5.0

Tener en cuenta que hay un archivo .env que debe ser agregado dentro del directorio smartbite (al mismo nivel de /src).
Dicho archivo debe tener una variable llamada REACT_APP_CHATGPT_API_KEY, con una key de chatGPT valida.

Para crear la key dirigirse a [https://platform.openai.com/docs/introduction](https://platform.openai.com/docs/introduction), 
iniciar sesion (o registrarse) y dentro de las opciones al hacer click en el perfil se podra encontrar la opcion "View API key", donde se podra crear un API key facilmente.

### Ejecucion

Para ejecutar el proyecto, se debe clonar el repositorio y posicionarse sobre la carpeta /smartbite y ejecutar:

```sh
npm install
npm start
```

Tras esto se levantara localmente la pagina web en el browser por defecto, generalmente en 
la url [http://localhost:3000](http://localhost:3000)