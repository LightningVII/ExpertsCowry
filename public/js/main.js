/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */


$(function() {
    console.log("main.js");
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        container: 'container',
        drop_element: 'container',
        max_file_size: '100mb',
        flash_swf_url: 'js/plupload/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        uptoken_url: "/uptoken",
        domain: "http://7xpwuf.com1.z0.glb.clouddn.com/",

        auto_start: true,
        init: {
            'FilesAdded': function(up, files) {
                console.log("mFilesAdded");
                $('table').show();
                $('#success').hide();
                plupload.each(files, function(file) {
                    var progress = new FileProgress(file, 'fsUploadProgress');
                    progress.setStatus("等待...");
                    progress.bindUploadCancel(up);
                });
            },
            'BeforeUpload': function(up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function(up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                progress.setProgress(file.percent + "%", file.speed, chunk_size);
            },
            'UploadComplete': function() {
                $('#success').show();
            },
            'FileUploaded': function(up, file, info) {
                var progress = new FileProgress(file, 'fsUploadProgress');

                $.ajax('./uptoken',{
                    async: false
                }).done(function(data){
                    $.extend(info, data);
                    progress.setComplete(up, info);
                }).error(function(){
                    console.log('获取下载token失败');
                });

            },
            'Error': function(up, err, errTip) {
                $('table').show();
                var progress = new FileProgress(err.file, 'fsUploadProgress');
                progress.setError();
                progress.setStatus(errTip);
            }
                // ,
                // 'Key': function(up, file) {
                //     var key = "";
                //     // do something with key
                //     return key
                // }
        }
    });
console.log("endmain.js");
    uploader.bind('FileUploaded', function() {
        console.log('hello man,a file is uploaded');
    });
    
console.log("endmain.js");
});
