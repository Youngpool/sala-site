import { projects, routes, movements } from './data.js';

const root = document.querySelector('#site');
const path = location.pathname.replace(/\/$/, '') || '/';
const asset = (value) => value;

const icon = (name) => {
  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M14 7l5 5-5 5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    compass: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="m15 9-2 4-4 2 2-4 4-2Z"/></svg>'
  };
  return icons[name] || '';
};

function header(inverse = false) {
  return `<header class="header ${inverse ? 'header--inverse' : ''}" data-header>
    <a class="brand" href="/" aria-label="SALA — Trang chủ"><img src="${asset('/assets/sala-logo.png')}" alt="SALA"></a>
    <nav class="desktop-nav" aria-label="Điều hướng chính">
      <a href="/san-pham">Sản phẩm</a><a href="/khong-gian-song">Không gian sống</a>
      <a href="/cau-chuyen-sala">Câu chuyện SALA</a><a href="/nhip-song">Nhịp sống</a>
    </nav>
    <a class="map-link" href="/masterplan">Khám phá bản đồ ${icon('arrow')}</a>
    <button class="menu-button" type="button" aria-label="Mở menu" aria-expanded="false">${icon('menu')}</button>
  </header>
  <div class="mobile-menu" aria-hidden="true">
    <button class="menu-close" type="button" aria-label="Đóng menu">${icon('close')}</button>
    <nav aria-label="Điều hướng di động">
      <a href="/">SALA</a><a href="/san-pham">Sản phẩm</a><a href="/khong-gian-song">Không gian sống</a>
      <a href="/cau-chuyen-sala">Câu chuyện SALA</a><a href="/nhip-song">Nhịp sống</a><a href="/masterplan">Khám phá bản đồ</a>
    </nav>
  </div>`;
}

function footer() {
  return `<footer class="footer">
    <div class="footer__mark"><img src="/assets/sala-logo.png" alt="SALA"></div>
    <div><p class="eyebrow">Khám phá</p><a href="/masterplan">Masterplan</a><a href="/san-pham">Sản phẩm</a><a href="/khong-gian-song">Không gian sống</a></div>
    <div><p class="eyebrow">Câu chuyện</p><a href="/cau-chuyen-sala">Về SALA</a><a href="/nhat-ky-kien-tao">Nhật ký kiến tạo</a><a href="/nhip-song">Nhịp sống</a></div>
    <p class="footer__note">Thông tin dự án chi tiết sẽ được cập nhật từ nguồn dữ liệu đã xác minh.</p>
  </footer>`;
}

function projectPanel(project = projects[0]) {
  return `<aside class="project-panel" data-project-panel aria-live="polite">
    <button class="panel-collapse" type="button" aria-label="Thu gọn bảng thông tin">${icon('arrow')}</button>
    <div class="panel-content">
      <p class="eyebrow">${project.category}</p>
      <h3>${project.name}</h3>
      <div class="panel-image"><img src="/assets/masterplan.png" alt="Tổng thể masterplan SALA"></div>
      <p>Thông tin mô tả chính thức chưa được cung cấp. Khu vực này được giữ sẵn cho nội dung dự án đã xác minh.</p>
      <dl><div><dt>Trạng thái dữ liệu</dt><dd>${project.status}</dd></div></dl>
      <a class="text-link" href="/san-pham/${project.id}">Bạn quan tâm dự án này ${icon('arrow')}</a>
    </div>
    <span class="panel-collapsed-name">${project.name}</span>
  </aside>`;
}

function masterplanBlock() {
  const nodePositions = [[31,36],[46,29],[59,41],[42,55],[55,63],[69,50],[73,28]];
  return `<section class="masterplan" id="masterplan" aria-labelledby="masterplan-title">
    <div class="masterplan__map" data-map>
      <div class="map-title"><p class="eyebrow">05 — Masterplan</p><h2 id="masterplan-title">Khám phá<br>một tổng thể.</h2></div>
      <img src="/assets/masterplan.png" alt="Bản đồ tổng thể SALA">
      <div class="map-shade" aria-hidden="true"></div>
      ${projects.map((project, index) => `<button class="project-node ${index === 0 ? 'is-active' : ''}" style="--x:${nodePositions[index][0]}%;--y:${nodePositions[index][1]}%" data-project="${project.id}" type="button" aria-label="Xem ${project.name}"><span>${String(index + 1).padStart(2, '0')}</span><b>${project.name}</b></button>`).join('')}
      <div class="map-controls"><span>${icon('compass')} SALA</span><a href="/masterplan">Mở không gian 3D ${icon('arrow')}</a></div>
    </div>
    ${projectPanel()}
  </section>`;
}

function home() {
  root.innerHTML = `${header(true)}<main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__media"><img src="/assets/masterplan.png" alt="Không gian quy hoạch SALA"></div>
      <div class="hero__veil" aria-hidden="true"></div>
      <div class="hero__content reveal"><p class="eyebrow">Một không gian đô thị</p><h1 id="hero-title">Sống giữa<br><em>những cân bằng.</em></h1></div>
      <a class="scroll-cue" href="#introduction"><span></span>Khám phá SALA</a>
      <p class="hero__coordinates">10.77127° N<br>106.72505° E</p>
    </section>
    <section class="intro section" id="introduction">
      <p class="section-index reveal">02 — Giới thiệu</p>
      <div class="intro__copy reveal"><h2>Một không gian sống cân bằng giữa nhịp đô thị và thiên nhiên.</h2><p>SALA được hình thành như một khu đô thị nơi kiến trúc, cảnh quan, tiện ích và cộng đồng cùng tồn tại trong một hệ sinh thái thống nhất.</p></div>
    </section>
    <section class="movements">
      ${movements.map((m, i) => `<article class="movement movement--${i + 1} reveal"><div class="movement__number">${m.index}</div><div class="movement__visual"><img src="/assets/masterplan.png" alt="Góc nhìn masterplan SALA"></div><div class="movement__copy"><p class="eyebrow">Chuyển động ${m.index}</p><h2>${m.title}</h2><p>${m.body}</p></div></article>`).join('')}
    </section>
    <section class="location section">
      <div class="location__copy reveal"><p class="section-index">04 — Vị trí</p><h2>Trong nhịp chuyển động của thành phố.</h2><p>SALA được định vị tại tọa độ 10.77127° N, 106.72505° E theo dữ liệu masterplan được cung cấp.</p><a class="text-link" href="/masterplan">Xem kết nối không gian ${icon('arrow')}</a></div>
      <div class="location__map reveal"><img src="/assets/masterplan.png" alt="Vị trí SALA trong bối cảnh quy hoạch"><span class="location-dot">SALA</span></div>
    </section>
    ${masterplanBlock()}
    <section class="scale-shift section">
      <p class="section-index reveal">06 — Không gian ở</p><div class="scale-shift__title reveal"><h2>Từ quy mô đô thị<br>đến nhịp sống con người.</h2><a class="text-link" href="/san-pham">Khám phá sản phẩm ${icon('arrow')}</a></div>
      <div class="project-strip">${projects.slice(0,4).map((p,i)=>`<a class="project-card reveal" href="/san-pham/${p.id}"><span>0${i+1}</span><div><p>${p.category}</p><h3>${p.name}</h3></div>${icon('arrow')}</a>`).join('')}</div>
    </section>
    <section class="life section"><div class="life__statement reveal"><p class="section-index">07 — Không gian sống</p><h2>Một nơi được cảm nhận qua từng khoảng chuyển.</h2></div><div class="life__mosaic"><figure class="reveal"><img src="/assets/masterplan.png" alt="Cảnh quan trong masterplan SALA"><figcaption>Cảnh quan</figcaption></figure><figure class="reveal"><img src="/assets/masterplan.png" alt="Không gian công cộng trong masterplan SALA"><figcaption>Không gian công cộng</figcaption></figure></div></section>
    <section class="trust section"><p class="section-index reveal">08 — Kiến tạo</p><div class="trust__copy reveal"><h2>Niềm tin được xây dựng bằng những gì có thể kiểm chứng.</h2><p>Các mốc phát triển, hình ảnh thực tế và dữ liệu thành tựu sẽ chỉ được hiển thị khi nguồn nội dung chính thức được cung cấp.</p><a class="text-link" href="/nhat-ky-kien-tao">Nhật ký kiến tạo ${icon('arrow')}</a></div></section>
    <section class="journal section"><div class="journal__head reveal"><p class="section-index">09 — Nhịp sống</p><h2>SALA, mỗi ngày.</h2><a class="text-link" href="/nhip-song">Xem tất cả ${icon('arrow')}</a></div><div class="journal__empty reveal"><span>Biên tập</span><p>Nội dung câu chuyện, sự kiện và hình ảnh thực tế đang chờ dữ liệu xuất bản đã xác minh.</p></div></section>
    <section class="coda"><img src="/assets/masterplan.png" alt="Tổng thể không gian SALA"><div class="coda__veil"></div><div class="coda__content reveal"><p>Một nơi để sống.<br><em>Một không gian để thuộc về.</em></p><a href="/masterplan">Khám phá SALA ${icon('arrow')}</a></div></section>
  </main>${footer()}`;
}

function routePage(title, description) {
  root.innerHTML = `${header()}<main id="main" class="inner-page"><section class="inner-hero"><p class="eyebrow">SALA / ${title}</p><h1>${title}</h1><p>${description}</p></section><section class="editorial-placeholder"><div><p class="section-index">Nội dung</p><h2>Cấu trúc đã sẵn sàng cho dữ liệu được xác minh.</h2></div><p>Trang này không sử dụng thông tin, hình ảnh hoặc dữ kiện dự án chưa được cung cấp. Khi nội dung chính thức có sẵn, hệ thống dữ liệu có thể đưa chúng vào mà không thay đổi cấu trúc giao diện.</p></section><section class="route-map"><img src="/assets/masterplan.png" alt="Masterplan SALA"><a href="/masterplan">Khám phá masterplan ${icon('arrow')}</a></section></main>${footer()}`;
}

function projectDetail(project) {
  root.innerHTML = `${header()}<main id="main" class="inner-page project-detail"><section class="inner-hero"><p class="eyebrow">Sản phẩm / ${project.category}</p><h1>${project.name}</h1><p>${project.status}.</p></section><section class="detail-media"><img src="/assets/masterplan.png" alt="Vị trí tổng thể ${project.name} trong masterplan SALA"></section><section class="editorial-placeholder"><div><p class="section-index">Thông tin dự án</p><h2>Không hiển thị dữ liệu chưa được kiểm chứng.</h2></div><p>Hình ảnh, mô tả, tình trạng dự án và metadata chi tiết cần được bổ sung từ nguồn SALA chính thức.</p></section></main>${footer()}`;
}

function masterplanPage() {
  root.innerHTML = `${header(true)}<main id="main" class="masterplan-page"><div class="viewer" data-viewer><canvas aria-label="Mô hình 3D masterplan SALA"></canvas><div class="viewer-poster"><img src="/assets/masterplan.png" alt="Masterplan SALA"></div><div class="viewer-status">Đang chuẩn bị mô hình 3D…</div></div><div class="viewer-copy"><p class="eyebrow">Masterplan 3D</p><h1>Khám phá<br>không gian SALA.</h1><p>Kéo để xoay · cuộn để thu phóng</p></div><div class="viewer-list">${projects.map((p,i)=>`<button type="button" data-view-project="${p.id}"><span>0${i+1}</span>${p.name}</button>`).join('')}</div>${projectPanel(projects[0])}</main>${footer()}`;
  import('./masterplan.js').then(({ initViewer }) => initViewer(document.querySelector('[data-viewer]'))).catch(() => {
    document.querySelector('.viewer-status').textContent = 'Không thể tải chế độ 3D. Bản đồ tổng thể vẫn khả dụng.';
  });
}

if (path === '/') home();
else if (path === '/masterplan') masterplanPage();
else if (path.startsWith('/san-pham/')) projectDetail(projects.find(p => path.endsWith(p.id)) || projects[0]);
else if (routes[path]) routePage(...routes[path]);
else if (/^\/(tien-ich|su-kien|nhip-song)\//.test(path)) routePage('Nội dung chi tiết', 'Nội dung này đang chờ dữ liệu xuất bản đã xác minh.');
else routePage('Trang chưa có dữ liệu', 'Đường dẫn đã được ghi nhận nhưng chưa có nội dung chính thức.');

const menu = document.querySelector('.mobile-menu');
const menuButton = document.querySelector('.menu-button');
const closeButton = document.querySelector('.menu-close');
const toggleMenu = (open) => { menu?.classList.toggle('is-open', open); menu?.setAttribute('aria-hidden', String(!open)); menuButton?.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open); };
menuButton?.addEventListener('click', () => toggleMenu(true)); closeButton?.addEventListener('click', () => toggleMenu(false));

const headerEl = document.querySelector('[data-header]');
const updateHeader = () => headerEl?.classList.toggle('is-scrolled', scrollY > 48);
addEventListener('scroll', updateHeader, { passive: true }); updateHeader();

const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function selectProject(id) {
  const project = projects.find(item => item.id === id) || projects[0];
  const panel = document.querySelector('[data-project-panel]'); if (!panel) return;
  panel.querySelector('.eyebrow').textContent = project.category;
  panel.querySelector('h3').textContent = project.name;
  panel.querySelector('dd').textContent = project.status;
  panel.querySelector('.panel-collapsed-name').textContent = project.name;
  panel.querySelector('.text-link').href = `/san-pham/${project.id}`;
  document.querySelectorAll('[data-project], [data-view-project]').forEach(node => node.classList.toggle('is-active', (node.dataset.project || node.dataset.viewProject) === id));
  panel.classList.remove('is-collapsed');
}
document.querySelectorAll('[data-project], [data-view-project]').forEach(node => node.addEventListener('click', () => selectProject(node.dataset.project || node.dataset.viewProject)));
document.querySelector('.panel-collapse')?.addEventListener('click', () => document.querySelector('[data-project-panel]')?.classList.toggle('is-collapsed'));
