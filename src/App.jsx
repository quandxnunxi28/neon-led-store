import React, { useState } from 'react';
import { 
  Sparkles, Lightbulb, Box, Camera, Phone, MessageCircle, 
  CheckCircle2, ChevronRight, Flame, ShieldCheck, Truck,
  Heart, Star, Feather, Zap, Upload 
} from 'lucide-react';
import './App.css';

export default function App() {
  // State cho tính năng Thiết kế Neon
  const [customText, setCustomText] = useState('Chill');
  const [customColor, setCustomColor] = useState('cyan');
  const [customFont, setCustomFont] = useState('Dancing Script');
  const [customIcon, setCustomIcon] = useState('Feather'); // Chọn hình mặc định là Cánh
  const [customNote, setCustomNote] = useState(''); // Ghi chú thêm
  const [customerPhone, setCustomerPhone] = useState(''); // SĐT của khách
  const [customImage, setCustomImage] = useState(null); // State cho việc upload ảnh

  // State cho Form liên hệ chung
  const [formData, setFormData] = useState({ name: '', phone: '', request: '' });
  const [submitted, setSubmitted] = useState(false);

  // Số điện thoại / Zalo (đã thay số thật)
  const HOTLINE = "0984115697";
  const ZALO_URL = `https://zalo.me/${HOTLINE}`;

  // Công thức tính giá: Giả sử 120.000đ / 1 ký tự
  const pricePerChar = 120000;
  const estimatedPrice = customText.replace(/\s/g, '').length * pricePerChar;

  // Hàm xử lý tải ảnh lên
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImage(imageUrl);
      setCustomIcon('None'); // Tắt icon mặc định nếu khách dùng ảnh của họ
    }
  };

  // Hàm gửi thiết kế Neon qua Zalo
  const handleSendToZalo = () => {
    if (!customerPhone) {
      alert("Vui lòng nhập số điện thoại để xưởng tiện liên hệ lại nhé!");
      return;
    }

    const imageNote = customImage 
      ? "\n- [LƯU Ý]: Tôi có tải lên 1 ảnh mẫu trên web. Tôi sẽ gửi ảnh đó ngay dưới tin nhắn này!" 
      : "";

    const message = `Chào xưởng, tôi muốn đặt làm đèn Neon:
- Nội dung chữ: "${customText}"
- Hình/Icon: ${customIcon !== 'None' ? customIcon : 'Dùng ảnh tự tải lên'}
- Font chữ: ${customFont}
- Màu sắc: ${customColor}
- SĐT của tôi: ${customerPhone}
- Ghi chú: ${customNote ? customNote : 'Không có'}${imageNote}`;

    const encodedMessage = encodeURIComponent(message);
    const zaloLink = `https://zalo.me/${HOTLINE}?text=${encodedMessage}`;
    window.open(zaloLink, '_blank');
  };

  // Hàm xử lý Form liên hệ dưới cùng
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Vui lòng nhập họ tên và số điện thoại!");
      return;
    }
    setSubmitted(true);
  };

  const services = [
    {
      id: 1,
      title: "Đèn LED Neon Sign Uốn Mica",
      icon: <Sparkles className="service-icon pink" />,
      desc: "Chất liệu mica dẫn sáng cao cấp, LED silicon dẻo siêu bền, chống vỡ, tiết kiệm điện 80%. Tùy biến chữ nghệ thuật, logo quán cafe, trà chanh, phòng ngủ.",
      highlight: "Tạo hình mọi kích thước & font chữ"
    },
    {
      id: 2,
      title: "Hộp Đèn Quảng Cáo & Music Box",
      icon: <Box className="service-icon cyan" />,
      desc: "Hộp đèn mica hút nổi, hộp đèn siêu mỏng mặt mica hắt sáng viền. Đặc biệt nhận làm Music Box phát sáng theo nhạc và đèn để bàn làm việc.",
      highlight: "Ánh sáng đồng đều, góc cạnh sắc sảo"
    },
    {
      id: 3,
      title: "Photobooth & Góc Check-in Sự Kiện",
      icon: <Camera className="service-icon yellow" />,
      desc: "Setup trọn gói background, hộp đèn neon chụp hình photobooth cho tiệc cưới, sinh nhật, khai trương, studio và hội nghị thương hiệu.",
      highlight: "Nổi bật trên từng khung hình"
    }
  ];

  const showcaseItems = [
    { title: "Bảng hiệu Bar & Coffee", tag: "Mica uốn LED", color: "pink", size: "Chữ nghệ thuật phối màu Neon" },
    { title: "Hộp đèn Music Box để bàn", tag: "Hot trend", color: "cyan", size: "Đèn LED cảm biến đổi màu" },
    { title: "Photobooth Khai Trương Showroom", tag: "Sự kiện", color: "purple", size: "Kích thước 2m x 2.4m nổi bật" },
    { title: "Logo Doanh Nghiệp Mica Hắt Sáng", tag: "Bảng hiệu", color: "yellow", size: "Độ bền ngoài trời trên 3 năm" },
  ];

  return (
    <div className="app-container">
      {/* Thanh điều hướng Header */}
      <header className="navbar">
        <div className="logo">
          <Flame className="logo-icon" />
          <span>NEON<strong>STUDIO</strong></span>
        </div>
        <nav className="nav-links">
          <a href="#services">Dịch vụ</a>
          <a href="#showcase">Dự án</a>
          <a href="#process">Quy trình</a>
          <a href="#contact" className="contact-btn">Báo giá ngay</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge">
            <Sparkles size={16} /> Gia công xưởng trực tiếp - Giá tận gốc
          </div>
          <h1 className="hero-title">
            BIẾN Ý TƯỞNG THÀNH <br />
            <span className="neon-text-pink">ĐÈN NEON NGHỆ THUẬT</span> & <br />
            <span className="neon-text-cyan">HỘP ĐÈN QUẢNG CÁO</span>
          </h1>
          <p className="hero-sub">
            Chuyên thiết kế, uốn đèn LED Neon dẻo trên nền Mica trong suốt dày dặn. 
            Nhận làm hộp đèn quảng cáo, Music Box decor, Photobooth sự kiện với độ sắc nét tuyệt đối.
          </p>
          <div className="hero-actions">
            <a href={ZALO_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
              <MessageCircle size={20} /> Nhắn Zalo Thiết Kế Miễn Phí
            </a>
            <a href={`tel:${HOTLINE}`} className="btn btn-secondary">
              <Phone size={20} /> Hotline: {HOTLINE}
            </a>
          </div>
        </div>
      </section>

      {/* Phòng thử Neon - Tính năng đinh của web */}
      <section id="custom-neon" className="section dark-bg">
        <div className="section-header">
          <h2 className="section-title">TỰ THIẾT KẾ NEON THEO Ý BẠN</h2>
          <p className="section-desc">Kết hợp chữ và biểu tượng để tạo ra thiết kế độc nhất!</p>
        </div>

        <div className="customizer-container">
          {/* Màn hình hiển thị chữ & Hình */}
          <div className="preview-board">
            <div className={`neon-preview-wrapper text-${customColor}`}>
              
              {/* Hiển thị ảnh Upload nếu có */}
              {customImage ? (
                <img 
                  src={customImage} 
                  alt="Mẫu upload" 
                  className="uploaded-neon-img" 
                />
              ) : (
                /* Nếu không có ảnh upload thì hiển thị Icon mặc định */
                <>
                  {customIcon === 'Heart' && <Heart size={64} className="neon-icon" />}
                  {customIcon === 'Star' && <Star size={64} className="neon-icon" />}
                  {customIcon === 'Feather' && <Feather size={64} className="neon-icon" />}
                  {customIcon === 'Zap' && <Zap size={64} className="neon-icon" />}
                </>
              )}
              
              <div 
                className="neon-preview-text"
                style={{ fontFamily: `"${customFont}", cursive` }}
              >
                {customText || 'Nhập chữ...'}
              </div>
            </div>
          </div>

          {/* Bảng điều khiển */}
          <div className="controls-board">
            <div className="control-group">
              <label>1. Dòng chữ của bạn:</label>
              <input 
                type="text" 
                maxLength="20"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="VD: Quán Của Tuấn"
              />
            </div>

            <div className="control-group">
              <label>2. Hình biểu tượng hoặc Ảnh của bạn:</label>
              <div className="icon-picker">
                <button className={`icon-btn ${customIcon === 'None' && !customImage ? 'active' : ''}`} onClick={() => {setCustomIcon('None'); setCustomImage(null);}}>Không có</button>
                <button className={`icon-btn ${customIcon === 'Heart' ? 'active' : ''}`} onClick={() => {setCustomIcon('Heart'); setCustomImage(null);}}><Heart size={20}/></button>
                <button className={`icon-btn ${customIcon === 'Star' ? 'active' : ''}`} onClick={() => {setCustomIcon('Star'); setCustomImage(null);}}><Star size={20}/></button>
                
                {/* Nút Upload File ẩn, dùng nhãn label để kích hoạt */}
                <label className="icon-btn upload-btn">
                  <Upload size={20} /> Tải ảnh lên
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    style={{ display: 'none' }} 
                  />
                </label>
              </div>
            </div>

            <div className="control-group">
              <label>3. Chọn màu sắc:</label>
              <div className="color-picker">
                {['pink', 'cyan', 'yellow', 'purple', 'white', 'red', 'green'].map(color => (
                  <button 
                    key={color}
                    className={`color-btn bg-${color} ${customColor === color ? 'active' : ''}`}
                    onClick={() => setCustomColor(color)}
                    title={`Màu ${color}`}
                  ></button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label>4. Chọn phông chữ:</label>
              <select value={customFont} onChange={(e) => setCustomFont(e.target.value)}>
                <option value="Dancing Script">Dancing Script (Mềm mại)</option>
                <option value="Pacifico">Pacifico (Đậm đà)</option>
                <option value="Vibur">Vibur (Cổ điển)</option>
              </select>
            </div>

            <div className="control-group">
              <label>5. Ghi chú thêm (Kích thước, yêu cầu khác):</label>
              <textarea 
                rows="2"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="VD: Mình muốn làm ngang 1 mét, lấy gấp trong ngày..."
                style={{ marginBottom: '10px' }}
              ></textarea>
            </div>

            <div className="control-group">
              <label>6. Số điện thoại / Zalo của bạn (*):</label>
              <input 
                type="tel" 
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Nhập SĐT để xưởng liên hệ chốt mẫu..."
                style={{ borderColor: !customerPhone ? 'var(--neon-pink)' : 'var(--border-color)' }}
              />
            </div>

            <button className="btn btn-submit" onClick={handleSendToZalo}>
              Gửi Mẫu Này Nhận Báo Giá (Qua Zalo)
            </button>
          </div>
        </div>
      </section>

      {/* Cam kết / Ưu điểm */}
      <section className="features">
        <div className="feature-item">
          <ShieldCheck size={28} className="feat-icon" />
          <div>
            <h4>Bảo hành nguồn & LED</h4>
            <p>Bảo hành 12 tháng lỗi 1 đổi 1</p>
          </div>
        </div>
        <div className="feature-item">
          <Lightbulb size={28} className="feat-icon" />
          <div>
            <h4>Lên demo 3D trước</h4>
            <p>Khách duyệt mẫu vẽ mới tiến hành cắt mica</p>
          </div>
        </div>
        <div className="feature-item">
          <Truck size={28} className="feat-icon" />
          <div>
            <h4>Giao hàng toàn quốc</h4>
            <p>Đóng thùng xốp chống sốc an toàn 100%</p>
          </div>
        </div>
      </section>

      {/* Danh mục dịch vụ */}
      <section id="services" className="section">
        <div className="section-header">
          <h2 className="section-title">DỊCH VỤ CỦA CHÚNG TÔI</h2>
          <p className="section-desc">Đáp ứng mọi nhu cầu từ biển hiệu cửa hàng đến trang trí góc làm việc cá nhân</p>
        </div>

        <div className="services-grid">
          {services.map((item) => (
            <div key={item.id} className="service-card">
              <div className="card-top">
                {item.icon}
                <span className="highlight-tag">{item.highlight}</span>
              </div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bộ sưu tập mẫu / Dự án tiêu biểu */}
      <section id="showcase" className="section dark-bg">
        <div className="section-header">
          <h2 className="section-title">MẪU DỰ ÁN ĐÃ THI CÔNG</h2>
          <p className="section-desc">Chất lượng ánh sáng rực rỡ, không gây chói mắt và siêu bền</p>
        </div>

        <div className="showcase-grid">
          {showcaseItems.map((item, idx) => (
            <div key={idx} className={`showcase-card border-${item.color}`}>
              <div className="card-mockup">
                <div className={`glow-circle ${item.color}`}></div>
                <Sparkles size={40} className={`mockup-icon ${item.color}`} />
              </div>
              <div className="showcase-info">
                <span className="showcase-tag">{item.tag}</span>
                <h4>{item.title}</h4>
                <p>{item.size}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quy trình làm việc */}
      <section id="process" className="section">
        <div className="section-header">
          <h2 className="section-title">QUY TRÌNH ĐẶT HÀNG NHANH GỌN</h2>
        </div>
        <div className="process-steps">
          <div className="step-card">
            <span className="step-num">01</span>
            <h4>Gửi Ý Tưởng</h4>
            <p>Gửi ảnh mẫu, câu chữ, logo hoặc kích thước dự kiến qua Zalo.</p>
          </div>
          <ChevronRight className="step-arrow" />
          <div className="step-card">
            <span className="step-num">02</span>
            <h4>Lên Demo & Báo Giá</h4>
            <p>Thiết kế phác thảo kích thước tấm mica và bố cục đường LED kèm báo giá chi tiết.</p>
          </div>
          <ChevronRight className="step-arrow" />
          <div className="step-card">
            <span className="step-num">03</span>
            <h4>Gia Công Tỉ Mỉ</h4>
            <p>Cắt laser mica theo hình, đi dây LED silicon dẻo, hàn chì và test sáng 24h.</p>
          </div>
          <ChevronRight className="step-arrow" />
          <div className="step-card">
            <span className="step-num">04</span>
            <h4>Giao Hàng / Lắp Đặt</h4>
            <p>Kèm đầy đủ nguồn 12V, ốc chân kính bắt tường hoặc dây xích treo tiện lợi.</p>
          </div>
        </div>
      </section>

      {/* Form liên hệ & Đặt hàng */}
      <section id="contact" className="section form-section">
        <div className="form-container">
          <div className="form-left">
            <h2>BẠN CẦN LÀM BIỂN ĐÈN CHO MỤC ĐÍCH GÌ?</h2>
            <p>Hãy để lại thông tin, xưởng sẽ liên hệ gửi catalog mẫu và tư vấn kích thước chuẩn xác nhất.</p>
            <div className="contact-direct">
              <div className="direct-item">
                <Phone className="direct-icon" />
                <div>
                  <span>Gọi trực tiếp hotline:</span>
                  <strong>{HOTLINE}</strong>
                </div>
              </div>
              <div className="direct-item">
                <MessageCircle className="direct-icon" />
                <div>
                  <span>Hỗ trợ thiết kế Zalo:</span>
                  <a href={ZALO_URL} target="_blank" rel="noreferrer">Chat ngay tại {ZALO_URL}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="form-right">
            {submitted ? (
              <div className="success-box">
                <CheckCircle2 size={56} className="success-icon" />
                <h3>Đã nhận thông tin thành công!</h3>
                <p>Xưởng sẽ liên hệ lại với bạn qua số điện thoại <strong>{formData.phone}</strong> trong ít phút.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <label>Họ và tên của bạn</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />

                <label>Số điện thoại / Zalo</label>
                <input 
                  type="tel" 
                  placeholder="Ví dụ: 0988xxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                />

                <label>Nội dung muốn làm (kích thước, chữ gì, hộp quảng cáo...)</label>
                <textarea 
                  rows="3" 
                  placeholder="Ví dụ: Cần làm biển chữ Led 'Coffee Chill' ngang 80cm nền mica trong..."
                  value={formData.request}
                  onChange={(e) => setFormData({...formData, request: e.target.value})}
                ></textarea>

                <button type="submit" className="btn btn-submit">
                  Gửi Yêu Cầu Tư Vấn Ngay
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} NEON STUDIO - Chuyên Đèn Neon Sign Mica, Hộp Đèn Quảng Cáo & Photobooth.</p>
        <p className="footer-sub">Thiết kế sáng tạo - Ánh sáng tinh tế - Gia công chuẩn xác</p>
      </footer>
    </div>
  );
}