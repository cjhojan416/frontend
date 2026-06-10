# AI Job Agent - Frontend

Frontend de AI Job Agent desarrollado con React y TailwindCSS.

Esta aplicación permite a los usuarios:

* Subir un CV en formato PDF.
* Ingresar una oferta laboral.
* Analizar la compatibilidad entre ambos.
* Generar un CV optimizado mediante Inteligencia Artificial.
* Descargar el nuevo CV generado.

## Tecnologías

* React
* Vite
* Axios
* TailwindCSS

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/cjhojan416/frontend
```

Ingresar al proyecto:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar entorno de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

## Variables de configuración

Modificar la URL del backend según el entorno:

```javascript
const API_URL = "http://localhost:8000";
```

## Funcionalidades

### Carga de CV

Permite seleccionar y subir archivos PDF.

### Análisis ATS

Compara el CV con una oferta laboral y muestra:

* Coincidencias encontradas.
* Habilidades relevantes.
* Oportunidades de mejora.

### Generación de CV

Solicita al backend la creación de una versión optimizada del currículum.

### Descarga PDF

Permite descargar el nuevo CV generado automáticamente.

## Próximas mejoras

* Historial de análisis.
* Modo oscuro.
* Dashboard de usuario.
* Visualización previa del CV generado.
* Mejoras en la experiencia de usuario.

## Autor

Jhojan Cardona
