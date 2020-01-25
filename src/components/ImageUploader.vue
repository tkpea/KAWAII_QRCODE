<template>
  <div>
                  <!-- <b-form-group id="profile-image-group" label="プロフィール画像" label-for="profile-image">
                <div class="profile-image">
                  <figure v-if="profile.photoURL">
                    <b-img :src="profile.photoURL" width="40px" />
                  </figure>
                  <div class="file-input">
                    <b-form-file
                      id="profile-image"
                      v-model="profileImageFile"
                      placeholder="Choose a file or drop it here..."
                      drop-placeholder="Drop file here..."
                    ></b-form-file>
                  </div>
                </div>

                <!-- <div class="mt-3">Selected file: {{ profileImageFile ? profileImageFile.name : '' }}</div> -->
              </b-form-group> -->
  </div>
</template>

<script>
export default {
  /*
   
      file: null,
      imagesData: null,
      cropArea: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      profileCanvas: null
      

    onFileChange: function(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.createImages(files);
      this.$bvModal.show("bv-modal-example");
    },
    createImages: async function(files) {
      let reader = new FileReader();
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (!file.type.match("image")) continue;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function(event) {
            let imageFile = event.target;
            this.imagesData = imageFile.result;
          }.bind(this)
        );
        reader.readAsDataURL(file);
      }
    },
    cropAreaChange: function(e) {
      this.profileCanvas = e.canvas;
    },
    cropping: function() {
      const canvas = this.profileCanvas;

      var mime_type = "jpeg/image";
      var data_url = canvas.toDataURL(mime_type); // canvasからデータURLスキームを取得する。
      var base64 = "data:image/png;base64," + window.btoa(data_url); // データURLスキームからBASE64を作成する。

      this.imagesData = data_url;
      this.$bvModal.hide("bv-modal-example");
    }
  */
}
</script>
 