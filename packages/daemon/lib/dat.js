const datResolve = require('dat-link-resolve')
const Dat = require('dat-node')

module.exports.resolve = function (link) {
  return new Promise(function (resolve, reject) {
    datResolve(link, function (err, key) {
      if (err) {
        reject(err)
        return
      }

      resolve(key)
    })
  })
}

module.exports.create = function (key, directory, opts) {
  console.log('create',{key,directory,opts});
  return new Promise(function (resolve, reject) {
    let options = {};
    if (opts) options = opts;
    let fname = undefined;
    if (key) {
      if (key.includes('/')) {
        options.sparse = true;
        let tokens = key.split('/');
        fname = tokens[1];
        options.key = tokens[0];
      } else {
        options.key = key;
      }
    }
    console.log({options,fname});
    Dat(directory, Object.assign(options), function (err, dat) {
      if (err) {
        reject(err)
        return
      }
      if (fname) {
        dat.joinNetwork();
        //dat.archive.update( () => console.log('metadata recvd') );
        console.log('calling readfile');
        dat.archive.readFile('/'+fname, function (err, content) {
          console.log('returned',{err,content});
          resolve(dat);
        });
      } else {
        resolve(dat)
      }
    })
  })
}

module.exports.readdir = function (dat, path) {
  return new Promise(function (resolve, reject) {
    dat.archive.readdir(path, function (err, list) {
      if (err) return reject(err)
      resolve(list)
    })
  })
}

module.exports.rmdir = function (dat, path) {
  return new Promise(function (resolve, reject) {
    dat.archive.rmdir(path, function (err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

module.exports.mkdir = function (dat, path) {
  return new Promise(function (resolve, reject) {
    dat.archive.mkdir(path, function (err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

module.exports.unlink = function (dat, path) {
  return new Promise(function (resolve, reject) {
    dat.archive.unlink(path, function (err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

module.exports.stat = function (dat, path) {
  return new Promise(function (resolve, reject) {
    dat.archive.stat(path, function (err, stat) {
      if (err) return reject(err)
      resolve(stat)
    })
  })
}

