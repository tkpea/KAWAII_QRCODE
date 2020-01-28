export interface Test {
  test: string;
}

export interface QartOption {
  value: string;
  filter: string;
  size: number  ;
  imagePath: string | null;
  fillType: string;
}

export interface CropArea {
  left: number;
  top: number;
  width: number;
  height: number;
}