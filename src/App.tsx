/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PenSquare, FileText, Download, Plus, Trash2, ChevronRight, Lock, User, LogIn, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- CƠ SỞ DỮ LIỆU CHUẨN CT 2018 (SÁCH CÁNHconst curriculumData: Record<string, Record<string, { nhanBiet: string; thongHieu: string; vanDung: string; vanDungCao: string; soTiet: number }>> = {
  "Chương 1. Ứng dụng đạo hàm để khảo sát hàm số": {
    "Tính đơn điệu và cực trị của hàm số": {
      nhanBiet: "- Nhận biết được tính đơn điệu của hàm số thông qua bảng biến thiên hoặc đồ thị.\n- Nhận biết được các điểm cực trị, giá trị cực trị của hàm số.",
      thongHieu: "- Xét được tính đơn điệu của hàm số bằng đạo hàm.\n- Tìm được cực trị của hàm số.",
      vanDung: "- Giải quyết được các bài toán thực tế liên quan đến tính đơn điệu và cực trị.",
      vanDungCao: "- Giải quyết các bài toán vận dụng cao về tham số m liên quan đến đơn điệu và cực trị.",
      soTiet: 6
    },
    "Giá trị lớn nhất và giá trị nhỏ nhất cực trị": {
      nhanBiet: "- Nhận biết được khái niệm GTLN, GTNN trên một tập hợp.",
      thongHieu: "- Tìm được GTLN, GTNN của hàm số trên một đoạn hoặc một khoảng.",
      vanDung: "- Ứng dụng GTLN, GTNN vào giải quyết các bài toán tối ưu thực tế (chi phí, diện tích...).",
      vanDungCao: "- Các bài toán chứa tham số, bài toán thực tế phức tạp.",
      soTiet: 3
    },
    "Đường tiệm cận của đồ thị hàm số": {
      nhanBiet: "- Nhận biết được tiệm cận đứng, tiệm cận ngang.",
      thongHieu: "- Tìm được các đường tiệm cận của đồ thị hàm số phân thức.",
      vanDung: "- Xác định các tiệm cận từ bảng biến thiên hoặc công thức hàm số.",
      vanDungCao: "- Bài toán tìm tham số m để đồ thị có số lượng tiệm cận cho trước.",
      soTiet: 3
    },
    "Khảo sát và vẽ đồ thị hàm số": {
      nhanBiet: "- Nhận biết được dạng đồ thị của các hàm số bậc ba, bậc bốn trùng phương, phân thức.",
      thongHieu: "- Giải thích được các đặc điểm của đồ thị hàm số dựa vào các thông số.",
      vanDung: "- Vẽ được đồ thị và nhận dạng đồ thị của một số hàm số cơ bản.",
      vanDungCao: "- Bài toán biện luận số nghiệm của phương trình bằng đồ thị.",
      soTiet: 6
    }
  },
  "Chương 2. Vecto và hệ tọa độ trong không gian": {
    "Vecto trong không gian": {
      nhanBiet: "- Nhận biết được các khái niệm vecto, độ dài vecto, vecto cùng phương, cùng hướng.",
      thongHieu: "- Thực hiện được các phép toán cộng, trừ vecto, nhân vecto với một số.",
      vanDung: "- Vận dụng vecto để chứng minh tính chất hình học không gian.",
      vanDungCao: "- Giải quyết các bài toán hình học không gian phức tạp bằng vecto.",
      soTiet: 4
    },
    "Hệ tọa độ trong không gian": {
      nhanBiet: "- Nhận biết được tọa độ của một điểm, của một vecto trong hệ tọa độ Oxyz.",
      thongHieu: "- Tính được độ dài vecto, khoảng cách giữa hai điểm.\n- Tính được tích vô hướng của hai vecto.",
      vanDung: "- Ứng dụng tọa độ vào các bài toán hình học thực tế.",
      vanDungCao: "- Tìm điểm thỏa mãn điều kiện tối ưu về khoảng cách.",
      soTiet: 6
    }
  },
  "Chương 3. Số đặc trưng đo mức độ phân tán cho mẫu số liệu ghép nhóm": {
    "Khoảng biến thiên và khoảng tứ phân vị": {
      nhanBiet: "- Nhận biết được công thức tính khoảng biến thiên, khoảng tứ phân vị.",
      thongHieu: "- Tính được khoảng biến thiên, khoảng tứ phân vị cho mẫu số liệu ghép nhóm.",
      vanDung: "- Ý nghĩa của các số đặc trưng trong các tình huống thực tiễn.",
      vanDungCao: "- So sánh mức độ phân tán của hai mẫu số liệu.",
      soTiet: 2
    },
    "Phương sai và độ lệch chuẩn": {
      nhanBiet: "- Nhận biết được công thức tính phương sai, độ lệch chuẩn.",
      thongHieu: "- Tính được phương sai, độ lệch chuẩn cho mẫu số liệu ghép nhóm.",
      vanDung: "- Sử dụng phương sai, độ lệch chuẩn để đánh giá độ ổn định của dữ liệu.",
      vanDungCao: "- Bài toán thực tế liên quan đến kiểm soát chất lượng.",
      soTiet: 2
    }
  },
  "Chương 4. Nguyên hàm và Tích phân": {
    "Nguyên hàm": {
      nhanBiet: "- Nhận biết được định nghĩa và bảng nguyên hàm cơ bản.",
      thongHieu: "- Tính được nguyên hàm của các hàm số sơ cấp cơ bản.",
      vanDung: "- Tìm nguyên hàm thỏa mãn điều kiện cho trước.",
      vanDungCao: "- Các bài toán nguyên hàm hàm ẩn, phương pháp đổi biến phức tạp.",
      soTiet: 8
    },
    "Tích phân": {
      nhanBiet: "- Nhận biết định nghĩa và tính chất của tích phân.",
      thongHieu: "- Tính tích phân bằng bảng nguyên hàm và các tính chất cơ bản.",
      vanDung: "- Tính tích phân bằng phương pháp đổi biến số và từng phần.",
      vanDungCao: "- Tích phân hàm ẩn, tích phân trong các bài toán thực tế nâng cao.",
      soTiet: 10
    },
    "Ứng dụng tích phân": {
      nhanBiet: "- Nhận biết công thức tính diện tích hình phẳng, thể tích vật thể tròn xoay.",
      thongHieu: "- Thiết lập được tích phân để tính diện tích, thể tích.",
      vanDung: "- Tính được diện tích, thể tích của các hình khối thực tế.",
      vanDungCao: "- Giải quyết các bài toán thực tế liên quan đến chuyển động, xây dựng.",
      soTiet: 4
    }
  },
  "Chương 5. Phương trình mặt phẳng, đường thẳng, mặt cầu": {
    "Phương trình mặt phẳng": {
      nhanBiet: "- Nhận biết vecto pháp tuyến của mặt phẳng.",
      thongHieu: "- Lập được phương trình mặt phẳng đi qua 1 điểm và có vecto pháp tuyến cho trước.",
      vanDung: "- Lập phương trình mặt phẳng đi qua 3 điểm, phương trình mặt phẳng theo đoạn chắn.",
      vanDungCao: "- Bài toán cực trị liên quan đến mặt phẳng.",
      soTiet: 6
    },
    "Phương trình đường thẳng": {
      nhanBiet: "- Nhận biết vecto chỉ phương của đường thẳng.",
      thongHieu: "- Lập phương trình tham số, chính tắc của đường thẳng.",
      vanDung: "- Vị trí tương đối giữa hai đường thẳng, giữa đường thẳng và mặt phẳng.",
      vanDungCao: "- Bài toán khoảng cách và góc nâng cao.",
      soTiet: 6
    },
    "Phương trình mặt cầu": {
      nhanBiet: "- Nhận tâm và bán kính từ phương trình mặt cầu.",
      thongHieu: "- Lập được phương trình mặt cầu khi biết tâm và bán kính.",
      vanDung: "- Phương trình mặt cầu đường kính AB, mặt cầu tiếp xúc mặt phẳng.",
      vanDungCao: "- Bài toán tương giao mặt cầu và mặt phẳng/đường thẳng phức tạp.",
      soTiet: 4
    }
  },
  "Chương 6. Một số yếu tố xác suất": {
    "Xác suất có điều kiện": {
      nhanBiet: "- Nhận biết khái niệm xác suất có điều kiện.",
      thongHieu: "- Tính xác suất có điều kiện dựa vào định nghĩa và bảng số liệu.",
      vanDung: "- Sử dụng quy tắc nhân xác suất cho các biến cố.",
      vanDungCao: "- Giải quyết bài toán thực tế phức tạp về xác suất.",
      soTiet: 4
    },
    "Xác suất toàn phần và công thức Bayes": {
      nhanBiet: "- Nhận biết công thức xác suất toàn phần và công thức Bayes.",
      thongHieu: "- Tính được xác suất bằng sơ đồ hình cây.",
      vanDung: "- Ứng dụng công thức Bayes vào các bài toán thực tế (y khoa, dự báo).",
      vanDungCao: "- Các bài toán xác suất đa tầng nâng cao.",
      soTiet: 4
    }
  }
};
�� phương của đường thẳng.",
      thongHieu: "- Lập phương trình tham số, chính tắc của đường thẳng.",
      vanDung: "- Vị trí tương đối giữa hai đường thẳng, giữa đường thẳng và mặt phẳng.",
      vanDungCao: "- Bài toán khoảng cách và góc nâng cao."
    },
    "Phương trình mặt cầu": {
      nhanBiet: "- Nhận tâm và bán kính từ phương trình mặt cầu.",
      thongHieu: "- Lập được phương trình mặt cầu khi biết tâm và bán kính.",
      vanDung: "- Phương trình mặt cầu đường kính AB, mặt cầu tiếp xúc mặt phẳng.",
      vanDungCao: "- Bài toán tương giao mặt cầu và mặt phẳng/đường thẳng phức tạp."
    }
  },
  "Chương 6. Một số yếu tố xác suất": {
    "Xác suất có điều kiện": {
      nhanBiet: "- Nhận biết khái niệm xác suất có điều kiện.",
      thongHieu: "- Tính xác suất có điều kiện dựa vào định nghĩa và bảng số liệu.",
      vanDung: "- Sử dụng quy tắc nhân xác suất cho các biến cố.",
      vanDungCao: "- Giải quyết bài toán thực tế phức tạp về xác suất."
    },
    "Xác suất toàn phần và công thức Bayes": {
      nhanBiet: "- Nhận biết công thức xác suất toàn phần và công thức Bayes.",
      thongHieu: "- Tính được xác suất bằng sơ đồ hình cây.",
      vanDung: "- Ứng dụng công thức Bayes vào các bài toán thực tế (y khoa, dự báo).",
      vanDungCao: "- Các bài toán xác suất đa tầng nâng cao."
    }
  }
};

const defaultLevels = () => [
  { tenMucDo: 'Nhận biết', yeuCau: '', color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100', qs: { nlc: '', ds: '', tln: '' } },
  { tenMucDo: 'Thông hiểu', yeuCau: '', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-100', qs: { nlc: '', ds: '', tln: '' } },
  { tenMucDo: 'Vận dụng', yeuCau: '', color: 'text-rose-600', bgColor: 'bg-rose-50', borderColor: 'border-rose-100', qs: { nlc: '', ds: '', tln: '' } },
  { tenMucDo: 'Vận dụng cao', yeuCau: '', color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-100', qs: { nlc: '', ds: '', tln: '' } }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userVal, setUserVal] = useState('');
  const [passVal, setPassVal] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('nhap-lieu');
  const [data, setData] = useState<any[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Chấp nhận cả "Bui Thi Kien" và "Bùi Thị Kiên" để thuận tiện cho người dùng
    if ((userVal === 'Bui Thi Kien' || userVal === 'Bùi Thị Kiên') && passVal === '12345') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  // Khởi tạo 1 chương trống khi load app
  useEffect(() => {
    setData([{ tenChuong: '', noiDungs: [{ tenNoiDung: '', mucDos: defaultLevels() }] }]);
  }, []);

  const themChuongMoi = () => {
    setData([...data, { tenChuong: '', noiDungs: [{ tenNoiDung: '', soTiet: 1, mucDos: defaultLevels() }] }]);
  };

  const xoaChuong = (cIdx: number) => {
    const newData = data.filter((_, index) => index !== cIdx);
    setData(newData.length ? newData : [{ tenChuong: '', noiDungs: [{ tenNoiDung: '', mucDos: defaultLevels() }] }]);
  };

  const themNoiDung = (chuongIndex: number) => {
    const newData = [...data];
    newData[chuongIndex].noiDungs.push({ tenNoiDung: '', soTiet: 1, mucDos: defaultLevels() });
    setData(newData);
  };

  const xoaNoiDung = (chuongIndex: number, ndIndex: number) => {
    const newData = [...data];
    newData[chuongIndex].noiDungs = newData[chuongIndex].noiDungs.filter((_: any, index: number) => index !== ndIndex);
    if (newData[chuongIndex].noiDungs.length === 0) {
      newData[chuongIndex].noiDungs = [{ tenNoiDung: '', mucDos: defaultLevels() }];
    }
    setData(newData);
  };

  // HÀM XỬ LÝ LÕI: Tự động map Yêu cầu cần đạt
  const handleChonNoiDung = (chuongIndex: number, ndIndex: number, tenNoiDungSelected: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    const chuong = newData[chuongIndex];
    const noiDung = chuong.noiDungs[ndIndex];
    
    noiDung.tenNoiDung = tenNoiDungSelected;

    const chuongData = curriculumData[chuong.tenChuong];
    if (chuongData && chuongData[tenNoiDungSelected]) {
      const yc = chuongData[tenNoiDungSelected];
      noiDung.soTiet = yc.soTiet;
      noiDung.mucDos[0].yeuCau = yc.nhanBiet;
      noiDung.mucDos[1].yeuCau = yc.thongHieu;
      noiDung.mucDos[2].yeuCau = yc.vanDung;
      noiDung.mucDos[3].yeuCau = yc.vanDungCao;
    } else {
      noiDung.mucDos.forEach((md: any) => md.yeuCau = '');
    }
    
    setData(newData);
  };

  const handleUpdateQS = (cIdx: number, nIdx: number, mIdx: number, field: string, value: string) => {
    const newData = [...data];
    newData[cIdx].noiDungs[nIdx].mucDos[mIdx].qs[field] = value;
    setData(newData);
  };

  const handleUpdateSoTiet = (cIdx: number, nIdx: number, value: number) => {
    const newData = [...data];
    newData[cIdx].noiDungs[nIdx].soTiet = value;
    setData(newData);
  };

  const handleUpdateYeuCau = (cIdx: number, nIdx: number, mIdx: number, value: string) => {
    const newData = [...data];
    newData[cIdx].noiDungs[nIdx].mucDos[mIdx].yeuCau = value;
    setData(newData);
  };

  const clearMucDo = (cIdx: number, nIdx: number, mIdx: number) => {
    const newData = [...data];
    newData[cIdx].noiDungs[nIdx].mucDos[mIdx].qs = { nlc: '', ds: '', tln: '' };
    setData(newData);
  };

  // HÀM TỰ ĐỘNG PHÂN BỔ THEO TIẾT
  const autoDistribute = (totalTarget: number, type: 'nlc' | 'ds' | 'tln') => {
    const totalPeriods = data.reduce((acc, c) => acc + c.noiDungs.reduce((a: number, n: any) => a + (n.soTiet || 0), 0), 0);
    if (totalPeriods === 0) return;

    const newData = JSON.parse(JSON.stringify(data));
    let distributedCount = 0;

    newData.forEach((chuong: any) => {
      chuong.noiDungs.forEach((nd: any) => {
        // Phân bổ tỉ lệ theo tiết: soTiet / totalPeriods
        const ndShare = Math.round((nd.soTiet / totalPeriods) * totalTarget);
        
        // Phân bổ vào các mức độ (Ví dụ: NB 40%, TH 30%, VD 20%, VDC 10%)
        const mdShares = [
          Math.round(ndShare * 0.4),
          Math.round(ndShare * 0.3),
          Math.round(ndShare * 0.2),
          Math.max(0, ndShare - Math.round(ndShare * 0.4) - Math.round(ndShare * 0.3) - Math.round(ndShare * 0.2))
        ];

        nd.mucDos.forEach((md: any, mIdx: number) => {
          md.qs[type] = mdShares[mIdx] > 0 ? mdShares[mIdx].toString() : '';
        });
      });
    });

    setData(newData);
  };

  const calculateRowSpan = (chuong: any) => {
    return chuong.noiDungs.reduce((total: number, nd: any) => total + nd.mucDos.length, 0);
  };

  const getQsCount = (val: string) => {
    if (!val || !val.trim()) return 0;
    if (!isNaN(Number(val))) return Number(val);
    return val.split(',').filter(s => s.trim()).length;
  };

  const calculateTotalQSAll = () => {
    return data.reduce<number>((acc, c) => {
      const chuongSum = (c.noiDungs as any[] || []).reduce<number>((a, n) => {
        const noiDungSum = (n.mucDos as any[] || []).reduce<number>((b, m) => {
          const qsValues = Object.values(m.qs || {}) as string[];
          const mucDoSum = qsValues.reduce<number>((sum, v) => sum + getQsCount(v), 0);
          return b + mucDoSum;
        }, 0);
        return a + noiDungSum;
      }, 0);
      return acc + chuongSum;
    }, 0);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden"
        >
          <div className="bg-indigo-600 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full"></div>
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black italic tracking-tight">Math Matrix <span className="text-indigo-200">Pro</span></h2>
              <p className="text-indigo-100/80 text-xs font-bold uppercase tracking-[0.2em] mt-1">Hệ thống bảo mật</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên đăng nhập</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="text"
                  placeholder="Nhập tên người dùng..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-semibold text-slate-700"
                  value={userVal}
                  onChange={(e) => setUserVal(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="password"
                  placeholder="Nhập mã bí mật..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-semibold text-slate-700"
                  value={passVal}
                  onChange={(e) => setPassVal(e.target.value)}
                />
              </div>
            </div>

            {loginError && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-rose-500 text-xs font-bold text-center bg-rose-50 py-3 rounded-xl border border-rose-100"
              >
                {loginError}
              </motion.p>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all flex items-center justify-center group"
            >
              <LogIn className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              ĐĂNG NHẬP NGAY
            </button>

            <div className="pt-4 text-center">
              <p className="text-[10px] text-slate-400 font-medium">
                Thiết lập bởi <span className="text-indigo-500 font-bold uppercase">Bùi Thị Kiên</span>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-indigo-600 font-bold tracking-[0.2em] text-[10px] uppercase mb-3">Smarter Education Tools</p>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight italic">Math Matrix <span className="text-indigo-600">Pro</span></h1>
          <div className="h-1 w-20 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Hệ thống chuyên dụng tối ưu hóa quy trình xây dựng ma trận và đặc tả đề thi theo chuẩn chương trình GDPT 2018.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-indigo-500 font-bold text-sm">
             <span className="h-px w-8 bg-indigo-100"></span>
             <span>Thiết lập bởi Bùi Thị Kiên</span>
             <span className="h-px w-8 bg-indigo-100"></span>
          </div>
        </motion.div>
      </header>

      {/* Tabs */}
      <div className="flex justify-center space-x-2 mb-10">
        <button 
          onClick={() => setActiveTab('nhap-lieu')} 
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 ${activeTab === 'nhap-lieu' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <PenSquare className="w-4 h-4 mr-2" /> Nhập liệu
        </button>
        <button 
          onClick={() => setActiveTab('ma-tran')} 
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 ${activeTab === 'ma-tran' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <LayoutGrid className="w-4 h-4 mr-2" /> Ma trận đề thi
        </button>
        <button 
          onClick={() => setActiveTab('dac-ta')} 
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 ${activeTab === 'dac-ta' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <FileText className="w-4 h-4 mr-2" /> Bảng Đặc tả
        </button>
      </div>

      <main className="max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {/* TAB 1: NHẬP LIỆU */}
          {activeTab === 'nhap-lieu' && (
            <motion.div 
              key="nhap-lieu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Cấu trúc Ma trận</h2>
                  <p className="text-slate-500 text-sm">Thiết lập các chương, nội dung và phân bổ câu hỏi.</p>
                </div>
                <button 
                  onClick={themChuongMoi} 
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" /> Thêm Chương Mới
                </button>
              </div>
              
              {data.map((chuong, cIdx) => (
                <motion.div 
                  layout
                  key={`c-${cIdx}`} 
                  className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex-1 w-full">
                      <label className="block text-[10px] font-black text-indigo-600 mb-2 uppercase tracking-widest">Chương / Chủ đề {cIdx + 1}</label>
                      <div className="flex gap-3">
                        <select 
                          className="flex-1 p-4 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none bg-slate-50 font-bold text-slate-800 transition-all"
                          value={chuong.tenChuong}
                          onChange={(e) => {
                            const newData = [...data];
                            newData[cIdx].tenChuong = e.target.value;
                            newData[cIdx].noiDungs = [{ tenNoiDung: '', mucDos: defaultLevels() }];
                            setData(newData);
                          }}
                        >
                          <option value="">-- Chọn Chương / Chủ đề --</option>
                          {Object.keys(curriculumData).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button 
                          onClick={() => xoaChuong(cIdx)}
                          className="p-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors border-2 border-transparent hover:border-rose-100"
                          title="Xóa chương"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {chuong.tenChuong && chuong.noiDungs.map((nd: any, nIdx: number) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`n-${nIdx}`} 
                        className="ml-0 md:ml-10 mt-6 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 relative"
                      >
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-1 w-full">
                            <div className="flex justify-between items-center mb-3">
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Nội dung kiến thức {nIdx + 1}</label>
                              <button 
                                onClick={() => xoaNoiDung(cIdx, nIdx)}
                                className="text-slate-400 hover:text-rose-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <select 
                              className="w-full p-3 border-2 border-white rounded-xl focus:border-indigo-500 outline-none bg-white shadow-sm font-semibold text-slate-700 transition-all"
                              value={nd.tenNoiDung}
                              onChange={(e) => handleChonNoiDung(cIdx, nIdx, e.target.value)}
                            >
                              <option value="">-- Chọn Nội dung cụ thể --</option>
                              {Object.keys(curriculumData[chuong.tenChuong] || {}).map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                          </div>
                        </div>

                        {nd.tenNoiDung && (
                          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {nd.mucDos.map((md: any, mIdx: number) => (
                              <div key={`m-${mIdx}`} className={`p-5 rounded-2xl border-2 ${md.borderColor} ${md.bgColor} transition-all hover:shadow-md`}>
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center">
                                    <div className={`w-2 h-2 rounded-full mr-2 ${md.color.replace('text', 'bg')}`}></div>
                                    <p className={`font-black text-xs uppercase tracking-wider ${md.color}`}>{md.tenMucDo}</p>
                                  </div>
                                  <button 
                                    onClick={() => clearMucDo(cIdx, nIdx, mIdx)}
                                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                    title="Xóa dữ liệu câu hỏi"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="space-y-4">
                                  <div className="group">
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1 flex justify-between">
                                      <span>Yêu cầu cần đạt</span>
                                      <span className="text-indigo-400 italic normal-case font-medium">Sửa trực tiếp</span>
                                    </label>
                                    <textarea 
                                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-[11px] focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[80px] leading-relaxed resize-none font-medium text-slate-600"
                                      value={md.yeuCau}
                                      onChange={e => handleUpdateYeuCau(cIdx, nIdx, mIdx, e.target.value)}
                                      placeholder="Mô tả mức độ yêu cầu..."
                                    />
                                  </div>
                                  <div className="group">
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Nhiều lựa chọn</label>
                                    <input 
                                      placeholder="VD: Câu 1, 2..." 
                                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                      value={md.qs.nlc} 
                                      onChange={e => handleUpdateQS(cIdx, nIdx, mIdx, 'nlc', e.target.value)}
                                    />
                                  </div>
                                  <div className="group">
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Đúng - Sai (ý)</label>
                                    <input 
                                      placeholder="VD: Câu 1a, 1b..." 
                                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                      value={md.qs.ds} 
                                      onChange={e => handleUpdateQS(cIdx, nIdx, mIdx, 'ds', e.target.value)}
                                    />
                                  </div>
                                  <div className="group">
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Trả lời ngắn</label>
                                    <input 
                                      placeholder="VD: Câu 1..." 
                                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                      value={md.qs.tln} 
                                      onChange={e => handleUpdateQS(cIdx, nIdx, mIdx, 'tln', e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {chuong.tenChuong && (
                    <button 
                      onClick={() => themNoiDung(cIdx)} 
                      className="mt-8 ml-0 md:ml-10 px-6 py-3 border-2 border-dashed border-slate-200 text-slate-500 font-bold text-xs rounded-2xl hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center group"
                    >
                      <Plus className="w-3 h-3 mr-2 group-hover:rotate-90 transition-transform" /> Thêm nội dung kiến thức khác
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TAB 3: MA TRẬN TỔNG HỢP */}
          {activeTab === 'ma-tran' && (
            <motion.div 
              key="ma-tran"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                      <LayoutGrid className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ma trận Đề thi Tổng hợp</h2>
                  </div>
                  <p className="text-slate-500 text-sm ml-13">Thống kê định lượng và phân bổ câu hỏi theo chuẩn GDPT 2018.</p>
                </div>
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all flex items-center shadow-xl shadow-indigo-100 group">
                  <Download className="w-5 h-5 mr-3 group-hover:translate-y-0.5 transition-transform" /> Tải về Bản PDF
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm min-w-[1100px] border-hidden rounded-3xl">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="border border-slate-800 p-5 w-14 text-[10px] uppercase font-black" rowSpan={3}>TT</th>
                      <th className="border border-slate-800 p-5 w-64 text-[10px] uppercase font-black text-left" rowSpan={3}>Chủ đề / Chương</th>
                      <th className="border border-slate-800 p-2 text-[10px] uppercase font-black" colSpan={12}>Số câu hỏi theo cấp độ tư duy</th>
                      <th className="border border-slate-800 p-5 w-24 text-[10px] uppercase font-black" rowSpan={3}>Tổng số câu</th>
                      <th className="border border-slate-800 p-5 w-24 text-[10px] uppercase font-black" rowSpan={3}>Tỉ lệ (%)</th>
                    </tr>
                    <tr className="bg-slate-800 text-indigo-200">
                      <th className="border border-slate-700 p-3 text-[9px] uppercase font-black" colSpan={4}>Nhiều lựa chọn</th>
                      <th className="border border-slate-700 p-3 text-[9px] uppercase font-black" colSpan={4}>Đúng - Sai (ý)</th>
                      <th className="border border-slate-700 p-3 text-[9px] uppercase font-black" colSpan={4}>Trả lời ngắn</th>
                    </tr>
                    <tr className="bg-indigo-50 text-indigo-700">
                      {[1, 2, 3].map(i => (
                        <React.Fragment key={i}>
                          <th className="border border-indigo-100 p-2 text-[8px] font-black w-14">NB</th>
                          <th className="border border-indigo-100 p-2 text-[8px] font-black w-14">TH</th>
                          <th className="border border-indigo-100 p-2 text-[8px] font-black w-14">VD</th>
                          <th className="border border-indigo-100 p-2 text-[8px] font-black w-14">VDC</th>
                        </React.Fragment>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((chuong, cIdx) => {
                      if (!chuong.tenChuong) return null;
                      
                      const getCount = (type: string, mIdx: number) => {
                        return chuong.noiDungs.reduce((acc: number, nd: any) => {
                          const val = nd.mucDos[mIdx].qs[type];
                          if (!val) return acc;
                          if (!isNaN(Number(val))) return acc + Number(val);
                          return acc + val.split(',').filter((s: string) => s.trim() !== '').length;
                        }, 0);
                      };

                      const c_nlc = [getCount('nlc', 0), getCount('nlc', 1), getCount('nlc', 2), getCount('nlc', 3)];
                      const c_ds = [getCount('ds', 0), getCount('ds', 1), getCount('ds', 2), getCount('ds', 3)];
                      const c_tln = [getCount('tln', 0), getCount('tln', 1), getCount('tln', 2), getCount('tln', 3)];
                      const totalC = [...c_nlc, ...c_ds, ...c_tln].reduce((a, b) => a + b, 0);

                      return (
                        <tr key={cIdx} className="hover:bg-slate-50 transition-colors">
                          <td className="border border-slate-100 p-5 text-center font-black text-slate-400">{cIdx + 1}</td>
                          <td className="border border-slate-100 p-5 font-black text-slate-800">{chuong.tenChuong}</td>
                          {/* NLC */}
                          <td className="border border-slate-100 p-2 text-center font-bold text-emerald-600 bg-emerald-50/20">{c_nlc[0] || '-'}</td>
                          <td className="border border-slate-100 p-2 text-center font-bold text-amber-600 bg-amber-50/20">{c_nlc[1] || '-'}</td>
                          <td className="border border-slate-100 p-2 text-center font-bold text-rose-600 bg-rose-50/20">{c_nlc[2] || '-'}</td>
                          <td className="border border-slate-100 p-2 text-center font-bold text-purple-600 bg-purple-50/20">{c_nlc[3] || '-'}</td>
                          {/* DS */}
                          <td className="border border-slate-100 p-2 text-center font-bold text-emerald-600 bg-emerald-50/20">{c_ds[0] || '-'}</td>
                          <td className="border border-slate-100 p-2 text-center font-bold text-amber-600 bg-amber-50/20">{c_ds[1] || '-'}</td>
                          <td className="border border-slate-100 p-2 text-center font-bold text-rose-600 bg-rose-50/20">{c_ds[2] || '-'}</td>
                          <td className="border border-slate-100 p-2 text-center font-bold text-purple-600 bg-purple-50/20">{c_ds[3] || '-'}</td>
                          {/* TLN */}
                          <td className="border border-slate-100 p-2 text-center font-bold text-emerald-600 bg-emerald-50/20">{c_tln[0] || '-'}</td>
                          <td className="border border-slate-100 p-2 text-center font-bold text-amber-600 bg-amber-50/20">{c_tln[1] || '-'}</td>
                          <td className="border border-slate-100 p-2 text-center font-bold text-rose-600 bg-rose-50/20">{c_tln[2] || '-'}</td>
                          <td className="border border-slate-100 p-2 text-center font-bold text-purple-600 bg-purple-50/20">{c_tln[3] || '-'}</td>
                          
                          <td className="border border-slate-100 p-5 text-center font-black text-slate-900 bg-slate-50">{totalC}</td>
                          <td className="border border-slate-100 p-5 text-center font-black text-indigo-600">
                            {/* Điểm số tạm tính: NLC 0.25, DS 1.0 (nhóm 1 ý), TLN 0.5? Giả định tỉ lệ câu hỏi */}
                            {((totalC / Math.max(1, data.reduce((acc, c) => acc + c.noiDungs.reduce((a: number, n: any) => a + n.mucDos.reduce((b: number, m: any) => b + Object.values(m.qs).filter(v => v).length, 0), 0), 0))) * 100).toFixed(0)}%
                          </td>
                        </tr>
                      );
                    })}
                    
                    {/* Hàng tổng cộng */}
                    <tr className="bg-slate-900 text-white font-black uppercase text-[10px]">
                      <td className="border border-slate-800 p-5" colSpan={2}>Tổng cộng</td>
                      {[0, 1, 2, 3].map(mIdx => (
                        <td key={`nlc-${mIdx}`} className="border border-slate-800 p-3 text-center">
                          {data.reduce<number>((acc, c) => acc + (c.noiDungs as any[] || []).reduce<number>((a, n) => a + getQsCount(n.mucDos[mIdx].qs.nlc), 0), 0)}
                        </td>
                      ))}
                      {[0, 1, 2, 3].map(mIdx => (
                        <td key={`ds-${mIdx}`} className="border border-slate-800 p-3 text-center">
                          {data.reduce<number>((acc, c) => acc + (c.noiDungs as any[] || []).reduce<number>((a, n) => a + getQsCount(n.mucDos[mIdx].qs.ds), 0), 0)}
                        </td>
                      ))}
                      {[0, 1, 2, 3].map(mIdx => (
                        <td key={`tln-${mIdx}`} className="border border-slate-800 p-3 text-center">
                          {data.reduce<number>((acc, c) => acc + (c.noiDungs as any[] || []).reduce<number>((a, n) => a + getQsCount(n.mucDos[mIdx].qs.tln), 0), 0)}
                        </td>
                      ))}
                      <td className="border border-slate-800 p-5 text-center" colSpan={2}>
                        {calculateTotalQSAll()} CÂU
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                   <p className="text-[10px] uppercase font-black text-emerald-600 mb-1">Mức độ Nhận biết</p>
                   <p className="text-3xl font-black text-emerald-900">40% <span className="text-sm font-medium opacity-50">điểm</span></p>
                </div>
                <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                   <p className="text-[10px] uppercase font-black text-amber-600 mb-1">Mức độ Thông hiểu</p>
                   <p className="text-3xl font-black text-amber-900">30% <span className="text-sm font-medium opacity-50">điểm</span></p>
                </div>
                <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
                   <p className="text-[10px] uppercase font-black text-rose-600 mb-1">Mức độ Vận dụng</p>
                   <p className="text-3xl font-black text-rose-900">30% <span className="text-sm font-medium opacity-50">điểm</span></p>
                </div>
                <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-100">
                   <p className="text-[10px] uppercase font-black text-indigo-100 mb-1">Tổng cộng toàn đề</p>
                   <p className="text-3xl font-black text-white">10.0 <span className="text-sm font-medium opacity-50">điểm</span></p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: BẢNG ĐẶC TẢ */}
          {activeTab === 'dac-ta' && (
            <motion.div 
              key="dac-ta"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bảng Đặc tả Đề thi</h2>
                  <p className="text-slate-500 text-sm mt-1">Chi tiết yêu cầu cần đạt và cấu trúc phân bổ câu hỏi.</p>
                </div>
                <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center shadow-lg shadow-slate-200">
                  <Download className="w-4 h-4 mr-2" /> Xuất bản (PDF/Excel)
                </button>
              </div>

              <div className="overflow-x-auto -mx-8 px-8">
                <table className="w-full border-collapse text-sm min-w-[1000px]">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="border border-slate-800 p-4 w-12 text-[10px] uppercase font-black" rowSpan={3}>TT</th>
                      <th className="border border-slate-800 p-4 w-56 text-[10px] uppercase font-black" rowSpan={3}>Chương / Chủ đề</th>
                      <th className="border border-slate-800 p-4 w-48 text-[10px] uppercase font-black" rowSpan={3}>Nội dung</th>
                      <th className="border border-slate-800 p-4 w-32 text-[10px] uppercase font-black" rowSpan={3}>Mức độ</th>
                      <th className="border border-slate-800 p-4 text-[10px] uppercase font-black" rowSpan={3}>Yêu cầu cần đạt</th>
                      <th className="border border-slate-800 p-2 text-[10px] uppercase font-black" colSpan={12}>Số câu hỏi theo định dạng</th>
                    </tr>
                    <tr className="bg-slate-800 text-slate-300">
                      <th className="border border-slate-700 p-2 text-[9px] uppercase font-bold" colSpan={4}>Nhiều lựa chọn</th>
                      <th className="border border-slate-700 p-2 text-[9px] uppercase font-bold" colSpan={4}>Đúng - Sai (ý)</th>
                      <th className="border border-slate-700 p-2 text-[9px] uppercase font-bold" colSpan={4}>Trả lời ngắn</th>
                    </tr>
                    <tr className="bg-slate-100 text-slate-500">
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">Biết</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">Hiểu</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">VD</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">VDC</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">Biết</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">Hiểu</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">VD</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">VDC</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">Biết</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">Hiểu</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">VD</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black">VDC</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {data.map((chuong, cIdx) => (
                      chuong.tenChuong && chuong.noiDungs.map((nd: any, nIdx: number) => (
                        nd.tenNoiDung && nd.mucDos.map((md: any, mIdx: number) => (
                          <tr key={`row-${cIdx}-${nIdx}-${mIdx}`} className="hover:bg-indigo-50/30 transition-colors group">
                            {nIdx === 0 && mIdx === 0 && (
                              <td className="border border-slate-200 p-4 font-black text-center bg-slate-50" rowSpan={calculateRowSpan(chuong)}>{cIdx + 1}</td>
                            )}
                            {nIdx === 0 && mIdx === 0 && (
                              <td className="border border-slate-200 p-4 font-black text-slate-900 bg-slate-50" rowSpan={calculateRowSpan(chuong)}>{chuong.tenChuong}</td>
                            )}
                            {mIdx === 0 && (
                              <td className="border border-slate-200 p-4 font-bold text-indigo-600" rowSpan={nd.mucDos.length}>{nd.tenNoiDung}</td>
                            )}
                            <td className={`border border-slate-200 p-4 text-[11px] font-black text-center uppercase tracking-tighter ${md.color}`}>
                              {md.tenMucDo}
                            </td>
                            <td className="border border-slate-200 p-4 whitespace-pre-line text-[11px] leading-relaxed text-justify text-slate-600">
                              {md.yeuCau || '---'}
                            </td>
                            {/* Multiple Choice */}
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 0 ? md.qs.nlc : ''}</td>
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 1 ? md.qs.nlc : ''}</td>
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 2 ? md.qs.nlc : ''}</td>
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 3 ? md.qs.nlc : ''}</td>
                            {/* Đúng Sai */}
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 0 ? md.qs.ds : ''}</td>
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 1 ? md.qs.ds : ''}</td>
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 2 ? md.qs.ds : ''}</td>
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 3 ? md.qs.ds : ''}</td>
                            {/* Trả lời ngắn */}
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 0 ? md.qs.tln : ''}</td>
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 1 ? md.qs.tln : ''}</td>
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 2 ? md.qs.tln : ''}</td>
                            <td className="border border-slate-200 p-2 text-center font-bold text-slate-900">{mIdx === 3 ? md.qs.tln : ''}</td>
                          </tr>
                        ))
                      ))
                    ))}
                    {data.every(c => !c.tenChuong) && (
                      <tr>
                        <td colSpan={17} className="text-center p-20">
                          <div className="flex flex-col items-center justify-center text-slate-300">
                            <FileText className="w-16 h-16 mb-4 opacity-20" />
                            <p className="italic font-medium">Chưa có dữ liệu. Vui lòng thiết lập cấu trúc tại tab Nhập liệu.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-4xl mx-auto mt-20 text-center pb-12 border-t border-slate-200 pt-8">
        <p className="text-slate-400 text-[10px] uppercase font-black tracking-[0.3em]">Math Matrix Pro &copy; 2026</p>
        <p className="text-slate-500 text-[11px] font-bold mt-2">Thiết lập bởi Bùi Thị Kiên</p>
        <p className="text-slate-400 text-[10px] mt-1 italic leading-relaxed">Dành cho giáo viên tối ưu hóa quy trình kiểm tra đánh giá theo Chương trình GDPT 2018</p>
      </footer>
    </div>
  );
}
