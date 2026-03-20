GUIA DE INSTALACION Y EJECUCION
1. Requisitos previos
Antes de empezar, instalar:
- Git → para clonar el repositorio.
- Visual Studio Code (VS Code) → editor de código.
- Node.js (última versión estable) → para el backend.
- Flutter SDK → para el frontend.
- Android Studio (solo necesario si se quiere probar la app en un emulador Android).
👉 Nota: Cada instalación tiene asistentes gráficos, basta con descargar desde la página oficial y dar clic en “Siguiente” hasta terminar.


2. Clonar el repositorio
- Abrir VS Code.
- Abrir la terminal integrada (menú Ver → Terminal).
- Escribir:
git clone
cd //tucarpeta

3. Abrir dos ventanas de VS Code
- Ventana 1 (Application_flutter1):
- En VS Code, abrir la carpeta frontend (dentro del repositorio).
- Instalar dependencias: (en la terminal)
- flutter pug get

4. Para correr la app
- flutter run

5. Ventana 2 (Node.js)
- Abrin la carpeta (Api_basic)
- Instalar dependecias
- (En la terminal)
- npm intall

6. Correr el servidor
- npm run dev

7. Dependecias necesarias
  /// Frontend ///
- flutter y dart (SDK)
  /// Backend ///
- Express , cors y dotenv

  Flujo de trabajo
. 	Abrir dos ventanas de VS Code:
• 	Una con el frontend (Flutter).
• 	Otra con el backend (Node.js).
. 	Levantar primero el backend con .
. 	Levantar el frontend con .
. 	La aplicación Flutter se conectará al backend Node.js para obtener datos.
- Express, cors 


