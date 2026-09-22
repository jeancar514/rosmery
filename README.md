# Para Rosmery 💛

Una página de cumpleaños hecha a mano — fotos, videos y un par de capítulos.

## Ver en local

Abre `index.html` con un servidor local (por ejemplo con la extensión "Live Server" de VS Code,
o con Python: `python -m http.server` y luego entra a `http://localhost:8000`).

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público o privado — Pages gratis solo funciona bien en público).
2. Sube este proyecto:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/NOMBRE-REPO.git
   git branch -M main
   git push -u origin main
   ```
3. En GitHub, entra a **Settings → Pages**.
4. En "Build and deployment" elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
5. Espera 1-2 minutos y tu página quedará en `https://TU-USUARIO.github.io/NOMBRE-REPO/`.

Abre ese link desde el teléfono y listo.
