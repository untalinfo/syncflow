# Syncflow - Offline First Fullstack App

Aplicación de sincronización offline-first desarrollada con **React (Vite + TypeScript)** en el frontend y **.NET 8 (Minimal APIs)** en el backend.

## 🚀 Cómo ejecutar localmente

La forma más sencilla y garantizada de correr este proyecto es utilizando **Docker Compose**.

1. Asegúrate de tener **Docker** y **Docker Compose** instalados (O simplemente Docker Desktop).
2. Abre la terminal en la raíz de este proyecto (donde está el archivo `docker-compose.yml`).
3. Ejecuta el comando:
   ```bash
   docker-compose up -d --build
   ```
4. Navega en tu navegador a:
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost:5050/api/requests](http://localhost:5050/api/requests)

> **Nota:** La configuración de volumen (`volumes`) en el entorno Docker activa el Hot Reload en ambos servicios. Puedes editar código local y se relejará en vivo sin detener los contenedores.

Si deseas correr el frontend sin Docker (ya que las dependencias fueron instaladas vía `pnpm`):
```bash
cd frontend
pnpm install
pnpm dev
```

## 🛠 Arquitectura y Patrones Aplicados (Clean Architecture & DDD)

El Frontend está organizado respetando **Clean Architecture**, dividiendo todo en:
- `Domain`: Reglas de negocio puras ignorando cualquier librería. Aquí viven las interfaces para repositorios y las interfeaz de los patrones.
- `Application`: Casos de uso (`SyncRequestsUseCase`, `CreateRequestUseCase`) que orquestan el negocio.
- `Infrastructure`: Implementaciones reales. `LocalStorageRepository` para emular persistencia offline fácilmente y `RemoteRepository` para Fetch a la API final.
- `Presentation`: Código de React (Context, Componentes y UI) que solo consume los Casos de Uso.

**Patrones de diseño utilizados obligatorios:**
1. **Patrón Composite**: Empleado para la Agrupación de solicitudes (`RequestGroup` y `RequestItem` comparten la interfaz `IRequestNode` con el método `.count()` y la agregación recursiva).
2. **Patrón Strategy**: Empleado para el proceso dinámico de payload. Dependiendo el flag `type`, el procesador aplicará `TextTransformStrategy` o `StructureModifyStrategy` antes de que la app envíe el request al endpoint. Cumpliendo Open/Closed principle de SOLID.

## 🔧 Componentes y Tecnologías
- **Frontend**: Vite, React 19, SASS (SCSS) Estilizado con Glassmorphism, TypeScript. **Herramientas**: Biomejs (Linting/Formateo), Vitest & Testing Library (Pruebas unitarias).
- **Backend**: .NET 8 (C# 12) utilizando Minimal APIs para simplificar la lectura, Entity Framework Core y Base de datos genérica cruzada sobre **SQLite**.
- **Orquestación**: Docker Compose.

## 🧪 Pruebas y Calidad de Código en Frontend (Linter & Testing)

Hemos configurado **Biome** y **Vitest** en el frontend de este proyecto para garantizar un entorno de desarrollo moderno, rápido y fiable.

Para utilizarlos, puedes ejecutar los siguientes comandos posicionándote en la carpeta `/frontend`:

**Biome (Remplazo de ESLint + Prettier):**
- `pnpm run lint`: Chequea la aplicación en búsqueda de potenciales errores de código.
- `pnpm run format`: Formatea el código automáticamente bajo los estándares y reglas más estrictos.

**Vitest & React Testing Library (Pruebas Unitarias orientadas a comportamiento de DOM):**
- `pnpm run test`: Corre toda la suite de pruebas unitarias de forma interactiva (modo watch).
- `pnpm run test:ui`: Inicia un dashboard UI web interactivo con los resultados de tests.

*(Tip: en entornos Docker puedes correr de forma interactiva ejecutando: `docker exec -it <nombre-contenedor-frontend> pnpm run test` ó integrarlo al pipeline usando el flag `--run`).*

## ⚙️ Variables necesarias
La aplicación no requiere variables de entorno obligatorias para funcionar ya que aprovecha defaults locales listos para correr:
- El backend corre un **SQLite** embebido cuyo archivo `.db` se auto-genera si no existe.
- El frontend apunta nativamente por defecto a `http://localhost:5050/api` usando Fetch.
