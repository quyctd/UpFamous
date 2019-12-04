import { HelpersService } from './../../services/helpers.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders, FileLikeObject } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { PhotoUpload } from '../../models/photoUpload.model';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  responses: Array<any>;
  files = [];
  limit = 10;
  hasBaseDropZoneOver = false;
  uploader: FileUploader;
  title: string;

  message = '';
  imgURL: any;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient,
    private helper: HelpersService,
    private sanitizer: DomSanitizer
  ) {
    this.responses = [];
   }

  ngOnInit() {
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      let tags = 'upfamous';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `upfamous,${this.title}`;
      }
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', 'Upfamous');
      // Add custom tags
      form.append('tags', tags);
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {

      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet

        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });
    };

    this.uploader.onAfterAddingFile = (item: any) => {
      console.log('ITEM: ', item.file);

      // Build new Upload Photo
      const uploadPhoto = new PhotoUpload();
      uploadPhoto.file = item.file.rawFile;
      uploadPhoto.type = item.file.type;
      uploadPhoto.originalFilename = item.file.name;

      this.readImageInfo(uploadPhoto);
    };

    this.uploader.onBeforeUploadItem = (item: any) => {
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      console.log('RESPONSE: ', response);
      console.log(this.responses);
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response)
        }
      );
    };

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      const uploadEle = this.getUploadEleByFile(fileItem.file.rawFile);
      uploadEle.progress = progress;
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
    };
  }

  // Delete an uploaded image
  // Requires setting "Return delete token" to "Yes" in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage = function(data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers };
    const body = {
      token: data.delete_token
    };
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
      // Remove deleted item for responses
      this.responses.splice(index, 1);
    });
  };

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ key, value: fileProperties[key] }));
  }

  get filesLength() {
    return this.files === undefined ? 0 : this.files.length;
  }

  get remain() {
    return this.limit - this.filesLength;
  }

  getUploadEleByFile(upFile) {
    for (const upPhoto of this.files) {
      if (upPhoto.file == upFile) { return upPhoto; }
    }
  }

  readImageInfo(uploadPhoto) {

    // Read image info
    const url = URL.createObjectURL(uploadPhoto.file);
    const img = new Image();
    img.onload = () => {
      uploadPhoto.naturalWidth = img.width;
      uploadPhoto.naturalHeight = img.height;
    };

    img.src = url;

    // Get image blob
    const reader = new FileReader();
    const blob = new Blob([uploadPhoto.file], {type: uploadPhoto.type});

    reader.readAsDataURL(blob);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      uploadPhoto.imgBlob = (reader.result as string).replace('octet-stream', uploadPhoto.type);
      // Show image to view
      this.files.push(uploadPhoto);
    };
  }

  hexToBase64(str) {
    // tslint:disable-next-line: max-line-length
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, '').replace(/([\da-fA-F]{2}) ?/g, '0x$1 ').replace(/ +$/, '').split(' ')));
  }

  doRemove(i) {
    this.files.splice(i, 1);
    this.responses.splice(i, 1);
  }
}
