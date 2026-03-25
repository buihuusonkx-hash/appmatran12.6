export interface LevelData {
  tenMucDo: string;
  yeuCau: string;
  nlc: string; // Nhiều lựa chọn
  ds: string;  // Đúng - Sai
  tln: string; // Trả lời ngắn
}

export interface Topic {
  id: string;
  tenNoiDung: string;
  soTiet: number;
  mucDos: LevelData[];
}

export interface Chapter {
  id: string;
  tenChuong: string;
  noiDungs: Topic[];
}

export type TabType = 'nhap-lieu' | 'dac-ta' | 'ma-tran';
