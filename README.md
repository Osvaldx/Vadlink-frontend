# Vadlink Frontend

Aplicación web frontend desarrollada con Angular 20 que para una plataforma social completa con funcionalidades de posts, comentarios, gestión de usuarios y estadísticas administrativas.

## 🎨 Tecnologías Utilizadas

- **Angular 20.3.13** - Framework principal
- **TypeScript 5.9.2** - Lenguaje de programación
- **Tailwind CSS 4.1.16** - Framework de estilos
- **Chart.js 4.5.1** - Gráficos y visualizaciones
- **RxJS 7.8.0** - Programación reactiva
- **Angular Service Worker** - Funcionalidad PWA
- **Angular SSR** - Server-Side Rendering
- **Express 5.1.0** - Servidor para SSR
- **NgIcons** - Iconos (Heroicons y Font Awesome)
- **UUID 13.0.0** - Generación de identificadores únicos

## 🚀 Características

### Autenticación
- **Login y Registro**: Sistema completo de autenticación con validación de formularios
- **Gestión de tokens**: Renovación automática de tokens JWT con modal de confirmación
- **Sesión persistente**: Carga automática del usuario actual al iniciar la aplicación
- **Cierre de sesión**: Funcionalidad completa de logout

### Posts y Contenido
- **Publicación de posts**: Creación de publicaciones con imágenes
- **Sistema de likes**: Dar y quitar likes a publicaciones
- **Comentarios**: Sistema completo de comentarios en posts
- **Filtros y búsqueda**: Filtrado por usuario, fecha y likes
- **Paginación**: Carga incremental de posts con scroll infinito
- **Eliminación**: Los usuarios pueden eliminar sus propias publicaciones

### Perfil de Usuario
- **Información personal**: Visualización y edición de perfil
- **Avatar y banner**: Subida y gestión de imágenes de perfil
- **Posts del usuario**: Visualización de todas las publicaciones del usuario

### Dashboard Administrativo
- **Gestión de usuarios**: 
  - Listado completo de usuarios
  - Habilitar/deshabilitar usuarios
  - Creación de nuevos usuarios por administradores
- **Estadísticas avanzadas**:
  - Estadísticas de posts por usuario
  - Estadísticas de comentarios
  - Timeline de posts y comentarios
  - Análisis de likes en posts
  - Visualización con gráficos interactivos (Chart.js)

### Interfaz de Usuario
- **Diseño moderno**: Interfaz construida con Tailwind CSS
- **Iconos**: Integración con Heroicons y Font Awesome
- **Notificaciones**: Sistema de toasts para feedback al usuario
- **Animaciones**: Animaciones suaves con Tailwind Animations
- **Loading states**: Indicadores de carga durante operaciones asíncronas
- **Modales**: Modales para confirmaciones y acciones importantes

### Tecnologías Avanzadas
- **PWA (Progressive Web App)**: Service Worker para funcionalidad offline
- **SSR (Server-Side Rendering)**: Renderizado del lado del servidor con Angular SSR
- **Zoneless Change Detection**: Detección de cambios optimizada sin zonas
- **Interceptores HTTP**: Manejo automático de headers y errores
- **Guards de rutas**: Protección de rutas con guards personalizados

## 📋 Requisitos Previos

- **Node.js**: Versión 18 o superior
- **npm**: Versión 9 o superior (incluido con Node.js)
- **Angular CLI**: Se instalará automáticamente como dependencia

## 📁 Estructura del Proyecto

```
vadlink-frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── charts-template/ # Plantilla para gráficos
│   │   │   ├── comments/        # Sistema de comentarios
│   │   │   ├── custom-post/     # Componente de post personalizado
│   │   │   ├── form-register/   # Formulario de registro
│   │   │   ├── info-profile/    # Información de perfil
│   │   │   ├── input-upload-image/ # Input para subir imágenes
│   │   │   ├── nav-bar/         # Barra de navegación
│   │   │   ├── nav-button/      # Botones de navegación
│   │   │   ├── post-form/        # Formulario de posts
│   │   │   ├── refresh-modal/   # Modal de renovación de token
│   │   │   ├── screen-loading/  # Pantalla de carga
│   │   │   ├── toast-message/   # Mensajes toast individuales
│   │   │   ├── toasts-manager/  # Gestor de toasts
│   │   │   └── users-table/     # Tabla de usuarios (admin)
│   │   ├── directives/          # Directivas personalizadas
│   │   ├── enums/               # Enumeraciones
│   │   ├── guards/              # Guards de rutas
│   │   │   ├── admin-guard.ts   # Guard para rutas de admin
│   │   │   └── home-guard.ts    # Guard para rutas protegidas
│   │   ├── interceptors/        # Interceptores HTTP
│   │   │   ├── header-interceptor.ts    # Interceptor de headers
│   │   │   └── handled-errors-interceptor.ts # Manejo de errores
│   │   ├── interfaces/          # Interfaces TypeScript
│   │   ├── layouts/             # Layouts de la aplicación
│   │   │   └── main-layout/     # Layout principal
│   │   ├── pages/               # Páginas de la aplicación
│   │   │   ├── auth/            # Páginas de autenticación
│   │   │   ├── dashboard/       # Dashboard administrativo
│   │   │   ├── posts/           # Página de posts
│   │   │   └── profile/         # Página de perfil
│   │   ├── pipes/               # Pipes personalizados
│   │   ├── services/            # Servicios
│   │   │   ├── admin-service.ts      # Servicio de administración
│   │   │   ├── auth.ts              # Servicio de autenticación
│   │   │   ├── comments-service.ts  # Servicio de comentarios
│   │   │   ├── form-error-service.ts # Servicio de errores de formulario
│   │   │   ├── message-manager.ts   # Gestor de mensajes
│   │   │   ├── posts-service.ts     # Servicio de posts
│   │   │   └── stats-service.ts     # Servicio de estadísticas
│   │   └── validators/          # Validadores personalizados
│   ├── assets/                  # Recursos estáticos
│   ├── environments/            # Configuración de entornos
│   └── styles.css               # Estilos globales
├── public/                      # Archivos públicos
├── angular.json                 # Configuración de Angular
├── package.json                 # Dependencias del proyecto
└── tsconfig.json                # Configuración de TypeScript
```

## 🔐 Rutas de la Aplicación

### Rutas Públicas
- `/auth/login` - Página de inicio de sesión
- `/auth/register` - Página de registro

### Rutas Protegidas (requieren autenticación)
- `/posts` - Feed de publicaciones
- `/profile` - Perfil del usuario

### Rutas de Administrador
- `/dashboard/users` - Gestión de usuarios
- `/dashboard/stats` - Estadísticas y análisis

## 🔧 Configuración Adicional

### Service Worker (PWA)
El Service Worker está configurado en `ngsw-config.json` y se activa automáticamente en modo producción.

## 📝 Validadores Personalizados

El proyecto incluye validadores personalizados para formularios:
- Validación de errores de input
- Validadores de formularios de registro

## 🧪 Testing

El proyecto está configurado con:
- **Jasmine** - Framework de testing
- **Karma** - Test runner
- **Karma Coverage** - Cobertura de código