# Tros Nou

Tema WordPress minimalista de una sola página para la productora audiovisual **Tros Nou**.

- Vídeo hero en bucle (~8 s), fundido al contacto al desplazarse
- Logo fijo, email mailto y enlace «+» configurable desde el Personalizador
- Actualizaciones automáticas desde GitHub (repo público)

## Instalación (primera vez)

### Opción A — Zip

1. Descarga o genera `tros-nou-theme.zip` (la carpeta dentro del zip debe llamarse `tros-nou`).
2. En WordPress: **Apariencia → Temas → Añadir nuevo → Subir tema**.
3. Sube el zip y activa **Tros Nou**.

### Opción B — Clonar en `wp-content/themes`

```bash
cd wp-content/themes
git clone https://github.com/lexisphoenix/tros-nou.git tros-nou
```

Activa el tema en **Apariencia → Temas**.

## Editar sin código

**Apariencia → Personalizar → Tros Nou — Contacto**

| Opción | Qué hace |
|--------|----------|
| **Email de contacto** | Dirección visible y enlace mailto |
| **URL del «+»** | Enlace del símbolo + debajo del email |
| **Color de fondo (pantalla de contacto)** | Color del fundido final |

Opcional: **Tros Nou — Hero** — vídeo o imagen poster.

## Publicar una actualización

1. Haz los cambios en el tema.
2. Sube la versión en `style.css` (cabecera `Version:`) y, si quieres, en `TROS_NOU_VERSION` dentro de `functions.php`. Debe ser **mayor** que la instalada (p. ej. `1.1.0` → `1.2.0`).
3. Commit y push a la rama `main`:

   ```bash
   git add .
   git commit -m "release: versión 1.2.0"
   git push origin main
   ```

4. En el WordPress del cliente, en **Apariencia → Temas** (o **Actualizaciones**), aparecerá **Actualizar** cuando WordPress compruebe el repositorio.

No hace falta token: el repositorio es público. Opcionalmente puedes crear un **Release** en GitHub con el mismo número de versión.

## Requisitos

- WordPress 6.0+
- PHP 7.4+

## Licencia

GPL v2 o posterior.
