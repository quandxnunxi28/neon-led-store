import React, { useState } from 'react';
import { 
  Sparkles, Lightbulb, Box, Camera, Phone, MessageCircle, 
  CheckCircle2, ChevronRight, Flame, ShieldCheck, Truck,
  Heart, Star, Feather, Zap, Upload, Power, Newspaper, ArrowLeft
} from 'lucide-react';
import './App.css';

// --- KHO DỮ LIỆU BLOG TĨNH ---
const blogPosts = [
  {
    id: 1,
    title: "5 Ý Tưởng Trang Trí Phòng Ngủ Bằng Đèn Neon Cực Chill",
    date: "05/09/2026",
    image: "/blog/anh1.jpg", 
    excerpt: "Khám phá cách biến không gian phòng ngủ của bạn thành một góc nghệ thuật rực rỡ với đèn Neon uốn dẻo...",
    content: "Đèn neon không chỉ dùng cho quán cafe. Ngày nay, việc đặt một câu quote ý nghĩa hoặc hình ảnh ngộ nghĩnh trên đầu giường đang là xu hướng..."
  },
  {
    id: 2,
    title: "Tại Sao Nên Chọn Hộp Đèn Mica Thay Vì Biển Bạt Truyền Thống?",
    date: "02/09/2026",
    image: "/blog/anh2.jpg",
    excerpt: "Phân tích ưu nhược điểm của hộp đèn Mica hút nổi và độ bền vượt trội khi sử dụng ngoài trời so với biển bạt Hiflex.",
    content: "Biển bạt sau 1 năm thường bị phai màu và rách do gió bão. Hộp đèn mica kết hợp LED hắt sáng bên trong giúp thương hiệu của bạn nổi bật 24/7..."
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // State cho tính năng Thiết kế Neon
  const [customText, setCustomText] = useState('Chill');
  const [customColor, setCustomColor] = useState('cyan');
  const [customFont, setCustomFont] = useState('Dancing Script');
  const [customIcon, setCustomIcon] = useState('Feather');
  const [customImage, setCustomImage] = useState(null);
  
  const [isLightOn, setIsLightOn] = useState(true); 
  const [bgType, setBgType] = useState('brick'); 
  const [backing, setBacking] = useState('none'); 
  const [layout, setLayout] = useState('top'); 

  const [customNote, setCustomNote] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // CẬP NHẬT: Thêm trường 'type' vào Form liên hệ
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    type: 'Làm theo yêu cầu tự điền', // Mặc định
    request: '' 
  });

  const HOTLINE = "0984115697";
  const ZALO_URL = `https://zalo.me/${HOTLINE}`;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImage(imageUrl);
      setCustomIcon('None'); 
    }
  };

  // Hàm gửi Zalo cho khu vực "Phòng Thử Neon"
  const handleSendToZalo = async () => {
    if (!customerPhone) {
      alert("Vui lòng nhập số điện thoại để xưởng tiện liên hệ lại nhé!");
      return;
    }

    const imageNote = customImage ? "\n- [LƯU Ý]: Có tải ảnh mẫu trên web, sẽ gửi ngay bên dưới!" : "";

    const message = `Chào xưởng, tôi đặt đèn Neon (Tự thiết kế web):
- Chữ: "${customText}" (Font: ${customFont}, Màu: ${customColor})
- Hình: ${customIcon !== 'None' ? customIcon : 'Dùng ảnh tải lên'}
- Vị trí hình: ${layout}
- Khung Mica: ${backing === 'none' ? 'Không viền' : backing === 'cut' ? 'Cắt theo viền' : 'Nguyên tấm vuông'}
- SĐT: ${customerPhone}
- Ghi chú: ${customNote ? customNote : 'Không có'}${imageNote}`;

    try {
      await navigator.clipboard.writeText(message);
      alert("✅ Đã copy thông tin đơn hàng!\n\nKhi Zalo mở lên, bạn chỉ cần nhấn giữ ô chat và chọn 'Dán' (Paste) để gửi cho xưởng nhé.");
    } catch (err) {}

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://zalo.me/${HOTLINE}?text=${encodedMessage}`;
  };

  // CẬP NHẬT: Hàm xử lý Form liên hệ (Áp dụng copy & Zalo tương tự)
  const handleSubmitContactForm = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Vui lòng nhập họ tên và số điện thoại!");
      return;
    }

    // Soạn tin nhắn chuẩn bị gửi Zalo
    const message = `Chào xưởng, tôi cần tư vấn làm biển đèn:
- Họ và tên: ${formData.name}
- SĐT liên hệ: ${formData.phone}
- Phân loại: ${formData.type}
- Nội dung yêu cầu: ${formData.request ? formData.request : 'Nhờ xưởng tư vấn thêm cho tôi.'}`;

    try {
      await navigator.clipboard.writeText(message);
      alert("✅ Đã copy thông tin liên hệ!\n\nKhi Zalo mở lên, bạn chỉ cần nhấn giữ ô chat và chọn 'Dán' (Paste) để gửi cho xưởng nhé.");
    } catch (err) {}

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://zalo.me/${HOTLINE}?text=${encodedMessage}`;
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
        <div className="logo" onClick={() => setCurrentPage('home')} style={{cursor: 'pointer'}}>
          <Flame className="logo-icon" />
          <span>NEON<strong>STUDIO</strong></span>
        </div>
        <nav className="nav-links">
          <button className="nav-btn" onClick={() => setCurrentPage('home')}>Trang Chủ</button>
          {currentPage === 'home' && (
            <>
              <a href="#services">Dịch vụ</a>
              <a href="#showcase">Dự án</a>
              <a href="#process">Quy trình</a>
            </>
          )}
          
          <button className="nav-btn" onClick={() => setCurrentPage('blog')}>
            <Newspaper size={18} style={{marginRight: '5px'}}/> Blog & Dự Án
          </button>
          <a href="#contact" className="contact-btn" onClick={() => setCurrentPage('home')}>Báo giá ngay</a>
        </nav>
      </header>

      {/* --- PHÂN NHÁNH TRANG CHỦ HOẶC TRANG BLOG --- */}
      {currentPage === 'home' ? (
        <>
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

          {/* Phòng thử Neon */}
          <section id="custom-neon" className="section dark-bg">
            <div className="section-header">
              <h2 className="section-title">TỰ THIẾT KẾ NEON THEO Ý BẠN</h2>
              <p className="section-desc">Trải nghiệm bật/tắt đèn và ướm thử lên các phông nền thực tế!</p>
            </div>

            <div className="customizer-container">
              <div className="preview-section">
                <div className={`preview-board bg-${bgType}`}>
                  <button className={`power-btn ${isLightOn ? 'on' : 'off'}`} onClick={() => setIsLightOn(!isLightOn)} title="Bật/Tắt điện">
                    <Power size={24} />
                  </button>

                  <div className={`neon-preview-wrapper layout-${layout} backing-${backing} ${!isLightOn ? 'is-off' : ''} text-${customColor}`}>
                    <div className="preview-image-part">
                      {customImage ? (
                        <img src={customImage} alt="Mẫu upload" className="uploaded-neon-img" />
                      ) : (
                        <>
                          {customIcon === 'Heart' && <Heart size={64} className="neon-icon" />}
                          {customIcon === 'Star' && <Star size={64} className="neon-icon" />}
                          {customIcon === 'Feather' && <Feather size={64} className="neon-icon" />}
                          {customIcon === 'Zap' && <Zap size={64} className="neon-icon" />}
                        </>
                      )}
                    </div>
                    
                    <div className="neon-preview-text" style={{ fontFamily: `"${customFont}", cursive` }}>
                      {customText || 'Nhập chữ...'}
                    </div>
                  </div>
                </div>

                <div className="quick-tools">
                  <div className="tool-group">
                    <span className="tool-label">Phông nền:</span>
                    <button className={bgType === 'brick' ? 'active' : ''} onClick={() => setBgType('brick')}>Tường gạch</button>
                    <button className={bgType === 'greenery' ? 'active' : ''} onClick={() => setBgType('greenery')}>Tường cỏ</button>
                    <button className={bgType === 'concrete' ? 'active' : ''} onClick={() => setBgType('concrete')}>Bê tông</button>
                    <button className={bgType === 'dark' ? 'active' : ''} onClick={() => setBgType('dark')}>Tối giản</button>
                  </div>
                  <div className="tool-group">
                    <span className="tool-label">Khung Mica:</span>
                    <button className={backing === 'none' ? 'active' : ''} onClick={() => setBacking('none')}>Trong suốt</button>
                    <button className={backing === 'cut' ? 'active' : ''} onClick={() => setBacking('cut')}>Cắt viền chữ</button>
                    <button className={backing === 'square' ? 'active' : ''} onClick={() => setBacking('square')}>Nguyên tấm</button>
                  </div>
                  <div className="tool-group">
                    <span className="tool-label">Vị trí Hình:</span>
                    <button className={layout === 'top' ? 'active' : ''} onClick={() => setLayout('top')}>Ở trên</button>
                    <button className={layout === 'bottom' ? 'active' : ''} onClick={() => setLayout('bottom')}>Ở dưới</button>
                    <button className={layout === 'left' ? 'active' : ''} onClick={() => setLayout('left')}>Trái</button>
                    <button className={layout === 'right' ? 'active' : ''} onClick={() => setLayout('right')}>Phải</button>
                  </div>
                </div>
              </div>

              <div className="controls-board">
                <div className="control-group">
                  <label>1. Dòng chữ của bạn:</label>
                  <input type="text" maxLength="25" value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="VD: Quán Của Tuấn"/>
                </div>
                <div className="control-group">
                  <label>2. Hình biểu tượng / Ảnh tải lên:</label>
                  <div className="icon-picker">
                    <button className={`icon-btn ${customIcon === 'None' && !customImage ? 'active' : ''}`} onClick={() => {setCustomIcon('None'); setCustomImage(null);}}>Không có</button>
                    <button className={`icon-btn ${customIcon === 'Heart' ? 'active' : ''}`} onClick={() => {setCustomIcon('Heart'); setCustomImage(null);}}><Heart size={20}/></button>
                    <button className={`icon-btn ${customIcon === 'Star' ? 'active' : ''}`} onClick={() => {setCustomIcon('Star'); setCustomImage(null);}}><Star size={20}/></button>
                    <label className="icon-btn upload-btn">
                      <Upload size={20} /> Tải ảnh lên
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>
                <div className="control-group">
                  <label>3. Chọn màu sắc:</label>
                  <div className="color-picker">
                    {['pink', 'cyan', 'yellow', 'purple', 'white', 'red', 'green'].map(color => (
                      <button key={color} className={`color-btn bg-${color} ${customColor === color ? 'active' : ''}`} onClick={() => setCustomColor(color)}></button>
                    ))}
                  </div>
                </div>
                <div className="control-group">
                  <label>4. Chọn phông chữ nghệ thuật:</label>
                  <select value={customFont} onChange={(e) => setCustomFont(e.target.value)}>
                    <option value="Dancing Script">Dancing Script (Mềm mại)</option>
                    <option value="Pacifico">Pacifico (Đậm đà)</option>
                    <option value="Vibur">Vibur (Cổ điển)</option>
                    <option value="Caveat">Caveat (Phá cách)</option>
                    <option value="Cookie">Cookie (Dễ thương)</option>
                    <option value="Great Vibes">Great Vibes (Sang trọng)</option>
                    <option value="Kaushan Script">Kaushan Script (Cứng cáp)</option>
                    <option value="Sacramento">Sacramento (Thanh mảnh)</option>
                    <option value="Satisfy">Satisfy (Bay bổng)</option>
                    <option value="Yellowtail">Yellowtail (Độc đáo)</option>
                  </select>
                </div>
                <div className="control-group">
                  <label>5. Ghi chú & Zalo liên hệ (*):</label>
                  <textarea rows="2" value={customNote} onChange={(e) => setCustomNote(e.target.value)} placeholder="VD: Mình muốn làm ngang 1 mét..." style={{ marginBottom: '10px' }}></textarea>
                  <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Nhập SĐT / Zalo của bạn..." style={{ borderColor: !customerPhone ? 'var(--neon-pink)' : 'var(--border-color)' }} />
                </div>
                <button className="btn btn-submit" onClick={handleSendToZalo}>
                  Lưu Thiết Kế & Chốt Qua Zalo
                </button>
              </div>
            </div>
          </section>

          {/* Cam kết / Ưu điểm */}
          <section className="features">
            <div className="feature-item"><ShieldCheck size={28} className="feat-icon" /><div><h4>Bảo hành nguồn & LED</h4><p>Bảo hành 12 tháng lỗi 1 đổi 1</p></div></div>
            <div className="feature-item"><Lightbulb size={28} className="feat-icon" /><div><h4>Lên demo 3D trước</h4><p>Khách duyệt mẫu vẽ mới tiến hành cắt mica</p></div></div>
            <div className="feature-item"><Truck size={28} className="feat-icon" /><div><h4>Giao hàng toàn quốc</h4><p>Đóng thùng xốp chống sốc an toàn 100%</p></div></div>
          </section>

          <section id="services" className="section">
            <div className="section-header"><h2 className="section-title">DỊCH VỤ CỦA CHÚNG TÔI</h2><p className="section-desc">Đáp ứng mọi nhu cầu từ biển hiệu cửa hàng đến trang trí góc làm việc cá nhân</p></div>
            <div className="services-grid">
              {services.map((item) => (
                <div key={item.id} className="service-card">
                  <div className="card-top">{item.icon}<span className="highlight-tag">{item.highlight}</span></div>
                  <h3 className="card-title">{item.title}</h3><p className="card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="showcase" className="section dark-bg">
            <div className="section-header"><h2 className="section-title">MẪU DỰ ÁN ĐÃ THI CÔNG</h2><p className="section-desc">Chất lượng ánh sáng rực rỡ, không gây chói mắt và siêu bền</p></div>
            <div className="showcase-grid">
              {showcaseItems.map((item, idx) => (
                <div key={idx} className={`showcase-card border-${item.color}`}>
                  <div className="card-mockup"><div className={`glow-circle ${item.color}`}></div><Sparkles size={40} className={`mockup-icon ${item.color}`} /></div>
                  <div className="showcase-info"><span className="showcase-tag">{item.tag}</span><h4>{item.title}</h4><p>{item.size}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section id="process" className="section">
            <div className="section-header"><h2 className="section-title">QUY TRÌNH ĐẶT HÀNG NHANH GỌN</h2></div>
            <div className="process-steps">
              <div className="step-card"><span className="step-num">01</span><h4>Gửi Ý Tưởng</h4><p>Gửi ảnh mẫu, câu chữ qua Zalo.</p></div><ChevronRight className="step-arrow" />
              <div className="step-card"><span className="step-num">02</span><h4>Lên Demo & Báo Giá</h4><p>Thiết kế phác thảo kích thước mica và báo giá.</p></div><ChevronRight className="step-arrow" />
              <div className="step-card"><span className="step-num">03</span><h4>Gia Công Tỉ Mỉ</h4><p>Cắt laser, đi dây LED, test sáng 24h.</p></div><ChevronRight className="step-arrow" />
              <div className="step-card"><span className="step-num">04</span><h4>Giao Hàng</h4><p>Kèm nguồn 12V, ốc bắt tường.</p></div>
            </div>
          </section>

          {/* --- CẬP NHẬT GIAO DIỆN FORM LIÊN HỆ DƯỚI CÙNG --- */}
          <section id="contact" className="section form-section">
            <div className="form-container">
              <div className="form-left">
                <h2>BẠN CẦN LÀM BIỂN ĐÈN CHO MỤC ĐÍCH GÌ?</h2>
                <p>Hãy để lại thông tin, xưởng sẽ liên hệ gửi catalog và tư vấn chi tiết nhất.</p>
                <div className="contact-direct">
                  <div className="direct-item">
                    <Phone className="direct-icon" />
                    <div><span>Gọi trực tiếp hotline:</span><strong>{HOTLINE}</strong></div>
                  </div>
                  <div className="direct-item">
                    <MessageCircle className="direct-icon" />
                    <div><span>Hỗ trợ thiết kế Zalo:</span><a href={ZALO_URL} target="_blank" rel="noreferrer">Chat ngay tại Zalo</a></div>
                  </div>
                </div>
              </div>
              <div className="form-right">
                <form onSubmit={handleSubmitContactForm} className="contact-form">
                  <label>Họ và tên của bạn</label>
                  <input 
                    type="text" 
                    placeholder="VD: Anh Tuấn"
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    required 
                  />

                  <label>Số điện thoại / Zalo</label>
                  <input 
                    type="tel" 
                    placeholder="VD: 0988xxxxxx"
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    required 
                  />

                  {/* THÊM MỚI: Tùy chọn Mẫu có sẵn hoặc Tự điền */}
                  <label>Loại yêu cầu</label>
                  <select 
                    value={formData.type} 
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="Làm theo yêu cầu tự điền">Làm theo yêu cầu tự điền</option>
                    <option value="Tư vấn mẫu có sẵn trên web">Tư vấn mẫu có sẵn trên web</option>
                  </select>

                  <label>Nội dung muốn làm (Mã mẫu hoặc chi tiết yêu cầu...)</label>
                  <textarea 
                    rows="3" 
                    placeholder="VD: Mình cần làm biển chữ 'Coffee Chill' ngang 80cm..."
                    value={formData.request} 
                    onChange={(e) => setFormData({...formData, request: e.target.value})}
                  ></textarea>

                  <button type="submit" className="btn btn-submit">
                    Gửi Yêu Cầu Tư Vấn Qua Zalo
                  </button>
                </form>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* --- GIAO DIỆN TRANG BLOG MỚI --- */
        <div className="blog-page section">
          <div className="blog-header">
            <button className="btn-back" onClick={() => setCurrentPage('home')}>
              <ArrowLeft size={20} /> Quay lại trang chủ
            </button>
            <h1 className="section-title">BLOG & DỰ ÁN</h1>
            <p className="section-desc">Cập nhật những mẫu thiết kế mới nhất và kiến thức về đèn Neon</p>
          </div>

          <div className="blog-grid">
            {blogPosts.map(post => (
              <div key={post.id} className="blog-card">
                <div className="blog-image-wrapper">
                  <img src={post.image} alt={post.title} className="blog-img" />
                </div>
                <div className="blog-content">
                  <span className="blog-date">{post.date}</span>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  
                  {/* CẬP NHẬT: Khi bấm tư vấn, tự động gán Type là "Mẫu có sẵn" */}
                  <button 
                    className="read-more-btn"
                    onClick={() => {
                      setFormData({
                        ...formData, 
                        type: 'Tư vấn mẫu có sẵn trên web',
                        request: `Tôi muốn tư vấn về mẫu trong bài viết: "${post.title}"`
                      });
                      setCurrentPage('home');
                      setTimeout(() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                  >
                    Tư vấn mẫu này
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer (Luôn hiện dù ở trang nào) */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} NEON STUDIO - Chuyên Đèn Neon Sign Mica, Hộp Đèn Quảng Cáo & Photobooth.</p>
        <p className="footer-sub">Thiết kế sáng tạo - Ánh sáng tinh tế - Gia công chuẩn xác</p>
      </footer>
    </div>
  );
}