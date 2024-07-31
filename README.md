La aplicacion se divide en 3 seccions siguiendo los patrones de CLEAN ARCHITECTURE

## PRESENTATION

En esta seccion se engloba lo mas cercano a quienes consumiran el servicio, es la capa externa, y esta dividida en carpetas por modulos.

Dentro de cada módulo estan incluidas la rutas y controllers.

En la ruta cada accion debe llamar a un caso de uso, el mismo que debe llamar a una funcion del controller, por ejemplo: login, registro, etc.

### Auth

todo lo relacionado a la autenticación

## DOMAIN

Son las reglas de nuestra aplicación, aqui van las Entities, los DTOS
