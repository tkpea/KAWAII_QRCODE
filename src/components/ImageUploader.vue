<template>
  <div>
    <div
      class="droparea"
      :class="[{'on-drag': isDrag == 'new'}]"
      @dragover.prevent="checkDrag($event, 'new', true)"
      　　　　　@dragleave.prevent="checkDrag($event, 'new', false)"
      @drop.prevent="onFileChange"
    >
      <i aria-hidden="true" class="fa fa-plus"></i>
      <div class="drop">
        <p class="drag-drop-info">ここに画像をドロップ</p>
        <p>または</p>
        <label for="corporation_file" class="btn btn-success label-button">
          <b-spinner small type="grow" label="Spinning" class="spinner" v-if="isUploading"></b-spinner>ファイルを選択
          <input
            type="file"
            class="drop__input"
            style="display:none;"
            id="corporation_file"
            accept="image/*"
            @change="onFileChange"
            :src="imageData"
            ref="file"
          />
        </label>
        <!-- {{ fileForm.fileName }} -->
      </div>
      <figure class="preview" @click="$refs.file.click()">
        <img v-if="imageData" :src="imageData" class="preview-image" />
      </figure>
    </div>
    <b-modal id="bv-modal" hide-footer no-close-on-backdrop no-close-on-esc hide-header-close>
      <template v-slot:modal-title>画像を選択してください</template>
      <div class="d-block text-center">
        <Cropper
          class="cropper"
          :src="imageData"
          :stencilProps="{
                aspectRatio: 1/1
              }"
          @change="cropAreaChange"
        ></Cropper>
      </div>
      <b-button class="mt-3" block @click="cropping">選択</b-button>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
// @ts-ignore: Unreachable code error
import { Cropper } from 'vue-advanced-cropper';
import { CropArea } from './../types';
@Component({
  components: {
    Cropper,
  },
})
export default class ImageUploader extends Vue {
  @Prop({ default: null })
  private value: string | null = null;

  private file: any = null;
  private imageData: any = null;
  private cropArea: CropArea = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  };
  private profileCanvas: any = null;
  private isDrag: boolean = false;
  private isUploading: boolean = false;

  private onFileChange(e: any) {
    const files = e.target.files || e.dataTransfer.files;
    this.createImages(files);
    this.isUploading = true;
  }
  private createImages(files: FileList): any {
    const reader = new FileReader();
    const file: File = files[0];
    if (!file.type.match('image')) {
      throw new Error('画像データではありません');
    }
    reader.addEventListener('load', (event) => {
      const imageFile: EventTarget | null = event.target;
      // @ts-ignore: Unreachable code error
      this.imageData = imageFile.result as any;
      // @ts-ignore: Unreachable code error
      this.$bvModal.show('bv-modal');
      this.isUploading = false;
    });
    reader.readAsDataURL(file);
  }

  private checkDrag(event: any, key: any, status: any) {
    if (status && event.dataTransfer.types === 'text/plain') {
      return false;
    }
    this.isDrag = status ? key : null;
  }

  private cropAreaChange(e: any) {
    this.profileCanvas = e.canvas;
  }
  private cropping() {
    const canvas = this.profileCanvas;

    const mimeType = 'jpeg/image';
    const dataUrl = canvas.toDataURL(mimeType); // canvasからデータURLスキームを取得する。
    const base64 = 'data:image/png;base64,' + window.btoa(dataUrl); // データURLスキームからBASE64を作成する。

    this.imageData = dataUrl;
    // @ts-ignore: Unreachable code error
    this.$bvModal.hide('bv-modal');
    this.$emit('input', this.imageData);
  }

}
</script>
 <style  lang="scss">
.droparea {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
  width: 240px;
  background: #f1f1f1;
  transition: 0.2s;
  border: dashed 4px #ccc;
  margin-bottom: 40px;

  &.on-drag {
    border: dashed 4px #999;
  }
  .preview {
    position: absolute;

    .preview-image {
      border: dashed 4px #ccc;
      height: 240px;
      width: 240px;
      object-fit: cover;
    }
  }
  .label-button {
    display: flex;
    align-items: center;
    justify-content: center;

    .spinner {
      margin-right: 0.5em;
    }
  }
}
</style>