<template>
  <div class="home">
    <b-container class="bv-row">
      <v-row>
        <h1>
          KAWAII QR CODE
        </h1>
        <p>
          画像付きのQRコードを生成するサービスです。
        </p>
      </v-row>
      <b-row class="justify-content-center">
        <ImageUploader v-model="qr.imagePath"/>
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
 
      <b-button  @click="makeQR()"  variant="success" large>
        QRコードを作る！!
      </b-button>
      <div id="qr-code" v-if="qrImage">
        <figure>
        <img :src="qrImage"/>
        </figure>

     
      </div> 

    </b-container>

  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
// @ts-ignore: Unreachable code error
const Qart = require('qartjs')
import ImageUploader from "./../components/ImageUploader.vue";

interface Qart {
  value: string,
  filter: string,
  size: number  ,
  imagePath: string |null,
  fillType: string
}

@Component({
  components: {
    ImageUploader,
  }
})
export default class App extends Vue {
 
  qr:Qart  = {
    value:"",
    filter:"threshold",
    size: 300,
    imagePath:null,
    fillType:'scale_to_fit'
  }  
  qrImage:string | null = null
  makeQR() {
       // @ts-ignore: Unreachable code error
      const qart = new QArt(this.qr);
      qart.make(document.getElementById('qr-code'));   
      qart.make((canvas:any) => {
 
        this.qrImage  = canvas.toDataURL("image/png")
      });       
  }


}
</script>
<style lang="scss">
  .home {
    padding-bottom: 60px;  
  }
</style>
