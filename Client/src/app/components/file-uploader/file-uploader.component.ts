import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var upload_form = <HTMLFormElement> document.getElementById("file-upload-form");
    // File Upload
    function ekUpload(){
      function Init() {

        console.log("Upload Initialised");

        var fileSelect    = document.getElementById('file-upload'),
            fileDrag      = document.getElementById('file-drag'),
            submitButton  = document.getElementById('submit-button');

        fileSelect.addEventListener('change', fileSelectHandler, false);

        // Is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
          // File Drop
          fileDrag.addEventListener('dragover', fileDragHover, false);
          fileDrag.addEventListener('dragleave', fileDragHover, false);
          fileDrag.addEventListener('drop', fileSelectHandler, false);
        }
      }

      function fileDragHover(e) {
        var fileDrag = document.getElementById('file-drag');

        e.stopPropagation();
        e.preventDefault();

        fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
      }


      function setProgressMaxValue(e) {
        var pBar = document.getElementById('file-progress');

        if (e.lengthComputable) {
          pBar.setAttribute('max', e.total);
        }
      }

      function updateFileProgress(e) {
        var pBar = document.getElementById('file-progress');

        if (e.lengthComputable) {
          pBar.setAttribute('value', e.loaded);
        }
      }

      function uploadFile(file) {

        var xhr = new XMLHttpRequest(),
          fileInput = document.getElementById('class-roster-file'),
          pBar = document.getElementById('file-progress'),
          fileSizeLimit = 1024; // In MB
        if (xhr.upload) {
          // Check if file is less than x MB
          if (file.size <= fileSizeLimit * 1024 * 1024) {
            // Progress bar
            pBar.style.display = 'inline';
            xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
            xhr.upload.addEventListener('progress', updateFileProgress, false);

            // File received / failed
            xhr.onreadystatechange = function(e) {
              if (xhr.readyState == 4) {
                // Everything is good!

                // progress.className = (xhr.status == 200 ? "success" : "failure");
                // document.location.reload(true);
              }
            };

            // Start upload
            xhr.open('POST', upload_form.action, true);
            xhr.setRequestHeader('X-File-Name', file.name);
            xhr.setRequestHeader('X-File-Size', file.size);
            xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.send(file);
          } else {
            output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
          }
        }
      }

      function fileSelectHandler(e) {
        // Fetch FileList object
        var files = e.target.files || e.dataTransfer.files;

        // Cancel event and hover styling
        fileDragHover(e);

        // Process all File objects
        for (var i = 0, f; f = files[i]; i++) {
          parseFile(f);
          uploadFile(f);
        }
      }

      // Output
      function output(msg) {
        // Response
        var m = document.getElementById('messages');
        m.innerHTML = msg;
      }

      function parseFile(file) {

        console.log(file.name);
        output(
          '<strong>' + encodeURI(file.name) + '</strong>'
        );
        
        // var fileType = file.type;
        // console.log(fileType);
        var imageName = file.name;

        var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
        if (isGood) {
          document.getElementById('start').classList.add("hidden");
          document.getElementById('response').classList.remove("hidden");
          document.getElementById('notimage').classList.add("hidden");
          // Thumbnail Preview
          var file_image = document.getElementById('file-image');
          file_image.classList.remove("hidden");
          file_image.setAttribute('src', URL.createObjectURL(file));
        }
        else {
          document.getElementById('file-image').classList.add("hidden");
          document.getElementById('notimage').classList.remove("hidden");
          document.getElementById('start').classList.remove("hidden");
          document.getElementById('response').classList.add("hidden");
          
          upload_form.reset();
      }


      interface Window { 
        File: any | undefined,
        FileList: any | undefined,
        FileReader: any | undefined
      };

      // Check for the various File API support.
      if (document.getElementById('file-drag').style.display != 'none') {
        Init();
      } else {
        document.getElementById('file-drag').style.display = 'none';
      }
    }
      ekUpload();
  }

  }
}