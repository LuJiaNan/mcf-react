'use strict';
const pkg = require('../package.json');
const fs = require('fs')
const cb = (fun) => {
  if (fun === null) {
    console.log('link success')
  } else if (fun.code === 'EEXIST') {
    fs.unlink(fun.dest, () => {
      console.log('unlink: ', fun)
      fs.symlink(fun.path, fun.dest, 'dir', () => console.log('re-link success'))
    })
  } else {
    console.log('log: Exception ', fun)
  }
}
pkg.links.forEach((item) => {
  fs.symlink(item.target, item.path, 'dir', cb)
})