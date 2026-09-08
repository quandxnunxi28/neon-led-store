import React, { useState, useRef } from 'react';
import { 
  Sparkles, Lightbulb, Box, Camera, Phone, MessageCircle, 
  CheckCircle2, ChevronRight, Flame, ShieldCheck, Truck,
  Heart, Star, Feather, Zap, Upload, Power, Newspaper, ArrowLeft, Download, Image as ImageIcon,
  Menu, X, Coffee, Music, Headphones, Smile, Sun, Moon, Cloud, Anchor, Key, Scissors, ShoppingBag, Bell,
  Award, Battery, Bluetooth, Book, Briefcase, Clock, Compass, Cpu, Eye, Film, Flag, Gift, 
  Globe, Home, Mic, Monitor, Radio, Shield, Target, Tv, Umbrella, Watch, Wifi, Trash2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import './App.css';

// --- KHO DỮ LIỆU BLOG TĨNH ---
const blogPosts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Bài viết số ${i + 1}: Ý Tưởng Trang Trí Đèn Neon Cực Chill`,
  date: `0${(i % 9) + 1}/09/2026`,
  image: `/blog/anh${(i % 2) + 1}.jpg`, 
  excerpt: "Khám phá cách biến không gian phòng ngủ của bạn thành một góc nghệ thuật rực rỡ với đèn Neon uốn dẻo...",
  content: "Đèn neon không chỉ dùng cho quán cafe. Ngày nay, việc đặt một câu quote ý nghĩa hoặc hình ảnh ngộ nghĩnh trên đầu giường đang là xu hướng..."
}));

// --- MAP KHO 40 ICON NGUYÊN BẢN ---
const ICON_LIBRARY = [
  { name: 'Heart', icon: Heart, label: 'Trái tim' },
  { name: 'Star', icon: Star, label: 'Ngôi sao' },
  { name: 'Feather', icon: Feather, label: 'Chiếc lông' },
  { name: 'Zap', icon: Zap, label: 'Tia chớp' },
  { name: 'Coffee', icon: Coffee, label: 'Ly Cafe' },
  { name: 'Music', icon: Music, label: 'Âm nhạc' },
  { name: 'Headphones', icon: Headphones, label: 'Tai nghe' },
  { name: 'Camera', icon: Camera, label: 'Máy ảnh' },
  { name: 'Mic', icon: Mic, label: 'Microphone' },
  { name: 'Film', icon: Film, label: 'Cuộn phim' },
  { name: 'Radio', icon: Radio, label: 'Đài Radio' },
  { name: 'Tv', icon: Tv, label: 'Tivi' },
  { name: 'Wifi', icon: Wifi, label: 'Cột sóng Wifi' },
  { name: 'Bluetooth', icon: Bluetooth, label: 'Bluetooth' },
  { name: 'Battery', icon: Battery, label: 'Cục Pin' },
  { name: 'Cpu', icon: Cpu, label: 'Bản mạch / CPU' },
  { name: 'Monitor', icon: Monitor, label: 'Màn hình máy tính' },
  { name: 'Smile', icon: Smile, label: 'Mặt cười' },
  { name: 'Eye', icon: Eye, label: 'Con mắt' },
  { name: 'Sun', icon: Sun, label: 'Mặt trời' },
  { name: 'Moon', icon: Moon, label: 'Mặt trăng' },
  { name: 'Cloud', icon: Cloud, label: 'Đám mây' },
  { name: 'Umbrella', icon: Umbrella, label: 'Cái ô' },
  { name: 'Anchor', icon: Anchor, label: 'Mỏ neo' },
  { name: 'Compass', icon: Compass, label: 'La bàn' },
  { name: 'Globe', icon: Globe, label: 'Quả địa cầu' },
  { name: 'Flag', icon: Flag, label: 'Lá cờ' },
  { name: 'Award', icon: Award, label: 'Huy chương' },
  { name: 'Gift', icon: Gift, label: 'Hộp quà' },
  { name: 'ShoppingBag', icon: ShoppingBag, label: 'Túi xách' },
  { name: 'Briefcase', icon: Briefcase, label: 'Cặp táp' },
  { name: 'Book', icon: Book, label: 'Quyển sách' },
  { name: 'Home', icon: Home, label: 'Ngôi nhà' },
  { name: 'Clock', icon: Clock, label: 'Đồng hồ treo tường' },
  { name: 'Watch', icon: Watch, label: 'Đồng hồ đeo tay' },
  { name: 'Key', icon: Key, label: 'Chìa khóa' },
  { name: 'Scissors', icon: Scissors, label: 'Cái kéo' },
  { name: 'Bell', icon: Bell, label: 'Cái chuông' },
  { name: 'Shield', icon: Shield, label: 'Cái khiên' },
  { name: 'Target', icon: Target, label: 'Mục tiêu / Bia bắn' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const previewRef = useRef(null);
  
  // --- STATE QUẢN LÝ VẬT THỂ (KÉO THẢ DRAG & DROP) ---
  const [selectedId, setSelectedId] = useState('text'); 
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  // 1. Quản lý Chữ
  const [customText, setCustomText] = useState('Chill');
  const [customColor, setCustomColor] = useState('cyan');
  const [customFont, setCustomFont] = useState('Dancing Script');
  const [textTransform, setTextTransform] = useState({ x: 0, y: 50, scale: 1, rotate: 0 });

  // 2. Quản lý Mảng Hình Ảnh / Icon 
  const [icons, setIcons] = useState([
    { id: 'icon_init', type: 'lucide', name: 'Feather', x: 0, y: -50, scale: 1, rotate: 0 }
  ]); 
  const [showIconLibrary, setShowIconLibrary] = useState(false);
  
  // State nền tường & hiệu ứng
  const [isLightOn, setIsLightOn] = useState(true); 
  const [bgType, setBgType] = useState('brick'); 
  const [customBg, setCustomBg] = useState(null); 
  const [backing, setBacking] = useState('none'); 
  const [animation, setAnimation] = useState('steady'); 

  const [customNote, setCustomNote] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', type: 'Làm theo yêu cầu tự điền', request: '' });

  // Blog Phân Trang
  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  const POSTS_PER_PAGE = 8; 
  const currentPosts = blogPosts.slice((currentBlogPage - 1) * POSTS_PER_PAGE, currentBlogPage * POSTS_PER_PAGE);
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  const HOTLINE = "0984115697";
  const ZALO_URL = `https://zalo.me/${HOTLINE}`;

  // ==========================================
  // LOGIC THÊM, XÓA & KÉO THẢ VẬT THỂ
  // ==========================================
  const addIcon = (name) => {
    const newId = `icon_${Date.now()}`;
    setIcons([...icons, { id: newId, type: 'lucide', name, x: 0, y: 0, scale: 1, rotate: 0 }]);
    setSelectedId(newId);
    setShowIconLibrary(false);
  };

  const addImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newId = `img_${Date.now()}`;
      setIcons([...icons, { id: newId, type: 'image', url: URL.createObjectURL(file), x: 0, y: 0, scale: 1, rotate: 0 }]);
      setSelectedId(newId);
    }
  };

  const deleteSelected = () => {
    if (selectedId !== 'text') {
      setIcons(icons.filter(i => i.id !== selectedId));
      setSelectedId('text'); 
    }
  };

  const updateSelectedTransform = (key, value) => {
    const val = parseFloat(value);
    if (selectedId === 'text') {
      setTextTransform(prev => ({ ...prev, [key]: val }));
    } else {
      setIcons(icons.map(icon => icon.id === selectedId ? { ...icon, [key]: val } : icon));
    }
  };

  const handlePointerDown = (e, id, currentX, currentY) => {
    e.stopPropagation(); 
    setSelectedId(id);
    setIsDragging(true);
    dragRef.current = { id, startX: e.clientX, startY: e.clientY, origX: currentX, origY: currentY };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !dragRef.current) return;
    const { id, startX, startY, origX, origY } = dragRef.current;
    
    // Tính toán quãng đường rê chuột
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // Tọa độ mới mong muốn
    let newX = origX + dx;
    let newY = origY + dy;

    // --- BỨC TƯỜNG GIỚI HẠN (BOUNDING BOX) ---
    if (previewRef.current) {
      const boardWidth = previewRef.current.clientWidth;
      const boardHeight = previewRef.current.clientHeight;
      
      // Giới hạn dựa trên chiều rộng bảng (để lại 40px lề an toàn)
      const limitX = (boardWidth / 2) - 40;
      const limitY = (boardHeight / 2) - 40;

      // Ép tọa độ không bao giờ vượt qua limitX và limitY
      newX = Math.max(-limitX, Math.min(limitX, newX));
      newY = Math.max(-limitY, Math.min(limitY, newY));
    }

    if (id === 'text') {
      setTextTransform(prev => ({ ...prev, x: newX, y: newY }));
    } else {
      setIcons(icons.map(icon => icon.id === id ? { ...icon, x: newX, y: newY } : icon));
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    dragRef.current = null;
    e.target.releasePointerCapture(e.pointerId);
  };

  // ==========================================
  // XUẤT ẢNH & ZALO
  // ==========================================
  const handleDownloadDesign = async () => {
    if (!previewRef.current) return;
    try {
      const powerBtn = previewRef.current.querySelector('.power-btn');
      if (powerBtn) powerBtn.style.display = 'none';
      const prevSelected = selectedId;
      setSelectedId(null); 

      await new Promise(resolve => setTimeout(resolve, 100)); 

      const canvas = await html2canvas(previewRef.current, { useCORS: true, backgroundColor: '#000', scale: 2 });

      if (powerBtn) powerBtn.style.display = 'flex';
      setSelectedId(prevSelected);

      const link = document.createElement('a');
      link.href = canvas.toDataURL("image/png");
      link.download = `Thiet-Ke-Neon-${new Date().getTime()}.png`;
      link.click();
    } catch (error) {
      alert("Có lỗi xảy ra khi tải ảnh, vui lòng thử lại!");
    }
  };

  const handleSendToZalo = async () => {
    if (!customerPhone) return alert("Vui lòng nhập số điện thoại để xưởng tiện liên hệ lại nhé!");
    const message = `Chào xưởng, tôi đặt đèn Neon (Tự thiết kế web):
- Chữ Neon: "${customText}" (Font: ${customFont}, Màu: ${customColor})
- Số lượng Hình ảnh/Icon: ${icons.length} hình (Chi tiết xem ảnh đính kèm)
- Hiệu ứng: ${animation}
- Khung Mica: ${backing === 'none' ? 'Không viền' : backing === 'cut' ? 'Cắt theo viền' : 'Nguyên tấm vuông'}
- SĐT: ${customerPhone}
- Ghi chú: ${customNote ? customNote : 'Không có'}`;

    try {
      await navigator.clipboard.writeText(message);
      alert("✅ Đã copy thông tin đơn hàng!\n\nNếu bạn đã BẤM TẢI ẢNH THIẾT KẾ, vui lòng gửi kèm bức ảnh đó cùng với đoạn tin nhắn này trong Zalo nhé!");
    } catch (err) {}
    window.location.href = `https://zalo.me/${HOTLINE}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmitContactForm = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return alert("Vui lòng nhập họ tên và SĐT!");
    const message = `Chào xưởng:\n- Tên: ${formData.name}\n- SĐT: ${formData.phone}\n- Phân loại: ${formData.type}\n- Yêu cầu: ${formData.request}`;
    try {
      await navigator.clipboard.writeText(message);
      alert("✅ Đã copy thông tin! Bạn dán vào Zalo nhé.");
    } catch (err) {}
    window.location.href = `https://zalo.me/${HOTLINE}?text=${encodeURIComponent(message)}`;
  };

  const currentScale = selectedId === 'text' ? textTransform.scale : (icons.find(i => i.id === selectedId)?.scale || 1);
  const currentRotate = selectedId === 'text' ? textTransform.rotate : (icons.find(i => i.id === selectedId)?.rotate || 0);

  const services = [
    { id: 1, title: "Đèn LED Neon Sign Uốn Mica", icon: <Sparkles className="service-icon pink" />, desc: "Chất liệu mica dẫn sáng cao cấp, LED silicon dẻo siêu bền, tiết kiệm điện.", highlight: "Tạo hình mọi kích thước & font chữ" },
    { id: 2, title: "Hộp Đèn Quảng Cáo & Music Box", icon: <Box className="service-icon cyan" />, desc: "Hộp đèn mica hút nổi, hộp đèn siêu mỏng mặt mica hắt sáng viền. Đặc biệt nhận làm Music Box.", highlight: "Ánh sáng đồng đều, góc cạnh sắc sảo" },
    { id: 3, title: "Photobooth & Góc Check-in Sự Kiện", icon: <Camera className="service-icon yellow" />, desc: "Setup trọn gói background, hộp đèn neon chụp hình photobooth cho sự kiện.", highlight: "Nổi bật trên từng khung hình" }
  ];

  const showcaseItems = [
    { title: "Bảng hiệu Bar & Coffee", tag: "Mica uốn LED", color: "pink", size: "Chữ nghệ thuật phối màu Neon" },
    { title: "Hộp đèn Music Box để bàn", tag: "Hot trend", color: "cyan", size: "Đèn LED cảm biến đổi màu" },
    { title: "Photobooth Khai Trương", tag: "Sự kiện", color: "purple", size: "Kích thước 2m x 2.4m nổi bật" },
    { title: "Logo Doanh Nghiệp Hắt Sáng", tag: "Bảng hiệu", color: "yellow", size: "Độ bền ngoài trời trên 3 năm" },
  ];

  return (
    <div className="app-container" style={{
      backgroundColor: '#080b13',
      backgroundImage: `radial-gradient(circle at 10% 20%, rgba(255, 0, 127, 0.05), transparent 30%), radial-gradient(circle at 90% 80%, rgba(0, 240, 255, 0.05), transparent 30%), linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
      backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px', backgroundAttachment: 'fixed', minHeight: '100vh'
    }}>
      <header className="navbar" style={{ backgroundImage: "linear-gradient(rgba(8, 11, 19, 0.85), rgba(8, 11, 19, 0.85)), url('/header/anhheader.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="logo" onClick={() => {setCurrentPage('home'); setIsMobileMenuOpen(false);}} style={{cursor: 'pointer'}}>
          <Flame className="logo-icon" /><span>NEON<strong>STUDIO</strong></span>
        </div>
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <button className="nav-btn" onClick={() => {setCurrentPage('home'); setIsMobileMenuOpen(false);}}>Trang Chủ</button>
          {currentPage === 'home' && (
            <><a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Dịch vụ</a><a href="#showcase" onClick={() => setIsMobileMenuOpen(false)}>Dự án</a><a href="#process" onClick={() => setIsMobileMenuOpen(false)}>Quy trình</a></>
          )}
          <button className="nav-btn" onClick={() => {setCurrentPage('blog'); setIsMobileMenuOpen(false);}}>
            <Newspaper size={18} style={{marginRight: '5px'}}/> Blog & Dự Án
          </button>
          <a href="#contact" className="contact-btn" onClick={() => {setCurrentPage('home'); setIsMobileMenuOpen(false);}}>Báo giá ngay</a>
        </nav>
      </header>

      <div className="fab-container">
        <a href={ZALO_URL} target="_blank" rel="noreferrer" className="fab-btn fab-zalo" title="Chat Zalo"><MessageCircle size={28} /></a>
        <a href={`tel:${HOTLINE}`} className="fab-btn fab-phone" title="Gọi Hotline"><Phone size={24} /></a>
      </div>

      {currentPage === 'home' ? (
        <>
          <section className="hero">
            <div className="hero-content">
              <div className="badge"><Sparkles size={16} /> Gia công xưởng trực tiếp - Giá tận gốc</div>
              <h1 className="hero-title">BIẾN Ý TƯỞNG THÀNH <br /><span className="neon-text-pink">ĐÈN NEON NGHỆ THUẬT</span></h1>
              <p className="hero-sub">Chuyên thiết kế, uốn đèn LED Neon dẻo trên nền Mica trong suốt dày dặn. Nhận làm hộp đèn quảng cáo, Photobooth sự kiện với độ sắc nét tuyệt đối.</p>
              <div className="hero-actions">
                <a href={ZALO_URL} target="_blank" rel="noreferrer" className="btn btn-primary"><MessageCircle size={20} /> Nhắn Zalo Thiết Kế Miễn Phí</a>
                <a href={`tel:${HOTLINE}`} className="btn btn-secondary"><Phone size={20} /> Hotline: {HOTLINE}</a>
              </div>
            </div>
          </section>

          <section id="custom-neon" className="section dark-bg">
            <div className="section-header">
              <h2 className="section-title">PHÒNG THIẾT KẾ ĐA VẬT THỂ</h2>
              <p className="section-desc">Thêm tùy ý hình ảnh. Chạm vào chữ hoặc hình để kéo thả, phóng to, thu nhỏ và xoay!</p>
            </div>

            <div className="customizer-container">
              
              {/* === CỘT TRÁI: KHU VỰC BẢNG ĐEN VÀ THANH TRƯỢT SÁT NHAU === */}
              <div className="preview-section">
                
                <div 
                  ref={previewRef} 
                  className={`preview-board bg-${bgType}`} 
                  onPointerDown={() => setSelectedId(null)} 
                  style={bgType === 'custom' && customBg ? { backgroundImage: `url(${customBg})`, backgroundSize: 'cover', backgroundPosition: 'center', userSelect: 'none' } : { userSelect: 'none' }}
                >
                  <button className={`power-btn ${isLightOn ? 'on' : 'off'}`} onPointerDown={(e) => e.stopPropagation()} onClick={(e) => {e.stopPropagation(); setIsLightOn(!isLightOn);}} title="Bật/Tắt điện">
                    <Power size={24} />
                  </button>

                  <div className={`neon-preview-wrapper backing-${backing} ${!isLightOn ? 'is-off' : ''} anim-${isLightOn ? animation : 'none'} text-${customColor}`} style={{ position: 'relative', width: '100%', height: '100%' }}>
                    
                    {icons.map((icon) => (
                      <div 
                        key={icon.id}
                        onPointerDown={(e) => handlePointerDown(e, icon.id, icon.x, icon.y)}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        style={{ 
                          position: 'absolute', 
                          left: '50%', top: '50%',
                          transform: `translate(calc(-50% + ${icon.x}px), calc(-50% + ${icon.y}px)) scale(${icon.scale}) rotate(${icon.rotate}deg)`,
                          cursor: isDragging && selectedId === icon.id ? 'grabbing' : 'pointer',
                          touchAction: 'none',
                          padding: '10px',
                          borderRadius: '10px',
                          outline: selectedId === icon.id ? '2px dashed rgba(0, 240, 255, 0.8)' : 'none',
                          backgroundColor: selectedId === icon.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                          zIndex: selectedId === icon.id ? 10 : 1
                        }}
                      >
                        {icon.type === 'lucide' ? (
                          ICON_LIBRARY.find(item => item.name === icon.name)?.icon && 
                          React.createElement(ICON_LIBRARY.find(item => item.name === icon.name).icon, { size: 64, className: "neon-icon" })
                        ) : (
                          <img src={icon.url} alt="Upload" className="uploaded-neon-img" draggable="false" />
                        )}
                      </div>
                    ))}

                    <div 
                      onPointerDown={(e) => handlePointerDown(e, 'text', textTransform.x, textTransform.y)}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      className="neon-preview-text" 
                      style={{ 
                        position: 'absolute',
                        left: '50%', top: '50%',
                        fontFamily: `"${customFont}", cursive`, 
                        transform: `translate(calc(-50% + ${textTransform.x}px), calc(-50% + ${textTransform.y}px)) scale(${textTransform.scale}) rotate(${textTransform.rotate}deg)`,
                        cursor: isDragging && selectedId === 'text' ? 'grabbing' : 'pointer',
                        touchAction: 'none',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        outline: selectedId === 'text' ? '2px dashed rgba(0, 240, 255, 0.8)' : 'none',
                        backgroundColor: selectedId === 'text' ? 'rgba(255,255,255,0.05)' : 'transparent',
                        zIndex: selectedId === 'text' ? 10 : 2,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {customText || 'Nhập chữ...'}
                    </div>

                  </div>
                </div>

                {/* KHỐI ĐIỀU CHỈNH GẮN CHẶT DƯỚI BẢNG ĐEN (TỐI ƯU CHO ĐIỆN THOẠI) */}
                <div className="control-group" style={{ background: 'rgba(0,240,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(0,240,255,0.2)', marginTop: '5px', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ color: '#fff', margin: 0, fontWeight: 'bold' }}>
                      <span style={{color: 'var(--neon-cyan)'}}>ĐANG CHỈNH SỬA:</span> <span style={{ color: 'var(--neon-pink)', textTransform: 'uppercase'}}>{selectedId === 'text' ? 'Dòng chữ' : (selectedId ? 'Hình ảnh' : 'Chưa chọn vật thể')}</span>
                    </label>
                    {selectedId && selectedId !== 'text' && (
                      <button onClick={deleteSelected} style={{ background: 'rgba(255,0,0,0.2)', border: '1px solid rgba(255,0,0,0.4)', color: '#ff4d4d', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}>
                        <Trash2 size={16}/> Xóa
                      </button>
                    )}
                  </div>

                  {selectedId ? (
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '8px', display: 'block' }}>Kích thước: {currentScale}x</label>
                        <input type="range" min="0.5" max="4" step="0.1" value={currentScale} onChange={(e) => updateSelectedTransform('scale', e.target.value)} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--neon-cyan)' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '8px', display: 'block' }}>Góc xoay: {currentRotate}°</label>
                        <input type="range" min="-180" max="180" step="1" value={currentRotate} onChange={(e) => updateSelectedTransform('rotate', e.target.value)} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--neon-cyan)' }} />
                      </div>
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>👆 Hãy bấm vào dòng chữ hoặc hình trên bảng đen để xoay lật!</p>
                  )}
                </div>

                {/* Các công cụ Nền & Khung */}
                <div className="quick-tools">
                  <div className="tool-group">
                    <span className="tool-label">Phông nền:</span>
                    <button className={bgType === 'brick' ? 'active' : ''} onClick={() => setBgType('brick')}>Tường gạch</button>
                    <button className={bgType === 'greenery' ? 'active' : ''} onClick={() => setBgType('greenery')}>Tường cỏ</button>
                    <button className={bgType === 'concrete' ? 'active' : ''} onClick={() => setBgType('concrete')}>Bê tông</button>
                    <button className={bgType === 'dark' ? 'active' : ''} onClick={() => setBgType('dark')}>Tối giản</button>
                    <label className={`tool-btn-upload ${bgType === 'custom' ? 'active' : ''}`}>
                      <ImageIcon size={14} style={{marginRight: 4}}/> Ướm tường nhà
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) { setCustomBg(URL.createObjectURL(file)); setBgType('custom'); }
                      }} style={{ display: 'none' }} />
                    </label>
                  </div>
                  <div className="tool-group">
                    <span className="tool-label">Hiệu ứng:</span>
                    <button className={animation === 'steady' ? 'active' : ''} onClick={() => setAnimation('steady')}>Sáng tĩnh</button>
                    <button className={animation === 'breathing' ? 'active' : ''} onClick={() => setAnimation('breathing')}>Nhịp thở</button>
                    <button className={animation === 'flicker' ? 'active' : ''} onClick={() => setAnimation('flicker')}>Nhấp nháy</button>
                    <button className={animation === 'rgb' ? 'active' : ''} onClick={() => setAnimation('rgb')}>Đa sắc (RGB)</button>
                  </div>
                  <div className="tool-group">
                    <span className="tool-label">Khung Mica:</span>
                    <button className={backing === 'none' ? 'active' : ''} onClick={() => setBacking('none')}>Trong suốt</button>
                    <button className={backing === 'cut' ? 'active' : ''} onClick={() => setBacking('cut')}>Cắt viền</button>
                    <button className={backing === 'square' ? 'active' : ''} onClick={() => setBacking('square')}>Nguyên tấm</button>
                  </div>
                </div>
              </div>

              {/* === CỘT PHẢI: CHỈ CÒN NHẬP DỮ LIỆU === */}
              <div className="controls-board">
                
                <div className="control-group">
                  <label>1. Sửa nội dung chữ Neon:</label>
                  <input type="text" maxLength="25" value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="VD: Quán Của Tuấn" onClick={() => setSelectedId('text')} />
                </div>

                <div className="control-group" style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <label style={{ color: 'var(--neon-yellow)', fontWeight: 'bold' }}>2. THÊM HÌNH VÀO BẢNG:</label>
                  <div className="icon-picker">
                    <button 
                      type="button"
                      className={`icon-btn ${showIconLibrary ? 'active' : ''}`} 
                      onClick={() => setShowIconLibrary(!showIconLibrary)}
                      style={{background: showIconLibrary ? 'var(--neon-purple)' : '#1e293b', color: '#fff', border: '1px solid var(--border-color)'}}
                    >
                      <Sparkles size={18}/> Mở Kho Icon (40+) {showIconLibrary ? '▲' : '▼'}
                    </button>

                    <label className="icon-btn upload-btn">
                      <Upload size={18} /> Hoặc tải ảnh lên
                      <input type="file" accept="image/*" onChange={addImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>

                  {showIconLibrary && (
                    <div style={{
                      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(45px, 1fr))', gap: '8px',
                      marginTop: '10px', padding: '12px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)',
                      borderRadius: '8px', maxHeight: '220px', overflowY: 'auto'
                    }}>
                      {ICON_LIBRARY.map(item => (
                        <button
                          key={item.name} type="button" title={item.label} className="icon-btn"
                          style={{ justifyContent: 'center', padding: '10px 5px' }}
                          onClick={() => addIcon(item.name)}
                        >
                          {React.createElement(item.icon, { size: 24 })}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="control-group">
                  <label>3. Màu sắc tổng thể (Áp dụng cho bảng):</label>
                  <div className="color-picker">
                    {['pink', 'cyan', 'yellow', 'purple', 'white', 'red', 'green'].map(color => (
                      <button key={color} type="button" className={`color-btn bg-${color} ${customColor === color ? 'active' : ''}`} onClick={() => setCustomColor(color)}></button>
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
                
                <div style={{ backgroundColor: 'rgba(255, 234, 0, 0.08)', borderLeft: '4px solid var(--neon-yellow)', padding: '12px', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '15px', borderRadius: '4px', lineHeight: '1.5' }}>
                  <strong style={{color: 'var(--neon-yellow)'}}>💡 LƯU Ý QUAN TRỌNG:</strong> Quý khách vui lòng bấm <b>"Tải Ảnh Thiết Kế"</b> về máy trước, sau đó đính kèm bức ảnh vừa tải vào tin nhắn Zalo để xưởng báo giá nhé!
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn" onClick={handleDownloadDesign} style={{ flex: 1, backgroundColor: '#1e293b', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem', justifyContent: 'center' }}><Download size={18}/> Tải Ảnh Thiết Kế</button>
                  <button className="btn btn-submit" onClick={handleSendToZalo} style={{ flex: 1, marginTop: '0', fontSize: '0.9rem', justifyContent: 'center' }}>Gửi & Chốt Zalo</button>
                </div>
              </div>
            </div>
          </section>

          {/* Các mục khác giữ nguyên độ đẹp */}
          <section className="features">
            <div className="feature-item"><ShieldCheck size={28} className="feat-icon" /><div><h4>Bảo hành nguồn & LED</h4><p>Bảo hành 12 tháng lỗi 1 đổi 1</p></div></div>
            <div className="feature-item"><Lightbulb size={28} className="feat-icon" /><div><h4>Lên demo 3D trước</h4><p>Khách duyệt mẫu vẽ mới tiến hành cắt mica</p></div></div>
            <div className="feature-item"><Truck size={28} className="feat-icon" /><div><h4>Giao hàng toàn quốc</h4><p>Đóng thùng xốp chống sốc an toàn 100%</p></div></div>
          </section>

          <section id="services" className="section">
            <div className="section-header"><h2 className="section-title">DỊCH VỤ CỦA CHÚNG TÔI</h2></div>
            <div className="services-grid">
              {services.map((item) => (
                <div key={item.id} className="service-card"><div className="card-top">{item.icon}<span className="highlight-tag">{item.highlight}</span></div><h3 className="card-title">{item.title}</h3><p className="card-desc">{item.desc}</p></div>
              ))}
            </div>
          </section>

          <section id="showcase" className="section dark-bg">
            <div className="section-header"><h2 className="section-title">MẪU DỰ ÁN ĐÃ THI CÔNG</h2></div>
            <div className="showcase-grid">
              {showcaseItems.map((item, idx) => (
                <div key={idx} className={`showcase-card border-${item.color}`}><div className="card-mockup"><div className={`glow-circle ${item.color}`}></div><Sparkles size={40} className={`mockup-icon ${item.color}`} /></div><div className="showcase-info"><span className="showcase-tag">{item.tag}</span><h4>{item.title}</h4><p>{item.size}</p></div></div>
              ))}
            </div>
          </section>

          <section id="process" className="section">
            <div className="section-header"><h2 className="section-title">QUY TRÌNH ĐẶT HÀNG</h2></div>
            <div className="process-steps">
              <div className="step-card"><span className="step-num">01</span><h4>Gửi Ý Tưởng</h4><p>Gửi ảnh mẫu qua Zalo.</p></div><ChevronRight className="step-arrow" />
              <div className="step-card"><span className="step-num">02</span><h4>Lên Demo</h4><p>Thiết kế phác thảo kích thước.</p></div><ChevronRight className="step-arrow" />
              <div className="step-card"><span className="step-num">03</span><h4>Gia Công</h4><p>Cắt laser, đi dây LED.</p></div><ChevronRight className="step-arrow" />
              <div className="step-card"><span className="step-num">04</span><h4>Giao Hàng</h4><p>Đóng gói cẩn thận 100%.</p></div>
            </div>
          </section>

          <section id="contact" className="section form-section">
            <div className="form-container">
              <div className="form-left">
                <h2>BẠN CẦN LÀM BIỂN ĐÈN CHO MỤC ĐÍCH GÌ?</h2>
                <p>Hãy để lại thông tin, xưởng sẽ liên hệ gửi catalog và tư vấn chi tiết nhất.</p>
                <div className="contact-direct">
                  <div className="direct-item"><Phone className="direct-icon" /><div><span>Gọi trực tiếp:</span><strong>{HOTLINE}</strong></div></div>
                  <div className="direct-item"><MessageCircle className="direct-icon" /><div><span>Hỗ trợ thiết kế Zalo:</span><a href={ZALO_URL} target="_blank" rel="noreferrer">Chat ngay tại Zalo</a></div></div>
                </div>
              </div>
              <div className="form-right">
                <form onSubmit={handleSubmitContactForm} className="contact-form">
                  <input type="text" placeholder="Họ và tên..." value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  <input type="tel" placeholder="Số điện thoại / Zalo..." value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option value="Làm theo yêu cầu tự điền">Làm theo yêu cầu tự điền</option>
                    <option value="Tư vấn mẫu có sẵn trên web">Tư vấn mẫu có sẵn trên web</option>
                  </select>
                  <textarea rows="3" placeholder="Nội dung muốn làm..." value={formData.request} onChange={(e) => setFormData({...formData, request: e.target.value})}></textarea>
                  <button type="submit" className="btn btn-submit">Gửi Yêu Cầu Tư Vấn Qua Zalo</button>
                </form>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="blog-page section">
          <div className="blog-header">
            <button className="btn-back" onClick={() => setCurrentPage('home')}><ArrowLeft size={20} /> Quay lại trang chủ</button>
            <h1 className="section-title">BLOG & DỰ ÁN</h1>
          </div>
          <div className="blog-grid">
            {currentPosts.map(post => (
              <div key={post.id} className="blog-card">
                <div className="blog-image-wrapper"><img src={post.image} alt={post.title} className="blog-img" /></div>
                <div className="blog-content">
                  <span className="blog-date">{post.date}</span><h3 className="blog-title">{post.title}</h3><p className="blog-excerpt">{post.excerpt}</p>
                  <button className="read-more-btn" onClick={() => {
                      setFormData({...formData, type: 'Tư vấn mẫu có sẵn trên web', request: `Tôi muốn tư vấn về mẫu trong bài viết: "${post.title}"`});
                      setCurrentPage('home');
                      setTimeout(() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }), 100);
                    }}>Tư vấn mẫu này</button>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1} onClick={() => {setCurrentBlogPage(index + 1); window.scrollTo({ top: 0, behavior: 'smooth' });}} className={`page-btn ${currentBlogPage === index + 1 ? 'active' : ''}`}>{index + 1}</button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px' }}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: 'var(--neon-cyan)', transition: '0.3s', fontWeight: 'bold', textDecoration: 'none' }}>FACEBOOK</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--neon-pink)', transition: '0.3s', fontWeight: 'bold', textDecoration: 'none' }}>INSTAGRAM</a>
        </div>
        <p>© {new Date().getFullYear()} NEON STUDIO - Chuyên Đèn Neon Sign Mica, Hộp Đèn Quảng Cáo & Photobooth.</p>
        <p className="footer-sub">Thiết kế sáng tạo - Ánh sáng tinh tế - Gia công chuẩn xác</p>
      </footer>
    </div>
  );
}