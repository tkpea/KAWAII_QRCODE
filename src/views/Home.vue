<template>
  <div class="home">
    <b-container class="bb-row">
      <h1>KAWAII QR CODE</h1>
      <p>画像付きのQRコードを生成するサービスです。</p>

      <b-row class="justify-content-center">
        <ImageUploader v-model="qr.imagePath" label="ここに画像をドロップ" />
      </b-row>
      <b-form-group label="QRコードの内容">
        <b-form-input v-model="qr.value" placeholder="https://***" type="url"></b-form-input>
      </b-form-group>
      <b-form-group label="フィルター">
        <b-form-radio-group
          id="btn-radios"
          v-model="qr.filter"
          :options="[{ text: '白黒', value: 'threshold' },{ text: 'カラー', value: 'color' }]"
          buttons
          name="radios-btn-default"
          button-variant="outline-info"
        ></b-form-radio-group>
      </b-form-group>
      <QrImage :option="qr" @imagePath="getImagePath($event)" />
      <b-form-group label="大きさ(px)" style="width:6em;margin-left:auto;margin-right:auto;">
        <b-form-input type="number" v-model="qr.size"></b-form-input>
      </b-form-group>
      <b-button @click="download()" pill variant="success" size="lg" v-if="qrImage">ダウンロード</b-button>
    </b-container>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
// @ts-ignore: Unreachable code error
import { QartOption } from './../types';
import ImageUploader from './../components/ImageUploader.vue';
import QrImage from './../components/QrImage.vue';

@Component({
  components: {
    ImageUploader,
    QrImage,
  },
})
export default class App extends Vue {
  private qr: QartOption = {
    value: '',
    filter: 'threshold',
    size: 300,
    imagePath: null,
    fillType: 'scale_to_fit',
  };
  private qrImage: string | null = null;

  private download() {
    const link: any = document.createElement('a');
    link.href = this.qrImage;
    link.download = 'kawaii-qr-code.png';
    link.click();
  }
  private getImagePath(event: any) {
    this.qrImage = event;
  }
}
</script>
<style lang="scss">
.home {
  padding-bottom: 60px;
}
</style>
