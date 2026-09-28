import { projects, routes, movements } from './data.js';
import { mountSplashCursor } from './splash-cursor.js';

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

function header(inverse = false, hero = false) {
  if (hero) return `<header class="header header--hero header--inverse" data-header>
    <a class="brand brand--hero" href="/" aria-label="SALA — Trang chủ"><img src="${asset('/assets/hero/sala-logo.png')}" alt="SALA"></a>
    <div class="hero-actions">
      <button class="language-button" type="button" aria-label="Chọn ngôn ngữ" aria-expanded="false"><span>VN</span><img src="${asset('/assets/hero/chevron.svg')}" alt=""></button>
      <button class="menu-button menu-button--hero" type="button" aria-label="Mở menu" aria-expanded="false">Menu</button>
    </div>
  </header>
  <div class="mobile-menu" aria-hidden="true">
    <button class="menu-close" type="button" aria-label="Đóng menu">${icon('close')}</button>
    <nav aria-label="Điều hướng di động">
      <a href="/">SALA</a><a href="/san-pham">Sản phẩm</a><a href="/khong-gian-song">Không gian sống</a>
      <a href="/cau-chuyen-sala">Câu chuyện SALA</a><a href="/nhip-song">Nhịp sống</a><a href="/masterplan">Khám phá bản đồ</a>
    </nav>
  </div>`;

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
  root.innerHTML = `${header(true, true)}<main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__media"><img src="/assets/hero/sala-sunset.png" alt="Toàn cảnh khu đô thị SALA bên sông lúc hoàng hôn"></div>
      <div class="hero__veil" aria-hidden="true"></div>
      <img class="hero__accent" src="/assets/hero/figma-3.svg" alt="" aria-hidden="true">
      <div class="hero__content">
        <div class="hero__statement">
          <h1 id="hero-title">Khu đô thị SALA</h1>
          <div class="hero__bottomline">
            <span>Bản giao hưởng</span>
            <img src="/assets/hero/figma-2.svg" alt="" aria-hidden="true">
            <span>Tinh hoa</span>
          </div>
        </div>
        <a class="hero__cta" href="#introduction">Khám phá SALA</a>
      </div>
    </section>
    <section class="about" id="introduction" aria-labelledby="about-title" data-about>
      <div class="about__pin">
      <img class="about__surface" src="/assets/about/ellipse.svg" alt="" aria-hidden="true">
      <div class="about__map" aria-hidden="true" data-about-map>
        <img src="/assets/about/map.png" alt="">
      </div>
      <div class="about__content">
        <div class="about__topline">
          <div class="about__copy">
            <p class="about__eyebrow">Về dự án</p>
            <h2 id="about-title" class="about__reading"><span class="about__reading--lead" data-about-copy>Sala là hệ sinh thái sống tinh hoa tại trung tâm Thủ Thiêm, </span><span data-about-copy>nơi không gian, dịch vụ và con người được phát triển đồng bộ, vận hành liền mạch và cùng hòa nhịp để tạo nên một trải nghiệm sống có chiều sâu và bản sắc riêng.</span></h2>
          </div>
          <div class="about__meter" aria-hidden="true">
            <img src="/assets/about/rule-wide.png" alt="">
            <img src="/assets/about/rule-short.png" alt=""><img src="/assets/about/rule-short.png" alt=""><img src="/assets/about/rule-short.png" alt=""><img src="/assets/about/rule-short.png" alt="">
          </div>
        </div>
        <p class="about__closing" data-about-copy>Từ những lớp giá trị riêng biệt,<br>Sala hòa quyện thành một tổng thể sống trọn vẹn.</p>
      </div>
      <div class="about__node" data-about-node aria-label="Vị trí SALA">
        <span class="about__node-disc"><img src="/assets/about/sala-pattern.png" alt=""></span>
        <img class="about__node-label" src="/assets/about/sala-label.svg" alt="SALA">
      </div>
      </div>
    </section>
    <section class="video-stage" aria-labelledby="video-stage-label" data-video-stage>
        <div class="video-stage__pin">
          <div class="video-stage__ribbon-reveal" aria-hidden="true">
            <span class="video-stage__brush" data-video-brush></span>
            <img class="video-stage__ribbon" src="/assets/video/music-ribbon.svg" alt="" data-video-ribbon>
          </div>
          <button class="video-stage__frame" type="button" aria-pressed="false" aria-describedby="video-stage-label" data-video-frame>
            <img src="/assets/about/city-video.png" alt="Xem video giới thiệu khu đô thị SALA">
            <span class="video-stage__shade" aria-hidden="true"></span>
          </button>
          <span class="video-stage__cursor" aria-hidden="true" data-video-cursor>
            <span class="video-stage__cursor-icon"><img src="/assets/video/play.svg" alt=""></span>
            <span id="video-stage-label">Xem video giới thiệu</span>
          </span>
        </div>
    </section>
    <section class="values-stage" aria-labelledby="values-title" data-values-stage>
      <div class="values-stage__pin">
        <img class="values-stage__background" src="/assets/values/background-section-values.png" alt="" aria-hidden="true" data-values-background>

        <div class="values-stage__intro" data-values-intro>
          <h2 id="values-title"><span>Những lớp giá trị</span><span>làm nên bản giao hưởng</span></h2>
        </div>

        <div class="values-stage__orchestra" data-values-orchestra>
          <p>Tại Sala, mỗi giá trị không tồn tại riêng lẻ. Thiên nhiên, không gian, trải nghiệm và con người được phối hợp để tạo nên một nhịp sống trọn vẹn — nơi mỗi lớp giá trị góp phần làm nên một<br>bản giao hưởng tinh hoa.</p>
          <div class="values-stage__notes" data-values-notes aria-hidden="true">
            ${Array.from({ length: 9 }, (_, index) => `<img src="/assets/values/note-${index + 1}.svg" alt="">`).join('')}
          </div>
        </div>

        <div class="values-stage__gallery" aria-hidden="true">
          <figure class="values-stage__scene" data-value-scene="natural"><img src="/assets/values/scene-natural.jpg" alt=""></figure>
          <figure class="values-stage__scene" data-value-scene="experience"><img src="/assets/values/scene-experience.jpg" alt=""></figure>
          <figure class="values-stage__scene" data-value-scene="style"><img src="/assets/values/scene-style.jpg" alt=""></figure>
        </div>

        <div class="values-stage__cards">
          <article class="value-card" data-value-card="natural">
            <div class="value-card__top"><h3><span>Nền âm</span><span>tự nhiên</span></h3><img src="/assets/values/icon-natural.svg" alt=""></div>
            <p>Thiên nhiên, ánh sáng và kiến trúc tạo nên nền tảng cân bằng cho nhịp sống — an yên nhưng vẫn kết nối với năng lượng đô thị.</p>
          </article>
          <article class="value-card" data-value-card="experience">
            <div class="value-card__top"><h3><span>Dòng chảy</span><span>trải nghiệm</span></h3><img src="/assets/values/icon-experience.svg" alt=""></div>
            <p>Con người, cộng đồng, dịch vụ và tiện ích được kết nối liền mạch, tạo nên những trải nghiệm liên tục trong từng nhịp sống.</p>
          </article>
          <article class="value-card" data-value-card="style">
            <div class="value-card__top"><h3><span>Dấu ấn</span><span>phong cách</span><span>sống</span></h3><img src="/assets/values/icon-style.svg" alt=""></div>
            <p>Từ những trải nghiệm được chọn lọc và cộng đồng đa dạng, Sala hình thành một phong cách sống tinh tế, hiện đại và giàu cảm xúc — mang bản sắc riêng.</p>
          </article>
        </div>
      </div>
    </section>
    <section class="map-story" aria-labelledby="map-story-title" data-map-story>
      <div class="map-story__pin">
        <div class="map-story__panel" data-map-panel>
          <div class="map-story__copy">
            <h2 id="map-story-title" data-map-title>SALA - Tâm điểm kết nối<br><span>TOD tại Thủ Thiêm</span></h2>
            <p data-map-description>Là tâm điểm tài chính - văn hóa mới, Thủ Thiêm đang bứt phá mạnh mẽ nhờ hạ tầng chiến lược và mạng lưới Metro TOD. Trong bức tranh đó, Khu đô thị Sala dần hoàn thiện hệ sinh thái đa kết nối, thiết lập chuẩn mực phát triển bền vững cho toàn khu vực.</p>
            <div class="map-story__switch" role="tablist" aria-label="Chọn loại bản đồ">
              <button type="button" role="tab" aria-selected="true" data-map-tab="overview">Bản đồ tổng quan</button>
              <button type="button" role="tab" aria-selected="false" data-map-tab="urban">Bản đồ khu đô thị</button>
            </div>
          </div>

          <div class="map-story__viewport">
            <div class="map-story__map is-active" role="tabpanel" data-map-view="overview">
              <img src="/assets/maps/map-overview-distance.png" alt="Bản đồ khoảng cách và các trục kết nối từ SALA đến khu vực trung tâm">
            </div>
            <div class="map-story__map" role="tabpanel" data-map-view="urban" hidden>
              <div class="map-story__urban-view is-active" data-urban-view="zones">
                <img src="/assets/maps/map-urban-zones.png" alt="Toàn cảnh các phân khu của Khu đô thị SALA">
              </div>
              <div class="map-story__urban-view" data-urban-view="amenities" hidden>
                <img src="/assets/maps/map-urban-amenities.png" alt="Bản đồ hệ tiện ích của Khu đô thị SALA">
              </div>
              <div class="map-story__subswitch" role="tablist" aria-label="Chọn lớp bản đồ khu đô thị">
                <button type="button" role="tab" aria-selected="true" data-urban-tab="zones">Phân khu</button>
                <button type="button" role="tab" aria-selected="false" data-urban-tab="amenities">Tiện ích</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="project-showcase" aria-labelledby="project-showcase-title" data-project-showcase>
      <div class="project-showcase__intro">
        <h2 id="project-showcase-title">Những sắc thái<br><span>của một chuẩn sống tinh hoa</span></h2>
        <p>Từ những không gian sống được chọn lọc đến những dấu ấn kiến trúc riêng biệt, mỗi bộ sưu tập tại Sala mang một sắc thái riêng, cùng góp phần tạo nên bản giao hưởng tinh hoa của toàn khu đô thị.</p>
      </div>

      <div class="project-showcase__categories" role="tablist" aria-label="Loại hình dự án Sala">
        <button class="project-category is-active" type="button" role="tab" aria-selected="true" data-project-category="apartment">
          <img src="/assets/projects/category-apartment.png" alt="Toàn cảnh các dự án căn hộ tại Sala">
          <span class="project-category__shade"></span><strong>Căn hộ</strong><small>8 dự án</small>
          <img class="project-category__pointer" src="/assets/projects/tab-pointer.svg" alt="">
        </button>
        <button class="project-category" type="button" role="tab" aria-selected="false" data-project-category="townhouse">
          <img src="/assets/projects/category-townhouse.png" alt="Dãy nhà phố thương mại tại Sala">
          <span class="project-category__shade"></span><strong>Nhà phố</strong><small>2 dự án</small>
          <img class="project-category__pointer" src="/assets/projects/tab-pointer.svg" alt="">
        </button>
        <button class="project-category" type="button" role="tab" aria-selected="false" data-project-category="villa">
          <img src="/assets/projects/category-villa.png" alt="Khu biệt thự sinh thái tại Sala">
          <span class="project-category__shade"></span><strong>Biệt thự</strong><small>3 dự án</small>
          <img class="project-category__pointer" src="/assets/projects/tab-pointer.svg" alt="">
        </button>
      </div>

      <div class="featured-project">
        <div class="featured-project__head">
          <h3>Dự án nổi bật</h3>
          <div class="featured-project__nav">
            <button type="button" aria-label="Dự án trước" data-project-prev><img src="/assets/projects/arrow.svg" alt=""></button>
            <button type="button" aria-label="Dự án tiếp theo" data-project-next><img src="/assets/projects/arrow.svg" alt=""></button>
          </div>
        </div>
        <div class="featured-project__body" data-project-panel>
          <figure class="featured-project__visual">
            <img data-project-image src="/assets/projects/sarene.png" alt="Phối cảnh Sarene Residence & Commercial Complex tại phân khu Bắc Sala">
            <figcaption><span class="featured-project__play"><img src="/assets/projects/play.svg" alt=""></span><span>XEM VIDEO<br>TRẢI NGHIỆM KHÔNG GIAN SỐNG</span></figcaption>
          </figure>
          <div class="featured-project__content">
            <div class="featured-project__title-row"><h4 data-project-name>SARENE</h4><span data-project-index>01/03</span></div>
            <p class="featured-project__tagline" data-project-tagline>Kiến tạo trải nghiệm sống đa tầng</p>
            <p class="featured-project__description" data-project-description>Sarene Residence &amp; Commercial Complex là tổ hợp căn hộ cao cấp và phố thương mại thuộc phân khu Bắc Sala, hướng hồ trung tâm và kết nối trực tiếp với hệ sinh thái thương mại – dịch vụ của toàn khu.</p>
            <div class="featured-project__metrics" data-project-metrics>
              <div><strong>04</strong><span>Tháp</span></div><div><strong>25</strong><span>Tầng</span></div><div><strong>480</strong><span>Căn hộ ở</span></div><div><strong>60</strong><span>Căn hộ thương mại</span></div>
            </div>
            <div class="featured-project__actions">
              <a class="featured-project__primary" data-project-detail href="https://www.thacogroup.vn/dai-quang-minh-tai-khoi-dong-khu-do-thi-sala-va-gioi-thieu-san-pham-the-he-moi-tai-trung-tam-do-thi-moi-thu-thiem" target="_blank" rel="noreferrer">Xem chi tiết <img src="/assets/projects/arrow-light.svg" alt=""></a>
              <button type="button">Tải brochure <img src="/assets/projects/download.svg" alt=""></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main><canvas class="splash-cursor-canvas" aria-hidden="true" data-splash-cursor></canvas>`;
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

if (window.gsap && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  window.gsap.ticker.lagSmoothing(500, 33);
}

function initAboutSequence() {
  const about = document.querySelector('[data-about]');
  if (!about) return;

  const map = about.querySelector('[data-about-map]');
  const node = about.querySelector('[data-about-node]');
  const content = about.querySelector('.about__content');
  const copy = [...about.querySelectorAll('[data-about-copy]')];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value) => Math.min(1, Math.max(0, value));
  const words = copy.flatMap(item => {
    const walker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    return textNodes.flatMap(textNode => {
      const created = [];
      const fragment = document.createDocumentFragment();
      textNode.nodeValue.split(/(\s+)/).forEach(token => {
        if (!token) return;
        if (/^\s+$/.test(token)) fragment.append(document.createTextNode(token));
        else {
          const word = document.createElement('span');
          word.className = 'about__word';
          word.textContent = token;
          fragment.append(word);
          created.push(word);
        }
      });
      textNode.replaceWith(fragment);
      return created;
    });
  });

  const render = () => {
    if (reduceMotion) {
      map.style.cssText = 'opacity:1;filter:none;transform:none';
      node.style.cssText = 'opacity:1;visibility:visible;transform:none';
      copy.forEach(item => item.style.cssText = 'opacity:1;color:#724e1d;transform:none');
      words.forEach(word => { word.style.color = '#724e1d'; word.style.fontWeight = '500'; });
      return;
    }

    const rect = about.getBoundingClientRect();
    const scrollDistance = Math.max(1, rect.height - innerHeight);
    const progress = clamp(-rect.top / scrollDistance);
    // Story order: copy first, then map, then SALA node before the TVC stage begins.
    const mapProgress = clamp((progress - 0.42) / 0.2);
    const nodeProgress = clamp((progress - 0.68) / 0.1);
    const sectionTwoOpacity = 1;

    copy.forEach(item => {
      item.style.opacity = '1';
      item.style.transform = 'translate3d(0,0,0)';
    });
    const readingProgress = clamp((progress - 0.03) / 0.39);
    words.forEach((word, index) => {
      const wordProgress = clamp((readingProgress - index / Math.max(1, words.length - 1)) * 8);
      word.style.color = `rgba(114,78,29,${0.14 + 0.86 * wordProgress})`;
      word.style.fontWeight = wordProgress > 0.7 ? '500' : '400';
    });
    content.style.opacity = String(sectionTwoOpacity);
    map.style.opacity = String(mapProgress * sectionTwoOpacity);
    map.style.filter = `blur(${(1 - mapProgress) * 12}px)`;
    map.style.transform = `scale(${1.035 - 0.035 * mapProgress})`;
    const nodeOpacity = nodeProgress * sectionTwoOpacity;
    node.style.opacity = String(nodeOpacity);
    node.style.visibility = nodeOpacity ? 'visible' : 'hidden';
    node.style.transform = `translate3d(0, ${(1 - nodeProgress) * 20}px, 0) scale(${0.72 + 0.28 * nodeProgress})`;

  };

  addEventListener('scroll', render, { passive: true });
  addEventListener('resize', render, { passive: true });
  render();
}

initAboutSequence();

function initVideoStage() {
  const stage = document.querySelector('[data-video-stage]');
  if (!stage) return;

  const frame = stage.querySelector('[data-video-frame]');
  const ribbon = stage.querySelector('[data-video-ribbon]');
  const brush = stage.querySelector('[data-video-brush]');
  const cursor = stage.querySelector('[data-video-cursor]');
  const shade = stage.querySelector('.video-stage__shade');
  const visual = frame.querySelector('img');
  const about = document.querySelector('[data-about]');
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (gsap && ScrollTrigger) {
    const media = gsap.matchMedia();
    media.add({
      desktop: '(min-width: 701px)',
      mobile: '(max-width: 700px)',
      reduceMotion: '(prefers-reduced-motion: reduce)'
    }, context => {
      const { desktop, reduceMotion } = context.conditions;
      const smallScale = () => desktop ? Math.min(1, 288 / frame.offsetWidth) : Math.min(0.7, 176 / frame.offsetWidth);
      const smallX = () => desktop ? 60 : 20;
      const smallViewportY = () => desktop ? Math.max(540, innerHeight - 230) : Math.max(390, innerHeight - 190);
      const holdY = () => smallViewportY() - innerHeight;
      const intermediateScale = () => desktop ? Math.min(1, 844 / frame.offsetWidth) : Math.min(0.9, (innerWidth - 56) / frame.offsetWidth);
      const intermediateX = () => desktop ? innerWidth * (184 / 1440) : 28;
      const intermediateY = () => desktop ? 60 : 76;
      const fullX = () => Math.max(desktop ? 48 : 20, (innerWidth - frame.offsetWidth) / 2);
      const fullY = () => Math.max(desktop ? 104 : 88, (innerHeight - frame.offsetHeight) / 2);
      const revealStart = () => about.offsetTop + (about.offsetHeight - innerHeight) * 0.68;
      const revealStartY = () => smallViewportY() - (stage.offsetTop - revealStart());
      stage.classList.add('is-ready');

      if (reduceMotion) {
        gsap.set(frame, { position: 'absolute', autoAlpha: 1, x: fullX, y: fullY, scale: 1 });
        gsap.set([ribbon, brush], { opacity: 1, clearProps: 'clipPath' });
        stage.classList.add('is-interactive');
        return;
      }

      gsap.set(frame, { autoAlpha: 0, x: smallX, y: revealStartY, scale: smallScale, transformOrigin: 'left top', force3D: true });
      gsap.set(visual, { scale: 1.09, transformOrigin: 'center center' });
      gsap.set(ribbon, { opacity: 0, xPercent: -24, clipPath: 'inset(0 100% 0 0)' });
      gsap.set(brush, { opacity: 0, xPercent: -16, scaleX: 0, transformOrigin: 'left center' });

      const storyEnd = () => stage.offsetTop + stage.offsetHeight - innerHeight;
      const totalJourney = () => Math.max(1, storyEnd() - revealStart());
      const holdProgress = () => (about.offsetTop + about.offsetHeight - innerHeight - revealStart()) / totalJourney();
      const entryProgress = () => (stage.offsetTop - revealStart()) / totalJourney();
      const holdAt = holdProgress();
      const entryAt = entryProgress();
      const mediumAt = entryAt;
      const fullAt = entryAt;
      const interactiveAt = Math.min(0.98, fullAt + 0.28);

      // One master timeline owns every transform from the section-2 fade through
      // the section-3 expansion, avoiding transform contention at the handoff.
      const storyTimeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: about,
          start: revealStart,
          end: storyEnd,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const interactive = storyTimeline.progress() >= interactiveAt;
            stage.classList.toggle('is-interactive', interactive);
            if (!interactive) cursor.classList.remove('is-visible', 'is-video');
          }
        }
      });
      storyTimeline
        .addLabel('tvc-reveal', 0)
        .addLabel('section-2-end', holdAt)
        .addLabel('section-3-entry', entryAt)
        .addLabel('medium', mediumAt)
        .addLabel('full', fullAt)
        .to({}, { duration: 1 }, 0)
        .to(frame, { autoAlpha: 1, duration: 0.075, ease: 'power2.out' }, 'tvc-reveal')
        .to(frame, { y: holdY, duration: holdAt }, 'tvc-reveal')
        // From the first pixel after section 2, position and scale evolve together.
        .to(frame, { x: intermediateX, y: intermediateY, scale: intermediateScale, duration: entryAt - holdAt }, 'section-2-end')
        .to(visual, { scale: 1.035, duration: entryAt - holdAt }, 'section-2-end')
        .to(ribbon, { opacity: 1, xPercent: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.36 }, 'section-2-end+=0.08')
        .to(brush, { opacity: 0.26, xPercent: 54, scaleX: 1, duration: 0.34 }, 'section-2-end+=0.08')
        .to(frame, { x: fullX, y: fullY, scale: 1, duration: 0.28 }, 'full')
        .to(visual, { scale: 1, duration: 0.28 }, 'full')
        .to(shade, { opacity: 0, duration: 0.2 }, 'full');

      return () => storyTimeline.scrollTrigger?.kill();
    });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  } else {
    stage.classList.add('is-ready');
    frame.style.opacity = '1';
    frame.style.visibility = 'visible';
  }

  const cursorX = gsap?.quickTo(cursor, 'x', { duration: 0.22, ease: 'power3.out' });
  const cursorY = gsap?.quickTo(cursor, 'y', { duration: 0.22, ease: 'power3.out' });
  const moveVideoCursor = event => {
    const cursorIcon = cursor.querySelector('.video-stage__cursor-icon');
    const x = event.clientX - cursorIcon.offsetLeft - cursorIcon.offsetWidth / 2;
    const y = event.clientY - cursorIcon.offsetTop - cursorIcon.offsetHeight / 2;
    if (cursorX && cursorY) {
      cursorX(x);
      cursorY(y);
    } else {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };
  stage.addEventListener('pointerenter', event => {
    if (!stage.classList.contains('is-interactive')) return;
    moveVideoCursor(event);
    cursor.classList.add('is-visible');
  });
  stage.addEventListener('pointermove', event => {
    if (!stage.classList.contains('is-interactive')) return;
    moveVideoCursor(event);
    cursor.classList.add('is-visible');
  });
  stage.addEventListener('pointerleave', () => {
    cursor.classList.remove('is-visible', 'is-video');
  });
  frame.addEventListener('pointerenter', event => {
    if (!stage.classList.contains('is-interactive')) return;
    moveVideoCursor(event);
    cursor.classList.add('is-visible', 'is-video');
  });
  frame.addEventListener('pointerleave', () => cursor.classList.remove('is-video'));

  frame.addEventListener('click', () => {
    const playing = frame.getAttribute('aria-pressed') !== 'true';
    frame.setAttribute('aria-pressed', String(playing));
    stage.classList.toggle('is-playing', playing);
  });

}

initVideoStage();

function initValuesSequence() {
  const stage = document.querySelector('[data-values-stage]');
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!stage || !gsap || !ScrollTrigger) return;

  const intro = stage.querySelector('[data-values-intro]');
  const orchestra = stage.querySelector('[data-values-orchestra]');
  const notesWrap = stage.querySelector('[data-values-notes]');
  const notes = gsap.utils.toArray(notesWrap.querySelectorAll('img'));
  const gallery = stage.querySelector('.values-stage__gallery');
  const scenes = {
    natural: stage.querySelector('[data-value-scene="natural"]'),
    experience: stage.querySelector('[data-value-scene="experience"]'),
    style: stage.querySelector('[data-value-scene="style"]')
  };
  const cards = {
    natural: stage.querySelector('[data-value-card="natural"]'),
    experience: stage.querySelector('[data-value-card="experience"]'),
    style: stage.querySelector('[data-value-card="style"]')
  };
  const media = gsap.matchMedia();

  media.add({
    desktop: '(min-width: 701px)',
    mobile: '(max-width: 700px)',
    reduceMotion: '(prefers-reduced-motion: reduce)'
  }, context => {
    const { reduceMotion } = context.conditions;
    if (reduceMotion) {
      gsap.set(intro, { autoAlpha: 0 });
      gsap.set(orchestra, { autoAlpha: 0 });
      gsap.set(gallery, { autoAlpha: 1 });
      gsap.set(Object.values(scenes), { autoAlpha: 0, '--scene-reveal': '0%' });
      gsap.set(scenes.style, { autoAlpha: 1 });
      gsap.set(Object.values(cards), { autoAlpha: 0 });
      gsap.set(cards.style, { autoAlpha: 1 });
      return;
    }

    const burstX = (_index, note) => notesWrap.clientWidth / 2 - (note.offsetLeft + note.offsetWidth / 2);
    const burstY = (_index, note) => notesWrap.clientHeight / 2 - (note.offsetTop + note.offsetHeight / 2);

    gsap.set(intro, { autoAlpha: 0, y: 20 });
    gsap.set(orchestra, { autoAlpha: 0, y: 18 });
    gsap.set(notes, {
      autoAlpha: 0,
      x: burstX,
      y: burstY,
      scale: 0.18,
      transformOrigin: '50% 50%',
      force3D: true
    });
    gsap.set(gallery, { autoAlpha: 1 });
    gsap.set(Object.values(scenes), {
      autoAlpha: 0,
      '--scene-reveal': '50%'
    });
    gsap.set(Object.values(cards), {
      autoAlpha: 0,
      y: 18,
      scale: 0.985,
      transformOrigin: '50% 50%'
    });

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage,
        start: () => stage.offsetTop,
        end: () => stage.offsetTop + stage.offsetHeight - innerHeight,
        scrub: 0.85,
        invalidateOnRefresh: true
      }
    });

    timeline
      .addLabel('blank', 0)
      .to({}, { duration: 3.18 }, 0)
      .addLabel('intro-in', 0.14)
      .to(intro, { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 'intro-in')
      .addLabel('intro-out', 0.38)
      .to(intro, { autoAlpha: 0, y: -16, duration: 0.085, ease: 'power2.in' }, 'intro-out')
      .addLabel('orchestra-in', 0.45)
      .to(orchestra, { autoAlpha: 1, y: 0, duration: 0.11, ease: 'power2.out' }, 'orchestra-in')
      .addLabel('notes-burst', 0.6)
      .to(notes, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.18,
        stagger: { amount: 0.08, from: 'center' },
        ease: 'power3.out'
      }, 'notes-burst')
      .addLabel('gallery-start', 0.88)
      .to([orchestra, notesWrap], {
        autoAlpha: 0,
        scale: 0.97,
        duration: 0.12,
        ease: 'power2.inOut'
      }, 'gallery-start')

      // Scene 01: a narrow, full-height window opens from the centre,
      // then widens behind the first card before filling the viewport.
      .set(scenes.natural, { autoAlpha: 1 }, 0.96)
      .to(scenes.natural, {
        '--scene-reveal': '32.25%',
        duration: 0.18,
        ease: 'power3.inOut'
      }, 0.96)
      .to(scenes.natural, {
        '--scene-reveal': '19.17%',
        duration: 0.17,
        ease: 'power2.inOut'
      }, 1.14)
      .to(cards.natural, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.15,
        ease: 'power3.out'
      }, 1.16)
      .to(scenes.natural, {
        '--scene-reveal': '0%',
        duration: 0.23,
        ease: 'power3.inOut'
      }, 1.43)

      // Scene 02: the new image grows over the completed first scene while
      // the editorial card cross-fades at the same scroll position.
      .set(scenes.experience, { autoAlpha: 1 }, 1.72)
      .to(scenes.experience, {
        '--scene-reveal': '31.94%',
        duration: 0.2,
        ease: 'power3.inOut'
      }, 1.72)
      .to(cards.natural, {
        autoAlpha: 0,
        y: -14,
        scale: 0.985,
        duration: 0.12,
        ease: 'power2.in'
      }, 1.76)
      .to(cards.experience, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.15,
        ease: 'power3.out'
      }, 1.84)
      .to(scenes.experience, {
        '--scene-reveal': '0%',
        duration: 0.25,
        ease: 'power3.inOut'
      }, 2.02)

      // Scene 03 repeats the same centre-out reveal and settles on the final
      // full-bleed marina frame from the Figma sequence.
      .set(scenes.style, { autoAlpha: 1 }, 2.33)
      .to(scenes.style, {
        '--scene-reveal': '31.94%',
        duration: 0.2,
        ease: 'power3.inOut'
      }, 2.33)
      .to(cards.experience, {
        autoAlpha: 0,
        y: -14,
        scale: 0.985,
        duration: 0.12,
        ease: 'power2.in'
      }, 2.37)
      .to(cards.style, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.15,
        ease: 'power3.out'
      }, 2.5)
      .to(scenes.style, {
        '--scene-reveal': '0%',
        duration: 0.25,
        ease: 'power3.inOut'
      }, 2.63);

    // Rotate the orbit clockwise and counter-rotate every glyph at the exact
    // same speed so the notes travel in a circle without ever tilting.
    const orbit = gsap.timeline({ repeat: -1, paused: true });
    orbit
      .to(notesWrap, {
        rotation: 360,
        duration: 46,
        ease: 'none',
        transformOrigin: '50% 50%'
      }, 0)
      .to(notes, {
        rotation: -360,
        duration: 46,
        ease: 'none',
        transformOrigin: '50% 50%'
      }, 0);
    const orbitTrigger = ScrollTrigger.create({
      trigger: stage,
      start: () => stage.offsetTop - innerHeight,
      end: () => stage.offsetTop + stage.offsetHeight,
      onToggle: self => self.isActive ? orbit.play() : orbit.pause(),
      onRefresh: self => self.isActive ? orbit.play() : orbit.pause()
    });

    return () => {
      orbitTrigger.kill();
      orbit.kill();
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

initValuesSequence();

function initMapStory() {
  const stage = document.querySelector('[data-map-story]');
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!stage || !gsap || !ScrollTrigger) return;

  const panel = stage.querySelector('[data-map-panel]');
  const title = stage.querySelector('[data-map-title]');
  const description = stage.querySelector('[data-map-description]');
  const tabs = [...stage.querySelectorAll('[data-map-tab]')];
  const views = [...stage.querySelectorAll('[data-map-view]')];
  const urbanTabs = [...stage.querySelectorAll('[data-urban-tab]')];
  const urbanViews = [...stage.querySelectorAll('[data-urban-view]')];
  const copy = {
    overview: {
      title: 'SALA - Tâm điểm kết nối<br><span>TOD tại Thủ Thiêm</span>',
      description: 'Là tâm điểm tài chính - văn hóa mới, Thủ Thiêm đang bứt phá mạnh mẽ nhờ hạ tầng chiến lược và mạng lưới Metro TOD. Trong bức tranh đó, Khu đô thị Sala dần hoàn thiện hệ sinh thái đa kết nối, thiết lập chuẩn mực phát triển bền vững cho toàn khu vực.'
    },
    urban: {
      title: 'Dòng chảy kết nối<br><span>Trải nghiệm nâng tầm</span>',
      description: 'Là tâm điểm tài chính - văn hóa mới, Thủ Thiêm đang bứt phá mạnh mẽ nhờ hạ tầng chiến lược và mạng lưới Metro TOD. Trong bức tranh đó, Khu đô thị Sala dần hoàn thiện hệ sinh thái đa kết nối, thiết lập chuẩn mực phát triển bền vững cho toàn khu vực.'
    }
  };

  const entrance = gsap.fromTo(panel, {
    yPercent: 100,
    scale: 0.985,
    borderTopLeftRadius: '50% 10%',
    borderTopRightRadius: '50% 10%'
  }, {
    yPercent: 0,
    scale: 1,
    borderTopLeftRadius: '0% 0%',
    borderTopRightRadius: '0% 0%',
    ease: 'none',
    scrollTrigger: {
      trigger: stage,
      start: 'top bottom',
      end: 'top top',
      scrub: 0.9,
      invalidateOnRefresh: true
    }
  });

  let active = 'overview';
  const selectMap = next => {
    if (next === active) return;
    const currentView = stage.querySelector(`[data-map-view="${active}"]`);
    const nextView = stage.querySelector(`[data-map-view="${next}"]`);
    const nextCopy = copy[next];

    tabs.forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.mapTab === next)));
    nextView.hidden = false;
    gsap.killTweensOf([title, description, currentView, nextView]);
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .to([title, description], { autoAlpha: 0, y: -8, duration: 0.18, ease: 'power2.in' }, 0)
      .to(currentView, { autoAlpha: 0, scale: 1.02, duration: 0.3, ease: 'power2.inOut' }, 0)
      .add(() => {
        title.innerHTML = nextCopy.title;
        description.textContent = nextCopy.description;
        views.forEach(view => {
          const selected = view === nextView;
          view.classList.toggle('is-active', selected);
          if (!selected) view.hidden = true;
        });
        active = next;
      }, 0.31)
      .fromTo(nextView, { autoAlpha: 0, scale: 0.985 }, { autoAlpha: 1, scale: 1, duration: 0.42, ease: 'power3.out' }, 0.31)
      .fromTo([title, description], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power3.out' }, 0.34);
  };

  let activeUrban = 'zones';
  const selectUrban = next => {
    if (next === activeUrban) return;
    const currentView = stage.querySelector(`[data-urban-view="${activeUrban}"]`);
    const nextView = stage.querySelector(`[data-urban-view="${next}"]`);
    if (!currentView || !nextView) return;

    urbanTabs.forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.urbanTab === next)));
    nextView.hidden = false;
    gsap.killTweensOf([currentView, nextView]);
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .to(currentView, { autoAlpha: 0, scale: 1.025, duration: 0.34, ease: 'power2.inOut' }, 0)
      .fromTo(nextView, { autoAlpha: 0, scale: 0.985 }, { autoAlpha: 1, scale: 1, duration: 0.48, ease: 'power3.out' }, 0.2)
      .add(() => {
        urbanViews.forEach(view => {
          const selected = view === nextView;
          view.classList.toggle('is-active', selected);
          if (!selected) view.hidden = true;
        });
        activeUrban = next;
      }, 0.69);
  };

  tabs.forEach(tab => tab.addEventListener('click', () => selectMap(tab.dataset.mapTab)));
  urbanTabs.forEach(tab => tab.addEventListener('click', () => selectUrban(tab.dataset.urbanTab)));
  requestAnimationFrame(() => ScrollTrigger.refresh());
  return () => entrance.kill();
}

initMapStory();

function initProjectShowcase() {
  const section = document.querySelector('[data-project-showcase]');
  if (!section) return;
  const gsap = window.gsap;
  const tabs = [...section.querySelectorAll('[data-project-category]')];
  const panel = section.querySelector('[data-project-panel]');
  const image = section.querySelector('[data-project-image]');
  const name = section.querySelector('[data-project-name]');
  const index = section.querySelector('[data-project-index]');
  const tagline = section.querySelector('[data-project-tagline]');
  const description = section.querySelector('[data-project-description]');
  const metrics = section.querySelector('[data-project-metrics]');
  const detail = section.querySelector('[data-project-detail]');
  const order = ['apartment', 'townhouse', 'villa'];
  const projects = {
    apartment: {
      name: 'SARENE', index: '01/03', image: '/assets/projects/sarene.png',
      alt: 'Phối cảnh Sarene Residence & Commercial Complex tại phân khu Bắc Sala',
      tagline: 'Kiến tạo trải nghiệm sống đa tầng',
      description: 'Sarene Residence & Commercial Complex là tổ hợp căn hộ cao cấp và phố thương mại thuộc phân khu Bắc Sala, hướng hồ trung tâm và kết nối trực tiếp với hệ sinh thái thương mại – dịch vụ của toàn khu.',
      detail: 'https://www.thacogroup.vn/dai-quang-minh-tai-khoi-dong-khu-do-thi-sala-va-gioi-thieu-san-pham-the-he-moi-tai-trung-tam-do-thi-moi-thu-thiem',
      metrics: [['04', 'Tháp'], ['25', 'Tầng'], ['480', 'Căn hộ ở'], ['60', 'Căn hộ thương mại']]
    },
    townhouse: {
      name: 'SARI TOWN', index: '02/03', image: '/assets/projects/category-townhouse.png',
      alt: 'Dãy nhà phố thương mại Sari Town tại Sala',
      tagline: 'Phố thương mại giữa tâm điểm kết nối',
      description: 'Sari Town nằm tại trung tâm Khu đô thị Sala, liền kề công viên cảnh quan, các khu căn hộ cao cấp và những trục giao thông chính của Thủ Thiêm.',
      detail: 'https://saladaiquangminh.vn/du-an/nha-pho-sari-town/',
      metrics: [['235', 'Nhà phố'], ['01', 'Tầng hầm'], ['04', 'Tầng cao'], ['05 ha', 'Công viên liền kề']]
    },
    villa: {
      name: 'SAROMA VILLA', index: '03/03', image: '/assets/projects/category-villa.png',
      alt: 'Khu biệt thự sinh thái Saroma Villa tại Sala',
      tagline: 'Không gian biệt lập giữa miền sinh thái',
      description: 'Saroma Villa là khu biệt thự sinh thái biệt lập trong quần thể Sala, tiếp giáp lâm viên Thủ Thiêm và được bao quanh bởi hệ thống cảnh quan mặt nước.',
      detail: 'https://saladaiquangminh.vn/du-an/saroma-villa/',
      metrics: [['15,45', 'Hecta'], ['177', 'Biệt thự'], ['320+', 'm² mỗi lô'], ['03', 'Tầng']]
    }
  };
  let active = 'apartment';

  const render = key => {
    if (!projects[key] || key === active) return;
    const project = projects[key];
    tabs.forEach(tab => {
      const selected = tab.dataset.projectCategory === key;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    const update = () => {
      image.src = project.image;
      image.alt = project.alt;
      name.textContent = project.name;
      index.textContent = project.index;
      tagline.textContent = project.tagline;
      description.textContent = project.description;
      detail.href = project.detail;
      metrics.innerHTML = project.metrics.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('');
      active = key;
    };
    if (!gsap) { update(); return; }
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .to(panel, { autoAlpha: 0, y: 12, duration: 0.24, ease: 'power2.in' })
      .add(update)
      .fromTo(panel, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  };

  tabs.forEach(tab => tab.addEventListener('click', () => render(tab.dataset.projectCategory)));
  section.querySelector('[data-project-prev]').addEventListener('click', () => render(order[(order.indexOf(active) + order.length - 1) % order.length]));
  section.querySelector('[data-project-next]').addEventListener('click', () => render(order[(order.indexOf(active) + 1) % order.length]));

  if (gsap && window.ScrollTrigger) {
    gsap.fromTo(section.querySelectorAll('.project-showcase__intro > *, .project-category, .featured-project__head, .featured-project__body'),
      { autoAlpha: 0, y: 34 },
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 78%', once: true } });
  }
}

initProjectShowcase();

async function initSplashCursor() {
  const cursor = document.querySelector('[data-splash-cursor]');
  if (!cursor || matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
  document.body.classList.add('has-splash-cursor');
  try {
    await mountSplashCursor(cursor, {
      DYE_RESOLUTION: Math.min(1024, innerWidth),
      RAINBOW_MODE: false,
      COLOR: '#c82155',
      BACK_COLOR: { r: 0.79, g: 0.13, b: 0.33 },
      COLOR_UPDATE_SPEED: 0
    });
  } catch (error) {
    console.warn('Splash cursor unavailable', error);
    cursor.hidden = true;
    return;
  }
  addEventListener('pointermove', event => {
    const videoStage = event.target.closest('[data-video-stage]');
    const activeArea = event.target.closest('.hero, .about') || (videoStage && !videoStage.classList.contains('is-interactive'));
    const overVideo = event.target.closest('[data-video-frame]');
    cursor.classList.toggle('is-visible', Boolean(activeArea && !overVideo));
  }, { passive: true });
  addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
}

initSplashCursor();

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
