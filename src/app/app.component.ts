import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

//import COCO-SSD model as cocoSSD
import * as cocoSSD from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit 
{
  title = 'TF-ObjectDetection';
  private video: HTMLVideoElement;
  @ViewChild('img') imageEl: ElementRef;
  image: any;
  loading = true;
  model: any;
  imageSrc: any;
  predictions: any;
  imgEl: any;
  
  

  async ngOnInit()
  { 
    // const saveREsult = await this.model.save('./assets/model.json')
    this.model = await cocoSSD.load();
    this.loading = false;
  }
  async fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = async (res: any) => {
        this.imageSrc = res.target.result;
        setTimeout(async () => {
          this.imgEl = this.imageEl.nativeElement;
          this.predictions = await this.model.detect(this.imgEl) as any;
          console.log(this.predictions)
        await this.renderPredictions(this.predictions);

        }, 0);
      };
    }
  }

  renderPredictions = predictions => {
    const canvas = <HTMLCanvasElement> document.getElementById("canvas");
    
    const ctx = canvas.getContext("2d");
    
    canvas.width  = 300;
    canvas.height = 300;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.drawImage(this.imgEl,0, 0,300,300);

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
    
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
    });
  };


}
