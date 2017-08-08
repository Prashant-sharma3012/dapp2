const ipfsAPI = require('ipfs-api');
const {
    exec
} = require('child_process');

var streamToBuffer = require('stream-to-buffer')

const fs = require('fs');

ipfsConnectionObject = { host: 'localhost', port: '5001', protocol: 'http' };
var ipfs;

module.exports = {

    getFile: (hash, cb) => {
        let data;

        if (!hash) {
            console.log("pass hash");
        }

        ipfs.files.get(hash, function(err, stream) {

            stream.on('data', (file) => {
                // write the file's path and contents to standard out
                streamToBuffer(file.content, function(err, buffer) {
                    let obj = buffer.toString();
                    cb(null, obj);
                })
            });
        })
    },

    saveFile: (obj, cb) => {
        console.log(obj);
        if (typeof obj !== String) {
            IPFSdata = JSON.stringify(obj);
        }
        ipfs.add(Buffer.from(IPFSdata, 'utf8'), (e, out) => {
            console.log(out[0].hash);
            cb(e, out[0].hash);
        });
    },
    connect: () => {
        ipfs = ipfsAPI(ipfsConnectionObject);
    }
}