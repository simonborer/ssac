"use strict";

const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const { promisify } = require('util');
// const marked = require('marked');
const frontMatter = require('front-matter');
const globP = promisify(require('glob'));
const config = require('../site.config');

const ejsRenderFile = promisify(ejs.renderFile);
const srcPath = './src';
const distPath = config.build.outputPath;

// clear destination folder
fse.emptyDirSync(distPath)

// copy assets folder
// fse.copy(`${srcPath}/assets`, `${distPath}/assets`)

// read page templates
globP('**/*.ejs', { cwd: `${srcPath}/pages` })
  .then((files) => {
    files.forEach((file) => {
      const fileData = path.parse(file)
      const destPath = path.join(distPath, fileData.dir)

      // create destination directory
      fse
        .mkdirs(destPath)
        .then(() => {
          // render page
          return ejsRenderFile(`${srcPath}/pages/${file}`, Object.assign({}, config))
        })
        .then((pageContents) => {
          // render layout with page contents
          const layout = frontMatter(pageContents).attributes.layout || 'default';
          return ejsRenderFile(`${srcPath}/layouts/${layout}.ejs`, Object.assign({}, config, { body: pageContents }))
        })
        .then((layoutContent) => {
          // save the html file
          fse.writeFile(`${destPath}/${fileData.name}.html`, layoutContent)
        })
        .catch((err) => { console.error(err) })
    })
  })
  .catch((err) => { console.error(err) })