var fs = require('fs'),stat = fs.stat;;


module.exports = {
	each:file_each,
	getFiles:function(path,filter){
		var files=[];
		getFile(path,files,filter);
		return files;
	},
	copy:copy,
};

function copy( src, dst){
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;       
            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }
                if( st.isFile() ){
                    readable = fs.createReadStream( _src );
                    writable = fs.createWriteStream( _dst );   
                    readable.pipe( writable );
                }
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
function exists( src, dst, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};


function getFile(path,files_,filter) {
	var files=fs.readdirSync(path)
	files.forEach(function(item) {
		var tmpPath = path + '\/' + item;
		var stats= fs.statSync(tmpPath);
		if (stats.isDirectory()) {
			getFile(tmpPath,files_,filter);
		} else {
			if(filter&&filter.constructor==RegExp){
				if(filter.test(tmpPath))
					files_.push(tmpPath);
			}else files_.push(tmpPath);
		}
	});
}



function file_each(path, handleFile) {
	handleFile(path);
	fs.readdir(path, function(err, files) {
		if (err) {
			console.log('read dir error');
		} else {
			files.forEach(function(item) {
				var tmpPath = path + '/' + item;
				fs.stat(tmpPath, function(err1, stats) {
					if (err1) {
						console.log('stat error');
					} else {
						if (stats.isDirectory()) {
							file_each(tmpPath, handleFile);
						} else {
							handleFile(tmpPath);
						}
					}
				})
			});

		}
	});
}

