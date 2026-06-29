## VetSystem — Sistema de Gestión de Clínica Veterinaria

!\[Angular](https://img.shields.io/badge/Angular-17-red?logo=angular)
!\[TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
!\[Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)
!\[Estado](https://img.shields.io/badge/Estado-Funcional-green)

Aplicación web desarrollada en **Angular 17** con **TypeScript** para digitalizar el proceso de atención de una clínica veterinaria. Permite registrar mascotas y dueños, gestionar citas con calendario de disponibilidad y consultar el historial clínico de cada mascota.

\---

## Contexto del problema

Una clínica veterinaria en crecimiento identificó que su proceso de atención presentaba múltiples ineficiencias: las citas se gestionaban exclusivamente por teléfono, no existía control digital de horarios y se carecía de historial clínico de las mascotas atendidas. Esta situación generó pérdida de citas, errores de comunicación y quejas recurrentes.

|Problema actual|Solución implementada|
|-|-|
|Citas solo por teléfono|Módulo de citas con formulario digital y validación en tiempo real|
|Sin control de horarios|Agenda visual con estado por cita y alertas automáticas de proximidad|
|Sin historial digital|Módulo de historial consultable por mascota con registros de cada consulta|
|Duplicados al registrar|Búsqueda previa de dueños antes del registro con ReactiveForms|
|Sin visibilidad de urgencias|`ResaltarCitaProximaDirective` resalta citas en las próximas 24 horas|
|Cliente desconoce estado de su cita|Badge de estado en tiempo real via `EstadoCitaPipe`|

\---

## Modulos



|Pantalla|Vista|
|-|-|
|Login||
|Dashboard||
|Registro de mascota||
|Agenda de citas||
|Historial clínico||

\---

## Tecnologías utilizadas

|Tecnología|Versión|Uso|
|-|-|-|
|Angular|17.x|Framework principal|
|TypeScript|5.x|Tipado estático, POO|
|Bootstrap|5.3|Componentes UI, responsive|
|Bootstrap Icons|1.11|Iconografía|
|RxJS|7.x|Estado reactivo con BehaviorSubject|
|Angular Router|17.x|Lazy loading, guards|
|Angular ReactiveForms|17.x|Formularios con validación custom|

\---

## Requisitos del entorno

Antes de instalar, asegúrate de tener:

|Herramienta|Versión mínima|Verificación|
|-|-|-|
|Node.js|18.x o superior|`node --version`|
|npm|9.x o superior|`npm --version`|
|Angular CLI|17.x|`ng version`|
|Git|Cualquiera|`git --version`|

### Instalar Angular CLI si no lo tienes:

```bash
npm install -g @angular/cli@17
```

\---

## Instalación paso a paso

### 1\. Clonar el repositorio

```bash
git clone https://github.com/Leito260987/vet-system.git
cd vet-system
```

### 2\. Instalar dependencias

```bash
npm install
```

> Esto instalará Angular, Bootstrap, Bootstrap Icons y todas las dependencias del `package.json`. Puede tomar 1–3 minutos.

### 3\. Verificar que Bootstrap esté configurado

Confirma que `angular.json` tiene estas entradas bajo `"styles"`:

```json
"styles": \[
  "node\_modules/bootstrap/dist/css/bootstrap.min.css",
  "node\_modules/bootstrap-icons/font/bootstrap-icons.css",
  "src/styles.scss"
]
```

\---

## &#x20;Ejecución en desarrollo

```bash
ng serve
```

Abre el navegador en: **http://localhost:4200**

La aplicación recargará automáticamente ante cualquier cambio en el código fuente.

### Credenciales de acceso (modo demo)

```
Email:      cualquier@email.com
Contraseña: cualquier valor (mínimo 1 carácter)
```

> El sistema de autenticación en esta versión es de demostración. Valida que los campos no estén vacíos y almacena la sesión en `localStorage`.

\---

## Build para producción

```bash
ng build --configuration=production
```

Los archivos compilados se generan en `dist/vet-system/`. Verifica que el build termine sin errores antes de entregar.

Para verificar el bundle y el lazy loading:

```bash
ng build --stats-json
# Revisa dist/vet-system/stats.json — cada módulo aparece como chunk separado
```

\---

## Estructura del proyecto

```
src/
└── app/
    ├── app.module.ts                  # Módulo raíz — solo importa BrowserModule y AppRoutingModule
    ├── app-routing.module.ts          # Lazy loading de los 5 módulos
    │
    ├── core/
    │   └── guards/
    │       └── auth.guard.ts          # Protege rutas privadas
    │
    ├── shared/                        # Módulo compartido — pipes, directivas, navbar
    │   ├── shared.module.ts
    │   ├── models/
    │   │   └── animal.model.ts        # Clase abstracta base (herencia + polimorfismo)
    │   ├── pipes/
    │   │   ├── estado-cita.pipe.ts    # Transforma EstadoCita a badge Bootstrap
    │   │   └── edad-mascota.pipe.ts   # Calcula edad desde fecha de nacimiento
    │   ├── directives/
    │   │   ├── resaltar-cita-proxima.directive.ts  # Resalta citas en próximas 24h
    │   │   └── auto-focus.directive.ts             # Foco automático en inputs
    │   └── components/
    │       └── navbar/                # Navbar responsive Bootstrap
    │
    ├── auth/                          # Módulo de autenticación (lazy)
    │   └── components/login/          # Formulario de login con validación
    │
    ├── mascotas/                      # Módulo de mascotas (lazy)
    │   ├── models/
    │   │   └── mascota.model.ts       # Interfaces Mascota, Duenio, ApiResponse<T>, enums
    │   ├── services/
    │   │   └── mascota.service.ts     # CRUD con BehaviorSubject y JSDoc
    │   └── components/
    │       ├── mascota-form/          # ReactiveForm con validadores custom
    │       ├── mascota-card/          # Componente reutilizable con @Input/@Output
    │       └── mascota-list/          # Lista con búsqueda
    │
    ├── citas/                         # Módulo de citas (lazy)
    │   ├── models/
    │   │   └── cita.model.ts          # Interface Cita, enum EstadoCita
    │   ├── services/
    │   │   └── cita.service.ts        # Gestión de agenda con BehaviorSubject
    │   └── components/
    │       ├── cita-form/             # ReactiveForm de nueva cita
    │       └── cita-list/             # Agenda con filtros y Bootstrap Modal
    │
    ├── historial/                     # Módulo de historial (lazy)
    │   ├── models/
    │   │   └── historial-item.model.ts
    │   ├── services/
    │   │   └── historial.service.ts
    │   └── components/
    │       └── historial-mascota/     # Vista con accordion Bootstrap
    │
    └── dashboard/                     # Módulo dashboard (lazy)
        └── components/dashboard/      # Stats cards + próximas citas
```

\---

## Arquitectura técnica

### Patrón de módulos por dominio

Cada módulo de feature (`mascotas`, `citas`, `historial`) contiene sus propios modelos, servicios y componentes. El `AppModule` solo conoce el router y el `SharedModule`.

```
AppModule → AppRoutingModule → \[lazy] MascotasModule
                             → \[lazy] CitasModule
                             → \[lazy] HistorialModule
                             → \[lazy] AuthModule
                             → \[lazy] DashboardModule

SharedModule → EstadoCitaPipe
             → EdadMascotaPipe
             → ResaltarCitaProximaDirective
             → AutoFocusDirective
             → NavbarComponent
```

### Jerarquía de clases TypeScript (POO)

```
Animal (abstract)
├── getTipoAtencion(): string  ← método abstracto (polimorfismo)
├── getEdad(): { anios, meses }
├── get/set nombre             ← encapsulamiento
│
├── Perro extends Animal
│   └── getTipoAtencion() → "Consulta canina..."
│
└── Gato extends Animal
    └── getTipoAtencion() → "Consulta felina..."
```

\---

## Casos de prueba

### CP-01 — Registro de mascota con validaciones

**Precondición:** usuario autenticado, en `/mascotas/nueva`

|Paso|Acción|Resultado esperado|
|-|-|-|
|1|Hacer clic en "Guardar" sin completar ningún campo|Todos los campos muestran error en rojo|
|2|Ingresar nombre del dueño con menos de 4 caracteres ("Car")|Campo en rojo: "Mínimo 4 caracteres"|
|3|Ingresar DNI con letras ("ABCD1234")|Campo en rojo: "Solo 8 dígitos"|
|4|Ingresar teléfono que no inicia con 9 ("812345678")|Campo en rojo: "Teléfono peruano inválido"|
|5|Ingresar fecha de nacimiento futura|Campo en rojo: "La fecha no puede ser futura"|
|6|Completar todos los campos correctamente y guardar|Toast de confirmación, redirect a lista de mascotas|

\---

### CP-02 — Alerta visual de cita próxima (ResaltarCitaProximaDirective)

**Precondición:** existe al menos una cita agendada para las próximas 24 horas

|Paso|Acción|Resultado esperado|
|-|-|-|
|1|Navegar a `/citas`|La fila con cita próxima tiene borde izquierdo amarillo y fondo amarillo claro|
|2|Inspeccionar el elemento en DevTools|Clase `cita-proxima` presente, `border-left: 4px solid #ffc107` aplicado|
|3|Verificar en `/dashboard`|La misma cita aparece resaltada en la lista de próximas citas|

\---

### CP-03 — EstadoCitaPipe con tres salidas

**Precondición:** vista de lista de citas con citas en distintos estados

|Estado|Texto esperado|Clase Bootstrap esperada|Ícono esperado|
|-|-|-|-|
|`PENDIENTE`|"Pendiente"|`badge bg-warning text-dark`|`bi-clock`|
|`CONFIRMADA`|"Confirmada"|`badge bg-success`|`bi-check-circle`|
|`CANCELADA`|"Cancelada"|`badge bg-danger`|`bi-x-circle`|
|`COMPLETADA`|"Completada"|`badge bg-secondary`|`bi-check2-all`|

\---

### CP-04 — EdadMascotaPipe

|Fecha de nacimiento|Resultado esperado|
|-|-|
|Hace exactamente 5 años y 3 meses|"5 años 3 meses"|
|Hace 8 meses (menos de 1 año)|"8 meses"|
|Hace exactamente 1 año|"1 año"|
|Sin fecha|"Edad desconocida"|

\---

### CP-05 — Lazy loading verificado

|Paso|Acción|Resultado esperado|
|-|-|-|
|1|Abrir DevTools → pestaña Network → filtrar por JS|—|
|2|Cargar la app en `/auth/login`|Se carga `main.js` y el chunk de `auth`|
|3|Navegar a `/mascotas`|Se descarga un nuevo chunk: `mascotas-module.js`|
|4|Navegar a `/citas`|Se descarga un nuevo chunk: `citas-module.js`|
|5|Volver a `/mascotas`|No se descarga nada — el chunk ya está en cache|

\---

### CP-06 — Historial por mascota

|Paso|Acción|Resultado esperado|
|-|-|-|
|1|Ir a `/historial`|Campo de búsqueda vacío, sin resultados|
|2|Escribir "Firu"|Aparece "Firulais" en los resultados|
|3|Seleccionar "Firulais"|Se muestra la tarjeta de la mascota con `EdadMascotaPipe` y el historial con accordion|
|4|Expandir primera entrada del accordion|Se muestra fecha, veterinario, diagnóstico y tratamiento|
|5|Buscar mascota que no existe ("Xenomorph")|Mensaje de empty state: "No se encontraron mascotas"|

\---

## &#x20;Integrantes del equipo

|Nombre|Rol en el proyecto|
|-|-|
|\[Leonardo Fabian Basilio Paucara]|Arquitectura y TypeScript|
|\[Leonardo Jaime Sanchez Ramirez]|documentación y estructura del proyecto|
|\[Ruben Gustavo Medrano Ramirez]|módulo citas y dashboard|
|\[Jhonatan Smith Pazo Fuentes]|módulo historial y diseño UI|



