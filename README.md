# Learning WebPack 

## Instalation
### when you are creating the project for first time
Install WebPack and WebPack CLI in development dependencies
```
npm i webpack webpack-cli -D
```

## Instalation when use a created project
```
npm i
```

## Execution
Have yo exist the source in src/index.js
## Development
```
npx webpack --mode development
```

## Production
```
npx webpack --mode production
```

### With config file
If you would like to execute with a config file add the follow flag
```
--config webpack.config.js
```
Example: Execute on production mode
```
npx webpack --mode production --config webpack.config.js 
```
Example: Execute on development mode
```
npx webpack --mode development --config webpack.config.js 
```

## Plugins and Loaders
### Loaders
#### Webpack only allow JavaScript and JSON.
#### The loaders allow proccess file diferents to become in valid module
#### In top level, we have only two configurations por loaders
* test - This property allow indentify which fila have to be trasformed
* use - This property allow indentify which loader will use for trasform the files

### Plugins
While the loader change modules, the plugins can be used for extend specific functionalities like packege optimization, file management and enviroments variables injections

## Add Babel
Instalation
```
npm install -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime
```
## Explanaiton for each modules

Plugin to work with asyncronus code
#### babel-loader allow use babel with webpack
#### @babel/core babel core
#### @babel/preset-env allow work with last JavaScript features
#### @babel/plugin-transform-runtime allow work with asyncronus code (async y await)

### Create Babel config (like the file in the project)
```
.babelrc
```
### To work babel with webpack
```
  module: {
    rules: [
      {
        test: /\.m?.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      }
    ]
  },
```
### Add HtmlWebpackPlugin

```
npm i html-webpack-plugin -D
```
Add config to plugins section
```
  plugins: [
    new html({
      // CONFIGURACIÓN DEL PLUGIN
      // INYECTA EL BUNDLE AL TEMPLATE HTML
      inject: true,
      // LA RUTA AL TEMPLATE HTML
      template: './public/index.html',
      // NOMBRE FINAL DEL ARCHIVO
      filename: './index.html'
    })
  ]
  ```
### Add Css Plugin

#### For CSS
```
npm i mini-css-extract-plugin css-loader -D
```
Change
```
  {
    test: /\.css$/,
    use: [
      miniCssExtractPlugin.loader
      , 'css-loader'
    ]
  }
```

#### For Stylus

```
npm install --save-dev stylus stylus-loader
```
Change 
```
{
        test: /\.css|\.styl$/i,
        use: [MiniCssExtractPlugin.loader,
            "css-loader",
            "stylus-loader"]
},
```

#### For sass
```
npm i -D node-sass sass-loader
```
Change 
```
{
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"]
},
```

### Add copy Plugin

```
npm i copy-webpack-plugin -D
```

```
const copyPlugin = require('copy-webpack-plugin');

    new copyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets/images'),
          to: './assets/images'
        }
      ]
    })```

### Add loader for images
