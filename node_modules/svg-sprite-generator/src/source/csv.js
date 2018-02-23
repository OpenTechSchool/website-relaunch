import {default as fs} from "fs";
import * as u from "../util";
import {default as parse} from "../parser";
import {Promise} from "es6-promise";

let csvStringToSvgContents = function (str) {
    return (function (fileList) {
        return new Promise(function (res, rej) { 
            let q = u.fileNameToObjectQueue(res);
            fileList.forEach(function (item) {
                q.push(item);
            });
        });
    })(str.split("\n").map(function (line) {
        let parts = line.split(',').map(function (item) {
            return item.trim();
        });

        return {
            id: parts[0],
            file: parts[1]
        };
    }).filter(function (item) {
        return !!item.file;
    }));
};

/*
 * Returns a function that
 * takes a CSV file and export as SVG content list
 * @param filePath - path to svg file
 * @return fn - the source function
 */
export default function (filePath) {
    return function () {
        return new Promise(function (res, rej) {
            fs.readFile(filePath, function (err, data) {
                if (err) {
                    return rej(err);
                }
                return csvStringToSvgContents(data.toString('utf8')).then(res);
            });
        }).then(parse);
    };
};

