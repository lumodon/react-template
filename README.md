# React Template

Template for getting react apps up and running quickly

# Initialization / Setup

```
1. Ensure you copy all template files to config files.
  A. `cp web-app/deploy.sh.template web-app/deploy.sh`
  B. `cp web-app/src/.env.template web-app/src/.env`
  C. Edit files and populate with necessary configurations
    * "$$" are intended to be replaced
2. `npm install`
3. For initial dev to work you may need to download `Gilroy-Bold.ttf` and place it in `web-app/public/Gilroy-Bold.ttf` (It's only there as example, feel free to remove this from `web-app/src/components/pages/Home.jsx` altogether)
4. `npm run dev`
```

* For production run `npm run build` to generate a `.tar.gz` file of the dist folder  
* you may run `npm run deploy` or just `./deploy.sh` to deploy to remote host once configured  