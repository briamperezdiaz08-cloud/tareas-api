# Tareas API

API REST para gestión de tareas, construida con Node.js y Express, con persistencia en PostgreSQL, autenticación JWT y un sistema de registro de actividad (logs) en MongoDB.

## 🚀 Características

- CRUD completo de tareas (crear, leer, actualizar, eliminar)
- Autenticación de usuarios con JWT (registro y login)
- Contraseñas encriptadas con bcrypt
- Rutas protegidas mediante middleware de autenticación
- Persistencia en PostgreSQL para los datos principales
- Registro de actividad (auditoría) en MongoDB: quién creó, actualizó o eliminó cada tarea
- Arquitectura en capas (routes → controllers → models/config)
- Variables de entorno para configuración sensible

## 🛠️ Tecnologías

- **Node.js** + **Express** — servidor y enrutamiento
- **PostgreSQL** (`pg`) — base de datos relacional para tareas y usuarios
- **MongoDB** (`mongoose`) — base de datos NoSQL para logs de actividad
- **JWT** (`jsonwebtoken`) — autenticación basada en tokens
- **bcrypt** — encriptación de contraseñas
- **dotenv** — manejo de variables de entorno
- **nodemon** — recarga automática en desarrollo

## 📁 Estructura del proyecto

```
src/
├── index.js                  # Punto de entrada del servidor
├── config/
│   └── db.js                 # Conexión a PostgreSQL
├── models/
│   └── Log.js                # Esquema de Mongoose para logs de actividad
├── routes/
│   ├── tareas.routes.js      # Endpoints de /tareas
│   └── auth.routes.js        # Endpoints de /auth
├── controllers/
│   ├── tareas.controller.js  # Lógica de negocio de tareas
│   └── auth.controller.js    # Lógica de registro/login
└── middlewares/
    └── auth.middleware.js    # Verificación de JWT
```

## ⚙️ Instalación y configuración

1. Clona el repositorio:
```bash
git clone https://github.com/briamperezdiaz08-cloud/tareas-api.git
cd tareas-api
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz con las siguientes variables:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=tareas_db
DB_PASSWORD=tu_contraseña
DB_PORT=5432
JWT_SECRET=tu_clave_secreta
MONGO_URI=tu_connection_string_de_mongodb_atlas
```

4. Crea las tablas en PostgreSQL:
```sql
CREATE TABLE tareas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  completada BOOLEAN DEFAULT false,
  creada_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT NOW()
);
```

5. Corre el servidor en modo desarrollo:
```bash
npm run dev
```

El servidor queda disponible en `http://localhost:3000`.

## 📚 Documentación de la API

### Autenticación

| Método | Endpoint | Descripción | Protegida |
|--------|----------|--------------|-----------|
| POST | `/auth/registro` | Registra un usuario nuevo | No |
| POST | `/auth/login` | Inicia sesión y devuelve un token JWT | No |

**Registro — body de ejemplo:**
```json
{ "email": "usuario@ejemplo.com", "password": "123456" }
```

**Login — body de ejemplo:**
```json
{ "email": "usuario@ejemplo.com", "password": "123456" }
```
Respuesta:
```json
{ "token": "eyJhbGciOiJIUzI1NiIs..." }
```

### Tareas

Todas las rutas de tareas requieren el header:
```
Authorization: Bearer <token>
```

| Método | Endpoint | Descripción |
|--------|----------|--------------|
| GET | `/tareas` | Lista todas las tareas |
| GET | `/tareas/:id` | Obtiene una tarea por id |
| POST | `/tareas` | Crea una tarea nueva |
| PUT | `/tareas/:id` | Actualiza una tarea (parcial) |
| DELETE | `/tareas/:id` | Elimina una tarea |

**Crear tarea — body de ejemplo:**
```json
{ "titulo": "Aprender Express" }
```

**Actualizar tarea — body de ejemplo:**
```json
{ "completada": true }
```

### Códigos de estado usados

| Código | Significado |
|--------|--------------|
| 200 | Solicitud exitosa |
| 201 | Recurso creado |
| 204 | Eliminado exitosamente (sin contenido) |
| 400 | Solicitud inválida (datos faltantes) |
| 401 | No autorizado (token faltante o inválido) |
| 404 | Recurso no encontrado |
| 409 | Conflicto (ej. email ya registrado) |
| 500 | Error del servidor |

## 🗂️ Registro de actividad (MongoDB)

Cada vez que se crea, actualiza o elimina una tarea, se guarda automáticamente un documento en la colección `logs` de MongoDB con: `tareaId`, `accion`, `detalle` (incluye el usuario responsable) y `fecha`.

## 👤 Autor

Briam Steve Pérez Díaz — [github.com/briamperezdiaz08-cloud](https://github.com/briamperezdiaz08-cloud)
